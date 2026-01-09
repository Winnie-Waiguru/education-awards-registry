import InputWrapper from "../../components/common/InputWrapper";
import { BsBuildingsFill } from "react-icons/bs";
import { FaEyeSlash } from "react-icons/fa";

function Login() {
  return (
    <>
      <h1 className="heading">Admin Login</h1>
      <InputWrapper
        label="Email"
        htmlFor="email"
        type="email"
        placeholder="John Doe"
      >
        <BsBuildingsFill className="icon" />
      </InputWrapper>
      <InputWrapper
        label="Password"
        htmlFor="password"
        type="password"
        placeholder="Enter your password"
      >
        <FaEyeSlash className="icon" />
      </InputWrapper>
    </>
  );
}

export default Login;
