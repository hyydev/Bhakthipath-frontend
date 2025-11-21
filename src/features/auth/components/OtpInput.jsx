import { useRef } from "react";

export default function OtpInput({ value, setValue }) {
  const inputs = useRef([]);

  const handleChange = (e, index) => {
    const val = e.target.value.replace(/\D/g, "");
    if (!val) return;

    const newOtp = value.split("");
    newOtp[index] = val;
    setValue(newOtp.join(""));

    if (index < 5) inputs.current[index + 1].focus();
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !value[index] && index > 0)
      inputs.current[index - 1].focus();
  };

  return (
    <div className="flex gap-3 justify-center mt-8">
      {Array(6).fill(0).map((_, i) => (
        <input
          key={i}
          ref={(el) => (inputs.current[i] = el)}
          type="text"
          maxLength={1}
          value={value[i] || ""}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleBackspace(e, i)}
          className="w-12 h-14 border-2 border-[#3A0519] text-center text-xl font-bold rounded-xl focus:ring-2 focus:ring-[#6A092F] outline-none"
        />
      ))}
    </div>
  );
}
