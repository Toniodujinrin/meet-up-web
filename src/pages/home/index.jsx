import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import ButtonMain from "../../components/buttonMain";
import { motion } from "framer-motion";

const info = [
  {
    firstHeader: "Enjoy your privacy",
    secondHeader: "End to End encryption",
    image: "../secureImage.svg",
    icon: "../lockIconPurple.svg",
    description:
      "Meetup uses advanced encryption techniques to ensure messages are secure from your from to the receiver.",
  },
  {
    firstHeader: "Anywhere, on any device",
    secondHeader: "Synced",
    image: "../syncImage.svg",
    icon: "./syncIcon.svg",
    description:
      "you can access all messages on your account from anywhere on the interent, just log in and read your messages",
  },
  {
    firstHeader: "lighning quick",
    secondHeader: "Blazingly Fast",
    image: "../fastImage.svg",
    icon: "./fastIcon.svg",
    description:
      "Meet-up lets you have conversations in real time with other users!",
  },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className=" scroll-smooth">
      <nav
        className={`  w-screen  bg-darkGray   h-[70px] flex flex-row items-center justify-between py-3 px-6`}
      >
        <img className="w-[40px] h-[40px]" src="../../logo.svg" alt="" />
        <div className="flex flex-row items-center gap-4">
          <ButtonMain text={"Login"} onClick={() => navigate("/login")} />
        </div>
      </nav>

      <div className="w-screen overflow-hidden  flex flex-col items-center bg-darkGray  ">
        <div className="flex lg:w-[60%] my-[100px] flex-row gap-x-8 items-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col px-4    justify-center items-start space-y-4 "
          >
            <h1 className="text-white lg:text-[56px]   text-[48px]">
              The only messanger you will ever need
            </h1>
            <p className="text-mainGray text-[18px] lg:text-[24px]">
              {" "}
              Send messages to anyone around the world securely and fast{" "}
            </p>
            <ButtonMain
              text={"Get Started"}
              onClick={() => navigate("/signup")}
            />
          </motion.div>
        </div>

        <div className="lg:w-[62.5%] w-full">
          {info.map((inf, index) => (
            <section
              data-aos="fade-up"
              className={`w-full  mt-4 flex  items-center justify-between `}
            >
              <div className="lg:w-[50%]  flex flex-row gap-4 w-full">
                <div className="flex-col">
                  <div className="  rounded-full w-[50px] aspect-square flex items-center justify-center">
                    <img
                      src={inf.icon}
                      className="w-[30px] aspect-square"
                      alt=""
                    />
                  </div>

                  <div
                    className={`ml-[25px] mt-4 w-[2px] rounded-lg h-[250px] ${
                      index !== info.length - 1 && `bg-tekhelet`
                    }`}
                  ></div>
                </div>
                <div className="flex-col w-full lg:pr-0 pr-2">
                  <h1 className="text-tekhelet text-[24px] font-semibold ">
                    {inf.firstHeader}
                  </h1>
                  <h1 className="text-white   text-[30px]">
                    {inf.secondHeader}
                  </h1>
                  <p className="text-mainGray w-full text-[18px]">
                    {inf.description}
                  </p>
                </div>
              </div>
              <img
                src={inf.image}
                className="w-[300px] hidden lg:flex "
                alt=""
              />
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
