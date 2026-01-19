import { useState } from "react";

import FormWrapper from "../../components/common/FormWrapper";
import InputWrapper from "../../components/common/InputWrapper";
import PrimaryButton from "../../components/common/PrimaryButton";

import { MdOutlineEmail } from "react-icons/md";
import { BsFillBuildingsFill } from "react-icons/bs";

function Signup() {
  // values for school name and email
  const [schoolName, setSchoolName] = useState("");
  const [schoolEmail, setSchoolEmail] = useState("");
  const [errors, setErrors] = useState({});

  const handleRegistration = (e) => {
    e.preventDefault(); //prevent page reload

    // Handle Signup Logic
    const newErrors = {};

    if (schoolName === "") newErrors.schoolName = "School name is required";
    if (!/\S+@\S+\.\S+/.test(schoolEmail))
      newErrors.schoolEmail = "Email is not valid";

    setErrors(newErrors);

    // If no errors, proceed with registration
    if (Object.keys(newErrors).length === 0) {
      // Reset errors
      setErrors({});
      console.log("Registration successful");
    }
  };

  return (
    <>
      <header className="flex justify-center my-4">
        <img
          src="logo.png"
          alt="institution-logo"
          className="w-[266px] h-auto  "
        />
      </header>
      <main className="flex flex-col items-center">
        <div className="w-full"></div>
        <FormWrapper className="form-wrapper" onSubmit={handleRegistration}>
          <h1 className="heading">Register School</h1>
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

          <PrimaryButton label="Register" type="submit" onClick={() => {}} />
          <p>
            Already have an account?
            <span>
              <a href="#" className="cta">
                Log in here
              </a>
            </span>
          </p>
        </FormWrapper>
      </main>
    </>
  );
}

export default Signup;
