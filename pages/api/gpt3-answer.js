import axios from "axios"; // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const Filter = require("bad-words");
const apiKey = process.env["OPENAI_API_KEY"];
const rateLimit = require("express-rate-limit");

// Creating Axios Client
const client = axios.create({
  headers: { Authorization: "Bearer " + apiKey },
});

// Add your documents here. These will be used to answer questions. You can add up to 200.
// Alternately, you can store documents in a file. See: https://beta.openai.com/docs/api-reference/answers
const documents = [
  "This app was built using JavaScript and Node.JS.<|endoftext|>",
  "The app has a simple HTML form that users can use to submit questions.<|endoftext|>",
  "GPT-3 will use documents provided by the developer as a knowledge base to derive answers from.<|endoftext|>",
  "This is an example application that can be used to learn how to build apps using the OpenAI API.<|endoftext|>",
];

const endpoint = "https://api.openai.com/v1/answers";

// Middleware For Rate Limiting

const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 60,
});

function runRateLimitMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    // make sure the OPENAI_API_KEY env var is set
    if (!apiKey) {
      res.json({ answer: "You need to setup your API key." });
    }

    await runRateLimitMiddleware(req, res, apiLimiter);
    // respond if the rate limit is exceeded
    if (req.rateLimit.remaining == 0) {
      res.json({ answer: "Ask me again in a minute." });
      return;
    }

    // respond if the request length is too long
    if (req.body.question.length > 500) {
      res.json({ answer: "Sorry. That question is too long." });
    }
    // don't send questions that contain bad words
    let filter = new Filter();
    if (filter.isProfane(req.body.question)) {
      res.json({ answer: "That’s not a question we can answer." });
    }

    const data = {
      // "file": process.env.ANSWERS_FILE,
      documents: documents,
      question: req.body.question,
      search_model: "text-davinci-002",
      model: "text-davinci-002",
      examples_context: "My favorite programming language is Python.",
      examples: [
        ["How old are you?", "I'm a day older than I was yesterday."],
        ["What languages do you know?", "I speak English and write code in Python."],
      ],
      max_tokens: 1000,
      temperature: .7,
      return_prompt: false,
      expand: ["completion"],
      stop: ["\n", "<|endoftext|>"],
    };
    return client
      .post(endpoint, data)
      .then((result) => {
        res.json({ answer: result.data.answers[0] });
      })
      .catch((err) => {
        // deal with API request errors
        res.json({ answer: `Sorry, there was an API error. The error was '${err.message}'` });
      });
  }
}
