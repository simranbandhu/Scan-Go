import React from "react";

export default function Login_InputBlockTitle({ step = 1 }) {
  return (
    <div className="py-7">
      {step === 1 ? (
        <h1 className="text-center font-Barlow font-normal  text-[2rem]">
          Login / Signup
        </h1>
      ) : (
        <h1 className="text-center font-Barlow  text-[2rem]">
          Please provide OTP, sent to your mobile !📲
        </h1>
      )}
    </div>
  );
}
