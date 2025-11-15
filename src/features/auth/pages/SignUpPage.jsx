import SignUpForm from "../components/SignUpForm";

import SignUpImageCarousal from "../components/SignUpImageCarousal";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ffefe2] p-4 ">
      <div className="w-full max-w-6xl bg-white rounded-[40px] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* LEFT SECTION */}
        <div className="relative bg-white px-12 py-10 flex flex-col">

         

          {/* Branding Title */}
          <h1 className="text-5xl text-[#3A0519]  font-extrabold mt-12">Hare Krishna </h1>
          <p className="text-[#3A0519] mt-3 text-lg">
            Welcome to BhakthiVerse! Join us and embark on a spiritual journey.
          </p>

          {/* Google Login Button */}
          <button className="w-full border border-gray-300 py-2 rounded-xl mt-10 flex items-center justify-center gap-3 hover:bg-gray-50 transition">
            <img
              src="https://www.google.com/favicon.ico"
              className="w-5 h-5"
              alt="Google"
            />
            Log in with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 mt-6 mb-3">
            <div className="h-[1px] bg-gray-300 flex-1"></div>
            <span className="text-gray-400 text-sm">or</span>
            <div className="h-[1px] bg-gray-300 flex-1"></div>
          </div>

          {/* Sign Up Form */}
          <SignUpForm />

          {/* Bottom Auth Text */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account{" "}
            <span className="text-blue-600 cursor-pointer">Login</span>
          </p>
        </div>

        {/* RIGHT SIDE IMAGE CAROUSEL */}
        <div className="relative bg-black overflow-hidden">
          <SignUpImageCarousal />
        </div>
      </div>
    </div>
  );
}
