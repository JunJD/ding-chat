const createPrompt = (question, paragraph) => {
  return (
    "Answer the following questions in Chinese, if necessary, also want to use their own knowledge :\n\n" +
    "Context :\n" +
    paragraph.join("\n\n") +
    "\n\nQuestion :\n" +
    question +
    "?" +
    "\n\nAnswer :"
  );
};

export default createPrompt 