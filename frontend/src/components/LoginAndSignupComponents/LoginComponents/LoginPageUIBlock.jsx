import React from "react";
import Lottie from "react-lottie";
export default function LoginPageUIBlock({
  defaultOptions,
  text1,
  text2,
  text3,
}) {
  return (
    <div className="mt-12 p-6 max-w-lg mx-auto bg-white rounded-xl shadow-lg transform transition-all hover:scale-105 border border-gray-200">
      <div className="flex items-center space-x-4">
        <Lottie options={defaultOptions} height={100} width={100} />
        <div>
          <p className="text-xl font-semibold text-gray-700 mb-2">
            {text1}
            {/* First time user or recurring one */}
          </p>
          <p className="text-lg text-gray-600 leading-relaxed mt-4">
            {/* Please login/sign up using your phone number */}
            {text2}
          </p>
          <p className="text-sm text-gray-400 mt-3">
            {/* Your bill will be sent directly to your phone number! */}
            {text3}
          </p>
        </div>
      </div>
    </div>
  );
}
