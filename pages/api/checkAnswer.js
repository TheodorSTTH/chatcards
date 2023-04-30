import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

function createCircularReplacer() {
  const cache = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (cache.has(value)) {
        return "[Circular]";
      }
      cache.add(value);
    }
    return value;
  }
}

export default async function handler(req, res) {
  const { question, answer, userAnswer } = req.body;
  console.log(question)
  console.log(answer)
  console.log(userAnswer)

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    "messages": [
        {
            "role": "system", 
            "content": "You are a teacher trying to decide if answers to questions are false or correct. Do not discuss what the right answer may be."
        },
        {
            "role": "user", 
            "content": `
            The question was: "${question}".
            The right answer is: "${answer}".
            I responed with: "${userAnswer}".
            Am i correct?
            `
        }
    ],
    max_tokens: 256
});

const json = JSON.stringify(completion, createCircularReplacer());

res.send(json); // Use res.send instead of res.json
}