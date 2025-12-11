import SignUpForm from "../components/SignUpForm";

import SignUpImageCarousal from "../components/SignUpImageCarousal";
import { Heading } from "../../../components/ui/";
import { useNavigate } from "react-router-dom";


export default function SignUpPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-6xl rounded-[40px] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 bg-white/80 dark:bg-[#0A1628]/80 backdrop-blur-md animate-fade-in">
        {/* LEFT SECTION */}
        <div className="relative px-12 py-10 flex flex-col bg-transparent">
          <Heading level={1} className="mb-6 animate-slide-up">
            {" "}
            <span
              className="
            bg-gradient-to-r 
            from-blue-600 
            to-indigo-600 
            dark:from-amber-300 
            dark:via-amber-400 
            dark:to-amber-600 
            bg-clip-text 
            text-transparent
            font-body
          "
            >
              Hare Krishna
            </span>
          </Heading>
          <p className="mt-3 text-lg text-[#3A0519] dark:text-gray-300 animate-slide-up">
            Welcome to BhakthiVerse! Join us and embark on a spiritual journey.
          </p>
          <button className="w-full border border-[#3A0519] dark:border-[#93C5FD] py-2 rounded-xl mt-10 flex items-center justify-center gap-3 hover:bg-gray-50 dark:hover:bg-[#1a2332] transition animate-fade-in">
            <img
              src="https://www.google.com/favicon.ico"
              className="w-5 h-5"
              alt="Google"
            />
            <span className="text-white">Log in with Google</span>
          </button>
          <div className="flex items-center gap-4 mt-6 mb-3 animate-fade-in">
            <div className="h-[1px] bg-[#3A0519] dark:bg-[#93C5FD] flex-1"></div>
            <span className="text-[#3A0519] dark:text-[#93C5FD] text-sm">
              or
            </span>
            <div className="h-[1px] bg-[#3A0519] dark:bg-[#93C5FD] flex-1"></div>
          </div>
          <SignUpForm />
          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400 animate-fade-in">
            Already have an account{" "}
            <span className="text-blue-600 dark:text-blue-400 cursor-pointer"
              onClick={() => navigate("/login")}>
              
              Login
            </span>
          </p>
        </div>
        {/* RIGHT SIDE IMAGE CAROUSEL */}
        <div className="relative overflow-hidden bg-black/70">
          <SignUpImageCarousal />
        </div>
      </div>
    </div>
  );
}
