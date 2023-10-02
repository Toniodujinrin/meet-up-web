import React, { useEffect, useContext, useRef, useState } from "react";
import { SocketContext } from "../../../contexts/socketContext";
import { useNavigate, useParams } from "react-router-dom";
import SimplePeer from "simple-peer";

const CallComp = ({ conversationDetails }) => {
  const remoteVideo = useRef();
  const selfVideo = useRef();
  const { type, id } = useParams();
  const navigate = useNavigate();
  const [stream, setStream] = useState(null);
  const { call, turnServers, socket } = useContext(SocketContext);
  const [callAccepted, setCallAccepted] = useState(false);
  const [callMade, setCallMade] = useState(false);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        if (selfVideo.current) {
          selfVideo.current.srcObject = stream;
        }
      });
  }, []);

  useEffect(() => {
    if (type == "initiate" && !callMade) {
      makeCall(id);
      setCallMade(true);
    }
  }, []);

  useEffect(() => {
    if (
      call &&
      call.offer &&
      call.conversationId &&
      type !== "initiate" &&
      !callAccepted
    ) {
      //navigate("/call/receive/conversationId")
      answerCall(call);
      setCallAccepted(true);
    }
  }, [call]);

  const answerCall = ({ offer, conversationId }) => {
    try {
      console.log(stream);
      const peer = new SimplePeer({
        initiator: false,
        trickle: false,
        stream,
        config: {
          iceServers: turnServers,
        },
      });

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
        console.log(e);
        navigate("/main");
        // stream.getTracks().forEach(function (track) {
        //   track.stop();
        // });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const makeCall = () => {
    try {
      console.log(stream);
      const peer = new SimplePeer({
        initiator: true,
        trickle: false,
        stream,
        config: {
          iceServers: turnServers,
        },
      });

      peer.on("signal", (data) => {
        const offer = { conversationId: id, offer: data };
        console.log("sending call", offer.offer, callMade);

        socket.emit("call", offer);
      });

      peer.on("stream", (remoteStream) => {
        if (remoteVideo.current) {
          remoteVideo.current.src = remoteStream;
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
        console.log(e);
        navigate("/main");
        // stream.getTracks().forEach(function (track) {
        //   track.stop();
        // });
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-between h-screen ">
      <video playsInline ref={remoteVideo} autoPlay />
      <video playsInline muted ref={selfVideo} autoPlay />
    </div>
  );
};

export default CallComp;
