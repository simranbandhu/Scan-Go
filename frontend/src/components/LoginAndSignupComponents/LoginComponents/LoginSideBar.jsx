import LoginPageUIBlock from "./LoginPageUIBlock";
import shoppingCartAnimation from "../../../assets/shopping_cart_animation.json";
import otpAnimation from "../../../assets/otp_animation.json";

const defaultLoginOptions = {
  loop: true,
  autoplay: true,
  animationData: shoppingCartAnimation,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const defaultOtpOptions = {
  loop: true,
  autoplay: true,
  animationData: otpAnimation,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export default function LoginSideBar({
  step = 1,
  phoneNumber = "+91XXXXXXXXX",
}) {
  const last4Digits = phoneNumber.slice(-4);
  return (
    <div className=" p-6  flex flex-col space-y-10  lg:w-[220%] md:w-[100%]">
      <p className="text-[38px] font-Barlow font-semibold text-black text-center ">
        Welcome to{" "}
        <span className="bg-yellow-400 p-1 border-[1px] overflow-hidden rounded-md ">
          Scan
        </span>{" "}
        &{" "}
        <span className="bg-green-500 p-1 border-[1px] overflow-hidden rounded-md ">
          {" "}
          Go
        </span>{" "}
        🛒
      </p>
      <div className="hidden lg:block">
        <p className="text-[24px] font-Doto text-black font-bold tracking-normal">
          Scan & Go: Shopping Made Effortless
        </p>
        <p className="text-[20px] mt-4 font-Doto text-black font-bold tracking-normal">
          Say goodbye to long lines and slow checkouts. Just add items to your
          cart and checkout instantly! 🛒
        </p>
        <ul className="mt-6 space-y-2 text-[18px] text-gray-600">
          <li>
            <strong>Fast and Convenient:</strong> Shop at your own pace, skip
            the queues.
          </li>
          <li>
            <strong>Real-Time Tracking:</strong> View your cart total instantly
            as you add items.
          </li>
          <li>
            <strong>Secure Login:</strong> Log in to save your shopping history
            and receive your bill directly to your phone.
          </li>
        </ul>
        <p className="text-[18px] mt-6 text-gray-500">
          Experience a new level of convenience—shop with Scan & Go and enjoy
          the freedom to check out in seconds!
        </p>

        {step === 1 ? (
          <LoginPageUIBlock
            defaultOptions={defaultLoginOptions}
            text1="New to Scan & Go or a returning shopper?"
            text2="Log in or sign up with your phone number to get started. "
            text3="Receive your bill instantly on your phone at checkout."
          />
        ) : (
          <LoginPageUIBlock
            defaultOptions={defaultOtpOptions}
            text1={`OTP Sent to +91XXXXXX${last4Digits}`}
            text2="Please provide the OTP within 5 minutes for verification"
            text3="OTP is valid for 5 minutes"
          />
        )}
      </div>
    </div>
  );
}
