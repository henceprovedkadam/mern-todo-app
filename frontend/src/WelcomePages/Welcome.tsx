import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* MAIN CONTAINER */}
      <div className="h-screen font-mono flex flex-col items-center justify-center gap-y-15">
        {/* HEADING */}
        <h1
          className=" rubik-distressed-regular text-orange-500 
          max-w-75 text-5xl
        sm:max-w-140 sm:text-4xl 
        md:max-w-170 md:text-5xl
        lg:max-w-210 lg:text-6xl
        xl:max-w-210 xl:text-6xl"
        >
          Welcome to Todo-List App
        </h1>
        {/* BUTTONS */}
        <div className="flex justify-evenly bg-orange-400 rounded-4xl divide-orange-500 divide-x-5 max-w-60">
          {/* LOGIN BUTTON */}
          <button
            className=" rounded-l-4xl text-orange-900 font-bold hover:bg-orange-300 cursor-pointer
            w-40 py-4 text-xl
            md:w-50 md:py-6 md:text-2xl
            lg:w-60 lg:py-7 lg:text-3xl
            xl:w-45 xl:py-4 xl:text-xl"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          {/* SIGN-UP BUTTON */}
          <button
            className=" rounded-r-4xl text-orange-900 font-bold hover:bg-orange-300 cursor-pointer
            w-40 py-4 text-xl
            md:w-50 md:py-6 md:text-2xl
            lg:w-60 lg:py-7 lg:text-3xl
            xl:w-45 xl:py-4 xl:text-xl"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </button>
        </div>
      </div>
    </>
  );
};

export default Welcome;
