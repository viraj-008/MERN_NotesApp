import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const CreateNote: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [question, setQuestion] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [token, setToken] = useState<string | null>("");

  const navigate = useNavigate();

  useEffect(() => {
    const Bertoken = localStorage.getItem("token");
    if (!Bertoken) {
      alert("You must be logged in to perform this action.");
      return;
    }
    setToken(Bertoken);
  }, []);

  const handleSubmitAI = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!question.trim()) {
      setError("Please enter a question.");
      return;
    }

    setLoading(true);
    setError("");
    setResponse("");

    try {
      const res = await axios.post("http://localhost:5000/api/notes/ask", {
        question,
      });
      setResponse(res.data.answer);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.error || "An error occurred while fetching the response."
        );
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/notes",
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      setContent("");
    } catch (error: any) {
      alert(error.message);
      console.error("Error creating note:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      {/* Header Section */}
      <div className="text-center font-bold text-white py-4 flex justify-between w-[90%] mx-auto">
        <span className="text-[12px] md:text-[15px] font-semibold bg-gradient-to-r from-purple-100 to-pink-500 text-transparent bg-clip-text drop-shadow-lg">
          𝓜𝔂-𝓝𝓸𝓽𝓮𝓼
        </span>
        {token ? (
          <button
            onClick={handleLogout}
            className="flex text-[8px] md:text-[14px] items-center px-3 py-1 md:px-4 md:py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition-all duration-300 space-x-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-7.5A2.25 2.25 0 003.75 5.25v13.5A2.25 2.25 0 006 21h7.5a2.25 2.25 0 002.25-2.25V15M9 12h12m0 0l-3-3m3 3l-3 3"
              />
            </svg>
            <span>𝒍𝒐𝒈𝒐𝒖𝒕</span>
          </button>
        ) : (
          <Link to={"/"} className="text-blue-500 hover:underline">
            Login
          </Link>
        )}
      </div>

      {/* Create Note Form */}
      <div className="w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] mx-auto flex flex-col bg-gradient-to-t shadow-lg from-slate-500 to-red-500 rounded-lg p-4">
        <form onSubmit={handleSubmit} className="create-note">
          <div>
            <input
              className="w-full bg-orange-200 outline-none py-4 px-2 rounded-md"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              required
            />
          </div>
          <div className="my-4">
            <textarea
              className="w-full outline-none text-center bg-orange-200 py-4 rounded-md"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Content"
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              className="bg-gradient-to-r from-red-500 to-purple-500 text-white font-thin w-[50%] sm:w-[40%] py-2 rounded-lg"
              type="submit"
            >
              𝓪𝓭𝓭 𝓷𝓸𝓽𝓮
            </button>
          </div>
        </form>
      </div>

      {/* AI Question Section */}
      <div className="w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] mx-auto mt-8">
        <form onSubmit={handleSubmitAI} className="mb-4">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your question. AI is here..."
            className="w-full text-center bg-yellow-100 rounded mb-2 p-2 outline-none"
            rows={2}
          ></textarea>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-pink-600 to-white w-[50%] sm:w-[40%] mx-auto rounded-lg font-bold text-white px-4 py-2 shadow-2xl hover:bg-green-600"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                  <span>wait..</span>
                </div>
              ) : (
                "𝒂𝒔𝒌"
              )}
            </button>
          </div>
        </form>
        {error && (
          <p className="text-red-500 bg-gray-900 p-4 mb-2 font-bold rounded-md">
            error: {error}
          </p>
        )}
        {response && (
          <div className="p-4 rounded bg-gray-400">
            <h2 className="font-bold">AI Response:</h2>
            <p>{response}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default CreateNote;
