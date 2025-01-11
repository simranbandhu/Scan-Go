import React from "react";

export default function Login_And_SignupBlock({
  step = 1,
  requestFuncion,
  placeholderText = "Enter your details",
  buttonText = "Submit",
  onChangeFunction,
  dynamicValue,
  buttonColor = "green",
  resendOtpFunction,
}) {
  return (
    <div className="flex justify-center items-center h-full py-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <input
          type="text"
          placeholder={placeholderText}
          value={dynamicValue}
          onChange={(e) => onChangeFunction(e.target.value)}
          className="p-3 text-lg text-center border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={requestFuncion}
          className={`mt-6 w-full py-3 rounded-md text-white text-lg font-semibold transition-all ${
            buttonColor === "red"
              ? "bg-red-600 hover:bg-red-700"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {buttonText}
        </button>
        {step === 2 && (
          <p
            className="text-black text-[16px] underline underline-offset-2 mt-2 cursor-pointer"
            onClick={() => resendOtpFunction()}
          >
            Didnt recieve OTP ? Resend OTP.
          </p>
        )}
      </div>
    </div>
  );
}
// export default function Login_And_SignupBlock({
//   requestFuncion,
//   placeholderText = "Default placeholder",
//   buttonText = "button",
//   onChangeFunction,
//   dynamicValue,
//   buttonColor = "green",
// }) {
//   return (
//     <div className="border-2 border-yellow-300 h-full">
//       <div className="border-2 border-red-400 p-4 flex flex-col items-center justify-between space-y-4 h-full">
//         <input
//           type="text"
//           placeholder={`${placeholderText}`}
//           value={dynamicValue}
//           onChange={(e) => onChangeFunction(e.target.value)}
//           className="p-2 text-[16px] text-center border-[1px] w-full border-black rounded-sm "
//         />
//         <button
//           onClick={requestFuncion}
//           className={`border-2 w-[50%] rounded-md py-2 px-1 ${
//             buttonColor === "red" ? "bg-red-600" : "bg-green-600"
//           } text-white font-[16px]`}
//         >
//           {buttonText}
//         </button>
//       </div>
//     </div>
//   );
// }
