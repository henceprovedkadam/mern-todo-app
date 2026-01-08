import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
const SignUp = () => {
  const navigate = useNavigate();

  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // POST REQUEST
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${API_BASE}/api/users/signup`, {
        name,
        email,
        password,
      })
      .then((res) => {
        console.log(res);
        navigate("/login");
      })
      .catch((error) => {
        if (error.response) {
          // BAD REQUEST RETURNED
          toast.info(error.response.data.msg);
          console.log(error.message);
        } else if (error.request) {
          //  SERVER ERRORS IF NOT REACHABLE
          toast.error("Server is not responding. Please try again later.");
          console.log("Error: No response from server");
        } else {
          // OTHER ERRORS
          toast.error("An unexpected error occurred.");
          console.log("Error:", error.message);
        }
      });
  };
  return (
    <>
      {/* TOAST */}
      <ToastContainer theme="dark" position="top-center" hideProgressBar />
      {/* MAIN CONTAINER */}
      <div className="flex items-center justify-center min-h-screen font-mono flex-col gap-y-10">
        {/* HEADING */}
        <h1
          className=" rubik-distressed-regular text-orange-500 
          max-w-80 text-4xl
        sm:max-w-140 sm:text-6xl 
        md:max-w-170 md:text-6xl
        lg:max-w-210 lg:text-8xl
        xl:max-w-210 xl:text-6xl"
        >
          Sign-up
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
            placeholder="Name"
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="w-full px-2 bg-orange-200 rounded-sm hover:border-orange-400
            h-8
            sm:h-12 sm:text-2xl
            lg:h-14 lg:text-3xl
            xl:h-10 xl:text-lg"
            placeholder="Email"
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
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-full mt-2 bg-orange-300 rounded-sm hover:bg-orange-800
            h-9 text-lg
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

export default SignUp;
