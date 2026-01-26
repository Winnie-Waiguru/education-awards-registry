import { useState } from "react";

import FormWrapper from "../../components/common/FormWrapper";
import InputWrapper from "../../components/common/InputWrapper";
import PrimaryButton from "../../components/common/PrimaryButton";

import { MdOutlineEmail, MdArrowBack } from "react-icons/md";
import { BsFillBuildingsFill } from "react-icons/bs";

function ForgotPassword() {
  // values for school name and email
  const [schoolName, setSchoolName] = useState("");
  const [schoolEmail, setSchoolEmail] = useState("");
  const [errors, setErrors] = useState({});

  const handlePasswordReset = async (e) => {
    e.preventDefault(); //prevent page reload

    // Handle Signup Logic
    const newErrors = {};

    if (schoolName === "") newErrors.schoolName = "School name is required";
    if (!/\S+@\S+\.\S+/.test(schoolEmail))
      newErrors.schoolEmail = "Email is not valid";

    setErrors(newErrors);

    // If no errors, proceed with password reset request
    if (Object.keys(newErrors).length === 0) {
      // Reset errors
      setErrors({});
      try {
        const response = await fetch("api/reset-password", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ schoolName, schoolEmail }),
        });
        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(`Request failed: ${errorData}`);
        }

        const data = await response.json();
        console.log("Password reset request sent:", data);
      } catch (error) {
        console.error("Error sending password reset request:", error);
      }
    }
  };

  return (
    <>
      <main className="flex flex-col items-center">
        <div className="w-full"></div>
        <FormWrapper className="form-wrapper" onSubmit={handlePasswordReset}>
          <div className="flex flex-row gap-6 mt-4 mb-10 md:mb-6 ">
            <MdArrowBack className="icon size-8" aria-hidden="true" />
            <h1 className="heading">Forgot Password</h1>
          </div>

          <p className="mb-6">
            Enter your school details below. A request will be sent to the
            system administrator.
          </p>

          <InputWrapper
            label="School Name"
            id="school-name"
            type="text"
            placeholder="Enter school name"
            value={schoolName}
            onChange={(e) => {
              setSchoolName(e.target.value);
            }}
            error={errors.schoolName}
            autoComplete="organization"
          >
            <BsFillBuildingsFill className="icon" aria-hidden="true" />
          </InputWrapper>
          <InputWrapper
            label="School Email"
            id="email"
            type="email"
            placeholder="school@gmail.com"
            value={schoolEmail}
            onChange={(e) => {
              setSchoolEmail(e.target.value);
            }}
            required
            error={errors.schoolEmail}
            autoComplete="email"
          >
            <MdOutlineEmail className="icon" aria-hidden="true" />
          </InputWrapper>

          <PrimaryButton
            label="Reset Password"
            type="submit"
            onClick={() => {}}
          />
        </FormWrapper>
      </main>
    </>
  );
}

export default ForgotPassword;
