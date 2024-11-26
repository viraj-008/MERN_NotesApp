import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateNote: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  
  const [question, setQuestion] = useState<string>('');
const [response, setResponse] = useState<string>('');
const [loading, setLoading] = useState<boolean>(false);
const [error, setError] = useState<string>('');

const navigate = useNavigate();

const handleSubmitAI = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!question.trim()) {
    setError('Please enter a question.');
    return;
  }

  setLoading(true);
  setError('');
  setResponse('');

  try {
    const res = await axios.post('http://localhost:5000/api/notes/ask', { question });
    console.log(res)
    setResponse(res.data.answer);
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      setError(err.response?.data?.error || 'An error occurred while fetching the response.');
    } else {
      setError('An unexpected error occurred.');
    }
  } finally {
    setLoading(false);
   
  }
};





  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/notes", {
        title,
        content,
      });


      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };


  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <>
    <div className="  text-center font-bold text-white py-4 flex justify-between w-[90%] mx-auto"> <span className="font-serif opacity-55 ">My Awesome Notes</span> <button onClick={handleLogout } className="text-red-700  hover:text-red-500 shadow-lg px-4 rounded-md p-2">Logout</button></div>

    <div className=" w-[40%] mx-auto flex  flex-col  shadow-lg rounded-lg p-4 ">

    <form  onSubmit={handleSubmit} className="create-note">
       <div>
      <input
      className=" w-full bg-orange-200  outline-none py-4 px-2 rounded-md"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />

      </div>

      <div className="my-4">
      <textarea
      className=" w-full outline-none text-center bg-orange-200  py-4 rounded-md"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        required
      />

      </div>

      <div className="flex justify-center">

      <button className="bg-gradient-to-r from-red-500 to-purple-500 text-white font-thin w-[30%]  py-1 rounded-lg" type="submit">Add Note</button>
      </div>
    </form>


    </div>

<div className="max-w-md mx-auto p-4 mt-8 ">
      {/* <h1 className="text-xl font-bold text-center mb-4 underline">Ask AI a Question</h1> */}
      <form onSubmit={handleSubmitAI } className="mb-4">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your question'  AI is hare..."
          className="w-full text-center bg-yellow-100 rounded mb-2 p-2 outline-none"
          rows={2}
        ></textarea>
        <div className="flex justify-center">

        <button
          type="submit"
          className="bg-gradient-to-r from-pink-600 to-white w-[30%] mx-auto rounded-lg font-bold text-white px-4 py-2  shadow-2xl  hover:bg-green-600"
          disabled={loading}
          >
            {loading ? (
    <div className="flex items-center space-x-2">
      <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
      <span>wait..</span>
    </div>
  ) : (
    'ask'
  )}
        </button>
          </div>
      </form>
      {error && <p className="text-red-500 bg-gray-900 p-4 mb-2 font-bold rounded-md">erorr- : {error}</p>}
       <div className="border w-[60%] mx-auto mt-5"></div>
      {response && (
        <div className="p-4  rounded bg-gray-400">
          <h2 className="font-bold">AI Response:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  
    </>
  );
};

export default CreateNote;

