import React, { useEffect, useState } from "react";
import InputBox from "./inputBox";
import Header from "./header";
import { useContext } from "react";
import { SocketContext } from "../../../contexts/socketContext";
import { useParams, useNavigate } from "react-router-dom";
import { useRef } from "react";
import Message from "./message";
import Typing from "./typing";
import SimplePeer from "simple-peer";
import { ConversationContext } from "../../../contexts/conversationContext";
import ConversationMessage from "./conversationMessage";
import Info from "./detailsComponents/info";
import Add from "./detailsComponents/add";
import { motion } from "framer-motion";
import CallComp from "./call";
import { toast } from "react-hot-toast";

const Chat = () => {
  const ref = useRef();
  const navigate = useNavigate();
  const [currentDisplay, setCurrentDisplay] = useState("chat");

  const {
    messages,
    sendMessage,
    sendTyping,
    typing,
    call,
    turnServers,
    socket,
  } = useContext(SocketContext);
  const [callAccepted, setCallAccepted] = useState(false);
  const [incomingCall, setIncomingCall] = useState(false);
  const { conversationDetails } = useContext(ConversationContext);
  const [value, setValue] = useState("");
  const [peer, setPeer] = useState("");
  const [_stream, setStream] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState();
  const { id } = useParams();
  const remoteVideo = useRef();
  const selfVideo = useRef();

  useEffect(() => {
    if (call && call.offer && !callAccepted) {
      setIncomingCall(true);
    }
  }, [call]);

  useEffect(() => {
    sendTyping(isTyping);
  }, [isTyping]);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  });

  const handleTypingStart = () => {
    if (typingTimeout) clearTimeout(typingTimeout);
    setIsTyping(true);
  };

  const handleTyinpingStop = () => {
    if (typingTimeout) clearTimeout(typingTimeout);
    const timeout = setTimeout(() => {
      setIsTyping(false);
    }, 1500);
    setTypingTimeout(timeout);
  };

  const handleSendMessage = () => {
    const paylaod = {
      body: value,
      conversationId: id,
    };
    sendMessage(paylaod);
    setValue("");
  };

  const initiateMedia = async () => {
    const selfStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    if (selfVideo.current) {
      selfVideo.current.srcObject = selfStream;
    }
    setStream(selfStream);
    return selfStream;
  };

  const makeCall = async () => {
    try {
      const stream = await initiateMedia();
      console.log(stream);
      const peer = new SimplePeer({
        initiator: true,
        trickle: false,
        stream,
        config: {
          iceServers: turnServers,
        },
      });
      setPeer(peer);

      peer.on("signal", (data) => {
        const offer = { conversationId: id, offer: data };
        console.log("sending offer", offer);
        socket.emit("call", offer);
      });

      peer.on("stream", (remoteStream) => {
        if (remoteVideo.current) {
          remoteVideo.current.srcObject = remoteStream;
        }
      });

      socket.on("call_response", (args) => {
        console.log("setting remote descriptor", args);
        peer.signal(args);
      });
      peer.on("connect", () => {
        console.log("peer connected");
      });

      peer.on("error", (e) => {
        toast("Call Ended", { icon: "☎️" });
        peer.destroy();
        navigate("/main");
        socket.off("call_response");
        stream.getTracks().forEach(function (track) {
          track.stop();
        });
      });

      peer.on("close", () => {
        toast("Call Ended", { icon: "☎️" });
        peer.destroy();
        navigate("/main");
        stream.getTracks().forEach(function (track) {
          track.stop();
        });

        socket.off("call_response");
      });
    } catch (error) {
      toast.error("could not initiate call");
      console.log(error);
    }
  };

  const answerCall = async ({ offer, conversationId }) => {
    try {
      const stream = await initiateMedia();

      const peer = new SimplePeer({
        initiator: false,
        trickle: false,
        stream,
        config: {
          iceServers: turnServers,
        },
      });
      setPeer(peer);

      peer.on("signal", (answer) => {
        console.log("sending response", answer);
        socket.emit("call_response", { answer, conversationId });
      });

      peer.on("stream", (remoteStream) => {
        if (remoteVideo.current) {
          remoteVideo.current.srcObject = remoteStream;
        }
      });
      peer.signal(offer);

      peer.on("connect", () => {
        console.log("peer connected");
      });
      peer.on("error", (e) => {
        toast("Call Ended", { icon: "☎️" });
        peer.destroy();
        stream.getTracks().forEach(function (track) {
          track.stop();
        });
        navigate("/main");
        socket.off("call_response");
      });

      peer.on("close", () => {
        toast("Call Ended", { icon: "☎️" });
        stream.getTracks().forEach(function (track) {
          track.stop();
        });
        socket.off("call_response");
        peer.destroy();
        navigate("/main");
      });
    } catch (error) {
      console.log(error);
    }
  };

  const endCall = () => {
    if (peer) {
      peer.emit("close");
      peer.destroy();
      _stream.getTracks().forEach(function (track) {
        track.stop();
      });
      navigate("/main");
    }
  };

  return (
    <>
      {incomingCall && (
        <div className="w-[300px] h-[300px]  flex items-center justify-center bg-white">
          <button
            onClick={() => {
              answerCall(call);
              setCallAccepted(true);
              setIncomingCall(false);
              setCurrentDisplay("call");
            }}
          >
            Answer
          </button>
        </div>
      )}
      {currentDisplay == "chat" && (
        <div className="h-screen w-full flex flex-col">
          <Header setCurrentDisplay={setCurrentDisplay} makeCall={makeCall} />
          <div className="bg-black flex justify-center items-center flex-col w-full h-[calc(100vh-200px)]">
            <motion.div
              animate={{ y: 0 }}
              initial={{ y: -20 }}
              className="mx-auto w-fit p-2 mt-3 items-center border border-mediumGray flex flex-row gap-3 rounded-md bg-midGray"
            >
              <img src="../lockIcon.svg" className="w-[20px] h-[20px]" alt="" />
              <p className="text-mainGray">End to End Encrypted</p>
            </motion.div>
            <div
              ref={ref}
              className=" flex overflow-scroll scrol  overflow-x-hidden h-[calc(100%-50px)] flex-col gap-4 w-full p-3 "
            >
              {messages.map((message, index) =>
                conversationDetails.type == "single" ? (
                  <Message
                    key={index}
                    body={message.body}
                    senderId={message.senderId}
                    timeStamp={message.timeStamp}
                    status={message.status}
                  />
                ) : (
                  <ConversationMessage
                    key={index}
                    body={message.body}
                    senderId={message.senderId}
                    timeStamp={message.timeStamp}
                    status={message.status}
                  />
                )
              )}
              {typing.length > 0 && <Typing user={typing[0]} />}
            </div>
          </div>
          <InputBox
            handleTypingStart={handleTypingStart}
            handleTypingStop={handleTyinpingStop}
            value={value}
            setValue={setValue}
            handleSendMessage={handleSendMessage}
          />
        </div>
      )}

      {currentDisplay == "info" && (
        <Info setCurrentDisplay={setCurrentDisplay} />
      )}
      {currentDisplay == "add" && <Add setCurrentDisplay={setCurrentDisplay} />}
      {currentDisplay == "call" && (
        <CallComp
          conversationDetails={conversationDetails}
          selfVideo={selfVideo}
          remoteVideo={remoteVideo}
          endCall={endCall}
        />
      )}
    </>
  );
};

export default Chat;
