export default async function (req, res) {
  console.log(req.headers)
  const response = await fetch('https://run.dingjunjie.com/v1/chat/completions', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'authorization': req.headers.authorization,
    },
    body: JSON.stringify({
      ...req.body,
    }),
  });

    const data = await response.json();

    res.status(200).json({ result: data })
}