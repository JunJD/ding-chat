import { createParser } from 'eventsource-parser';

export default async function (req, res) {

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  let counter = 0;
  
  const response = await fetch('https://run.dingjunjie.com/v1/chat/completions', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'authorization': req.headers.authorization,
    },
    body: JSON.stringify({
      ...req.body,
      stream: true
    }),
  });

  if (response.status !== 200) {
    if (response.status === 429) {
      res.write('请求过于频繁，请容我思考一下');
    } else {
      res.write(response.statusText);
    }
   
    res.status(response.status).end();
    return;
  }
  // 禁止nginx缓存stream
  res.setHeader('X-Accel-Buffering', 'no');
  
  res.set({
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  })  
  new ReadableStream({
    async start(controller) {
        function onParse(event) {
            if (event.type === 'event') {
                const data = event.data;
                if (data === '[DONE]') {
                  controller.close();
                  res.end();
                    return;
                }
                try {
                  const json = JSON.parse(data);
                  const text = json.choices[0].delta?.content || '';
                  // 两次换行符以上，才会返回, 用于过滤掉一些无用的回复
                  if (counter < 2 && (text.match(/\n/) || []).length) {
                    return;
                  }
                  const queue = encoder.encode(text);
                    res.status(200).write(queue);
                    controller.enqueue(queue);
                    counter++;
                } catch (e) {
                  console.log(e, 'error');
                    res.status(500).end();
                    controller.error(e);
                }
            }
        }

        const parser = createParser(onParse);
      for await (const chunk of response.body) {
        parser.feed(decoder.decode(chunk));
      }
    },
  });
}