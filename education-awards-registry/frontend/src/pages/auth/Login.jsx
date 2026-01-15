import { useState } from "react";
import InputWrapper from "../../components/common/InputWrapper";
import { MdOutlineEmail } from "react-icons/md";
import { FaEyeSlash } from "react-icons/fa";

function Login() {
  // Check if remember me is checked
  const [isRemembered, setIsRemembered] = useState(false);

  const handleRememberMeChange = (e) => {
    setIsRemembered(e.target.checked);
  };

  return (
    <>
      <h1 className="heading">Admin Login</h1>
      <InputWrapper
        label="Email"
        htmlFor="email"
        type="email"
        placeholder="John Doe"
      >
        <MdOutlineEmail className="icon" />
      </InputWrapper>
      <InputWrapper
        label="Password"
        htmlFor="password"
        type="password"
        placeholder="Enter your password"
      >
        <FaEyeSlash className="icon" />
      </InputWrapper>
      <div className="flex flex-row justify-between mt-4 px-2">
        <div className="flex flex-row gap-2">
          <div className="relative  w-[20px] h-[20px]">
            <input
              id="remember-btn"
              type="checkbox"
              checked={isRemembered}
              onChange={handleRememberMeChange}
              className="appearance-none w-full h-full border border-input-outline/30 rounded-sm shadow-lg"
            />
            {/* Conditionally render checkmark  */}
            {isRemembered && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="absolute inset-0 m-auto w-5 h-5 text-secondary pointer-events-none"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
            )}
          </div>

          <label
            htmlFor="remember-btn"
            className="font-bold text-base cursor-pointer"
          >
            Remember me
          </label>
        </div>
        <a href="#" className="cta">
          Forgot password
        </a>
      </div>
    </>
  );
}

export default Login;
