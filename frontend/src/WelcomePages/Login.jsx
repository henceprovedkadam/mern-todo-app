import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Login = () => {

  const navigate = useNavigate();

  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // POST REQUEST
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${API_BASE}/api/users/login`,
        { email, password },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        navigate('/home');
      })
      .catch((error) => {
        if (error.response) {
          toast.info(error.response.data.msg);
        } else if (error.request) {
          toast.error("Server is not responding. Please try again later.");
        } else {
          toast.error("An unexpected error occurred.");
        }
      });
  };

  return (
    <>
      {/* TOAST */}
      <ToastContainer position="top-center" theme="dark" hideProgressBar />
      {/* MAIN CONTAINER */}
      <div className="flex items-center justify-center min-h-screen font-mono flex-col gap-y-10">
        {/* HEADING */}
        <h1 className=" rubik-distressed-regular text-orange-500 
          max-w-80 text-4xl
        sm:max-w-140 sm:text-6xl 
        md:max-w-170 md:text-6xl
        lg:max-w-210 lg:text-8xl
        xl:max-w-210 xl:text-6xl">
          Login
        </h1>
        <form
          className="flex bg-orange-400 flex-wrap rounded-sm 
          w-60 p-5 gap-y-2
          sm:w-120 sm:p-8 sm:gap-y-8
          lg:w-175 lg:p-10 lg:gap-y-10
          xl:w-90 xl:p-7 xl:gap-y-7"
          onSubmit={handleSubmit}
        >
          <input
            className="w-full px-2 bg-orange-200 rounded-sm hover:border-orange-400
            h-8
            sm:h-12 sm:text-2xl
            lg:h-14 lg:text-3xl
            xl:h-10 xl:text-lg"
            placeholder="Enter Email"
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full px-2 bg-orange-200 rounded-sm hover:border-orange-400
            h-8
            sm:h-12 sm:text-2xl
            lg:h-14 lg:text-3xl
            xl:h-10 xl:text-lg"
            placeholder="Enter Password"
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-full mt-2 px-2 bg-orange-200 rounded-sm hover:border-orange-400
            h-9
            sm:h-12 sm:text-2xl
            lg:h-14 lg:text-3xl
            xl:h-10 xl:text-lg"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
