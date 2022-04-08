import { useState } from "react";
import Button1 from "../components/FormComponents/Button";
import Form from "../components/FormComponents/Form";
import Input from "../components/FormComponents/Input";
import axios from "axios";

// Function to fetch data from API
async function fetchAnswer(question) {
  let answer;
  try {
    const response = await axios.post("/api/gpt3-answer", { question });
    answer = response.data.answer;
  } catch (error) {
    answer = `Something went wrong, Please ask me after a minute...`;
  }
  return answer;
}

export default function Home() {
  // States For answers and questions
  const [answer, setAnswer] = useState("Ask me questions about a job you are hiring for... Or anything recruiting related...");
  const [question, setQuestion] = useState("");

  // Handler for asking question
  const questionAskedHandler = async (e) => {
    e.preventDefault();
    setAnswer(`Thinking...`);
    const result = await fetchAnswer(question);
    setAnswer(`${result}`);
  };

  return (
    <>
      <div className="container-xl mx-auto home-body ">
        <h1 className="text-6xl text-center my-24 pt-12">
          <b>GPT</b> Answers
        </h1>
        <h2 className="text-3xl text-center my-4">An Example AI Recruiting Assistant</h2>
        <Form onSubmit={questionAskedHandler}>
          <div className="rounded-md shadow-sm -space-y-px pb-8">
            <Input
              width="col-span-6"
              customClasses=""
              name="question"
              id="question-input"
              type="text"
              placeHolder="What is this app"
              onChange={(e) => {
                setQuestion(e.target.value);
              }}
            />
            <div className="group relative w-3/12 inline-block justify-center mx-auto ">
              <Button1 text={"Ask"} type="submit" />
            </div>
          </div>
        </Form>
        <h2 className="text-xl text-center my-4">{answer}</h2>
      </div>
    </>
  );
}
