import { embeds_storage_prefix } from '../../config/index'

// Removes the prefix from paragraph
const keyExtractParagraph = (key) => {
    return key.substring(embeds_storage_prefix.length);
};

// Calculates the similarity score of question and context paragraphs
const compareEmbeddings = (embedding1, embedding2) => {
  var length = Math.min(embedding1?.length, embedding2?.length);
  var dotprod = 0;

  for (var i = 0; i < length; i++) {
    dotprod += embedding1[i] * embedding2[i];
  }

  return dotprod;
};

// Loop through each context paragraph, calculates the score, sort using score and return top count(int) paragraphs
const findClosestParagraphs = (questionEmbedding, embeddingStore, count) => {

  const items = [];
  for (const key in embeddingStore) {
    let paragraph = keyExtractParagraph(key);
    console.log(embeddingStore[key], 'embeddingStore[key]')
      const currentEmbedding = embeddingStore[key] ? JSON.parse(embeddingStore[key])?.embedding: []
      items.push({
        paragraph: paragraph,
        score: compareEmbeddings(questionEmbedding, currentEmbedding),
      });
    }
  
    items.sort(function (a, b) {
      return b.score - a.score;
    });
  
    return items.slice(0, count).map((item) => item.paragraph);
};
  
export default findClosestParagraphs;