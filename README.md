# Building a GPT-3 Knowledge Base App (Next.js)

[![YouTube Video](https://img.youtube.com/vi/o3IiN2eISA0/maxresdefault.jpg)](https://www.youtube.com/watch?v=o3IiN2eISA0)

This is code for building a GPT-3 powered knowledge base application using Next.js. It's adapted from the example in the book [Exploring GPT-3](https://www.amazon.com/dp/1800563191). To deploy and run this code you'll need the following:

- Access to the OpenAI API - [Sign up for an account](https://beta.openai.com/signup)
- An account on [vercel.com](https://vercel.com) (a free account will work fine)

## Getting Started

1. Watch the [tutorial video](https://youtu.be/o3IiN2eISA0).
2. Create and/or copy an API key from the [OpenAI API Keys Page](https://beta.openai.com/account/api-keys).
2. Click the 'Deploy with Vercel' button below to begin deploying this app to your vercel.com account.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdabblelab%2Fgptanswers-nextjs%2F&env=OPENAI_API_KEY&envDescription=Your%20OpenAI%20API%20Key&project-name=dabblelab-gptanswers-nextjs&repo-name=dabblelab-gptanswers-nextjs)

3. Enter your OpenAI API key for the environment variable named `OPENAI_API_KEY`. 
4. Add your own content to the documents defined in the `routes/answers.json` file.
5. Test the app by visiting the Vercel generated app URL.

## Using an answers file

By default the code uses a JavaScript array of documents in `routes/answers.json` for the knowledge base. Alternately, you can store documents in an answers file. There is an example answers file named `answers.jsonl` in the root, along with a file named `upload.js` that provides code you can use to upload an answers file to the OpenAI API. If you use the answers file, you'll also need to setup a secret / environment variable named `ANSWERS_FILE` with the OpenAI filename for the value.

An array of documents is used by default because because it's simpler. However, there are two primary advantages to using a documents file. First, you can include more than 200 documents. Second, the the API will throw a 404 error if there isn't a matching result. Meaning, the app could be setup to log questions that should be added to the documents - unanswered questions. This is not currently a feature but is planned for a future release.

For more details on using answer files, see the [OpenAI Documentation](https://beta.openai.com/docs/api-reference/answers).

## Question and comments

If you have questions or comments, please post them on the [Exploring GPT-3 Discord Server](https://discord.gg/Xptpz7JyWy) or in the [GitHub Issues](https://github.com/dabblelab/gptanswers-nextjs/issues) page for this repository. Thanks so much!
