import generateEmbedding from "../../lib/tools/generateEmbedding";
import { min_para_words } from "../../config/index";
export default async function (req, res) {
    // Paragraph store after splitting
    let paras = [];

    // 注释：这个正则表达式的意思是：以两个换行符为分隔符，将文本分割成段落
    let rawParas = req.body.split(/\n\s*\n/);
    // 更多格式化并将每个段落推入paras[]
    for (let i = 0; i < rawParas.length; i++) {
        let rawPara = rawParas[i].trim().replaceAll("\n", " ").replace(/\r/g, "");

        // 校验是否是问题并且长度大于最小值
        if (rawPara.charAt(rawPara.length - 1) != "?") {
            if (rawPara.split(/\s+/).length >= min_para_words) {
                paras.push(rawPara);
            }
        }
    }
    console.log(req.headers.openaikey, 'req.headers')
    paras.shift();
    const embeddedParas = await generateEmbedding(paras, req.headers.openaikey);
    res.status(200).json(embeddedParas);
}

