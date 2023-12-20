import React, { useContext, useEffect, useState } from "react";
import InputGroup from "../../components/inputGroup";
import { signUpSchema } from "../../schemas";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { SocketContext } from "../../contexts/socketContext";
const Login = () => {
  const navigate = useNavigate();
  const { authenticate, authenticationProcessLoading } =
    useContext(UserContext);
  const { connect } = useContext(SocketContext);

  const [email, setEmail] = useState("");
  const [password, setPassoword] = useState("");
  const [errors, setErrors] = useState({ password: "", email: "" });
  const user = JSON.parse(window.localStorage.getItem("user"));
  useEffect(() => {
    if (user && user.isVerified) {
      connect();
      navigate("/main");
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const noErrors = { password: "", email: "" };
    const validatorObject = { password: "", email: "" };
    const { error } = signUpSchema.validate(
      { email, password },
      { abortEarly: false }
    );
    if (error) {
      for (let item of error.details) {
        if (!validatorObject[item.path[0]])
          validatorObject[item.path[0]] = item.message;
      }
    }
    setErrors(validatorObject);
    if (JSON.stringify(noErrors) == JSON.stringify(validatorObject)) {
      authenticate({ password, email });
    }
  };
  return (
    <main className={` mainGradient w-screen h-screen  flex flex-row  `}>
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`flex flex-col p-4 items-center justify-center lg:w-[50%] w-full h-full`}
      >
        <h1 className="text-[42px] text-white font-bold">Log In</h1>
        <p className="text-mainGray mb-[50px]">Log into your Meetup account</p>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className="flex flex-col lg:w-[50%] w-[80%] items-center gap-[50px] mb-[50px]"
          action=""
        >
          <div className="w-full flex flex-col gap-4">
            <InputGroup
              icon={"../userIcon.svg"}
              type={"string"}
              placeholder={"Email"}
              value={email}
              setValue={setEmail}
              error={errors.email}
            />
            <InputGroup
              icon={"../lockIcon.svg"}
              type={"password"}
              placeholder={"Password"}
              value={password}
              setValue={setPassoword}
              error={errors.password}
            />
          </div>

          <button className="bg-tekhelet text-white h-[50px] rounded-xl flex items-center justify-center w-full ">
            {authenticationProcessLoading ? (
              <div className="dot-flashing"></div>
            ) : (
              <p>Continue</p>
            )}
          </button>
        </form>
        <div className="text-white">
          <span>No account ?</span>{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-tekhelet ml-2 cursor-pointer"
          >
            {" "}
            Sign Up
          </span>
        </div>
      </motion.div>
      <div className="lg:w-[50%] hidden h-full lg:flex justify-center items-center ">
        <img className="lg:w-[50%] " src="../loginImage.svg" alt="" />
      </div>
    </main>
  );
};

export default Login;
