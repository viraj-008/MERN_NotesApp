import React, { useState } from "react";
import axios from "axios";
import { Link ,useNavigate} from "react-router-dom";


const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
 
   const navigate=useNavigate()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/notes/login", {
        email,
        password,
      });

      console.log(response)

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/allnotes")
      }

    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <>
<div className="flex bg-gradient-to-t from-yellow-600  " >

<div className="w-[50%]">

<div className=" h-screen hidden lg:block">
  <img
    src="https://img.freepik.com/fotos-premium/imagen-fondo_910766-187.jpg?w=826"
    alt="Background"
    className="object-cover w-full h-full"
    />
</div>
    </div>


<div className=" w-[40%]   flex justify-center items-center">

    <div className=" w-[70%] mx-auto mr-4 ">

      <h2 className="text-xl font-bold mb-4 text-center opacity-65">Login</h2>
   
      {error && <p className="text-red-500 mb-4 font-bold underline">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-t from-yellow-800 text-white p-2 rounded hover:bg-yellow-600 transition"
        >
          Login
        </button>
       <Link to={'/register'}> <h1 className="underline text-white font-thin p-2">Register..</h1></Link>
      </form>
          </div>
    </div>
          </div>

    </>

  );
};

export default LoginForm;
