import { useState } from "react"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { verifyOTP } from "../api"

import OtpInput from "../components/OtpInput"
import MotionButton from "../../../components/MotionButton" 


export default function OtpPage() {
  const [otp_code, setOtp] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    

    if (otp_code.length !== 6) {
      toast.error("Please enter 6-digit OTP")
      return
    }

    try {

      await verifyOTP({ otp_code })
      toast.success("OTP Verified Successfully!")
      navigate("/login")
    } catch (error) {
      toast.error("Invalid OTP!")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ffefe2] p-4">

      {/* OUTER BOX */}
      <div className="w-full max-w-xl bg-white rounded-[40px] shadow-2xl p-10 min-h-[70vh] flex flex-col justify-center">

        <h1 className="text-4xl text-[#520724] font-extrabold text-center">
          Verify OTP
        </h1>

        <p className="text-[#3A0519] mt-3 text-lg text-center">
          We have sent a 6-digit OTP to your email/mobile.
        </p>

        {/* OTP INPUT BOXES */}
        <OtpInput value={otp_code} setValue={setOtp} />

        <MotionButton
          onClick={handleSubmit}
          className="w-full bg-[#3A0519] text-white py-3 rounded-xl mt-10 
                     text-sm font-medium hover:bg-[#6A092F] transition"
        >
          Verify OTP
        </MotionButton>

        <p className="mt-6 text-center text-sm text-gray-600">
          Didn’t receive OTP?{" "}
          <span className="text-blue-600 cursor-pointer">Resend</span>
        </p>

      </div>
    </div>
  )
}
