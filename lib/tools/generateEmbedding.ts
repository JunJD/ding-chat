
import axios from 'axios'
import { embeds_storage_prefix } from '../../config/index'

let embeddingStore = {}; // Contains embedded data for future use


const generateEmbedding = async (paras) => {
  let countParas = paras.length;
  // Generate unix timestamp
  let startTime = new Date().getTime();
  try {
    console.log("将文件发送给OpenAI 🚀");
    const response = await axios({
      method: "POST",
      url: 'https://run.dingjunjie.com/v1/embeddings',
      headers: {
        "Content-Type": "application/json",
        'authorization': "Bearer " + "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",
      },
      data: {
        input: paras,
        model: 'text-embedding-ada-002',
      },
    });
    console.log("收到OpenAI的回复 🎉");

    let completionTime = new Date().getTime();

    // 检查数据是否正确接收
    console.log(response.data.data.length, countParas , 'response.data.data.length')
    if (response.data.data.length >= countParas) {
      for (let i = 0; i < countParas; i++) {
        // 将每个嵌入的参数添加到embeddingStore
        embeddingStore[embeds_storage_prefix + paras[i]] = JSON.stringify({
          embedding: response.data.data[i].embedding,
          created: startTime,
        });
      }
    }
    console.log("嵌入了 ✨");
    console.log(`时间 : ${(completionTime - startTime) / 1000} 秒`);

    return embeddingStore;

  } catch (error) {
    console.log(error);
  }
};

export default generateEmbedding