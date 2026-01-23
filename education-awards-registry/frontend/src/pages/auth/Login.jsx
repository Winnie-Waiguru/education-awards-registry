import { useState } from "react";
import { Link } from "react-router-dom";
import validator from "validator";

import FormWrapper from "../../components/common/FormWrapper";
import InputWrapper from "../../components/common/InputWrapper";
import PrimaryButton from "../../components/common/PrimaryButton";

import { MdOutlineEmail } from "react-icons/md";

function Login() {
  // Check if remember me is checked
  const [isRemembered, setIsRemembered] = useState(false);
  // values for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent page reload

    // errors handling
    const newErrors = {};

    // Handle Login Logic
    if (!validator.isEmail(email)) newErrors.email = "Email is not valid";

    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    setErrors(newErrors);

    // If no errors, proceed with login
    if (Object.keys(newErrors).length === 0) {
      // Reset errors
      setErrors({});

      try {
        // send login request to backend
        const response = await fetch("/api/login", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(`Login failed: ${errorData}`);
        }

        const data = await response.json();
        console.log("Login Successful:", data);
      } catch (error) {
        console.error("Login error:", error);
      }
    }
  };

  return (
    <>
      <header className="flex justify-center my-4">
        <img
          src="logo.png"
          alt="institution-logo"
          className="w-[266px] h-auto "
        />
      </header>
      <main className="flex flex-col items-center">
        <div className="w-full"></div>
        <FormWrapper onSubmit={handleSubmit} className="form-wrapper">
          <h1 className="heading">Admin Login</h1>
          <InputWrapper
            label="Email"
            id="email"
            type="email"
            placeholder="John Doe"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            error={errors.email}
            required
            autoComplete="email"
          >
            <MdOutlineEmail className="icon" aria-hidden="true" />
          </InputWrapper>
          <InputWrapper
            label="Password"
            id="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            error={errors.password}
            required
            placeholder="Enter your password"
            autoComplete="current-password"
          ></InputWrapper>
          <div className="flex flex-row justify-between mt-4 px-2">
            <div className="flex flex-row gap-2">
              <div className="relative  w-[20px] h-[20px]">
                <input
                  id="remember-btn"
                  type="checkbox"
                  checked={isRemembered}
                  onChange={(e) => {
                    setIsRemembered(e.target.checked);
                  }}
                  className="checkbox-container"
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

              <label htmlFor="remember-btn">Remember me</label>
            </div>
            <Link to="/forgot-password" className="cta">
              Forgot password?
            </Link>
          </div>
          <PrimaryButton label="Log In" type="submit" onClick={() => {}} />
          <p>
            Don't have an account?{" "}
            <span>
              <Link to="/signup" className="cta">
                Register here
              </Link>
            </span>
          </p>
        </FormWrapper>
      </main>
    </>
  );
}

export default Login;
