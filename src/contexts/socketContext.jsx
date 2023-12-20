import { useContext, createContext, useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useNavigate, useLocation } from "react-router-dom";
import Encryption from "../encryption";
import { TokenContext } from "./TokenContext";
import { toast } from "react-hot-toast";
import { useQueryClient } from "react-query";
import axios from "axios";
import NotificationToast from "../components/notificationToast";

//production server
let URL = "https://meetup-server.top/";
let withCredentials = true;
let secure = true;

//console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV == "development") {
  URL = "http://localhost:3003/";
  withCredentials = false;
  secure = false;
}

export const SocketContext = createContext();
const sock = io(URL, {
  autoConnect: false,
  withCredentials,
  secure,
});

const SocketContextProvider = ({ children }) => {
  const location = useLocation();
  const queryClient = useQueryClient();
  const user = JSON.parse(window.localStorage.getItem("user"));
  const encryption = new Encryption();
  const [socket, setSocket] = useState();
  const navigate = useNavigate();
  const { checkForToken } = useContext(TokenContext);
  const [onlineContacts, setOnlineContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [onlineGroupUsers, setOnlineGroupUsers] = useState([]);
  const [groupKey, setGroupKey] = useState("");
  const [previousMessages, setPreviousMessages] = useState([]);
  const [newMessage, setNewMessage] = useState({});
  const [encryptedGroupKey, setEncryptedGroupKey] = useState();
  const [currentConversation, setCurrentConversation] = useState("");
  const [finishedTyper, setFinishedTyper] = useState("");
  const [newTyper, setNewTyper] = useState("");
  const [typing, setTyping] = useState([]);
  const [newNotification, setNewNotification] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [newOnlineContact, setNewOnlineContact] = useState("");
  const [newOfflineContact, setNewOfflineContact] = useState("");
  const [call, setNewCall] = useState(null);
  const [turnServers, setTurnServers] = useState([]);

  const connect = () => {
    if (!checkForToken()) return navigate("/login");
    const token = window.localStorage.getItem("token");
    sock.auth = { token };
    sock.connect();
    sock.on("onlineContacts", (args) => setOnlineContacts(args));
    sock.on("new_notification", (args) => setNewNotification(args));
    sock.on("notification", (args) => setNotifications(args));
    sock.on("newOnlineContact", (args) => setNewOnlineContact(args));
    sock.on("newOfflineContact", (args) => setNewOfflineContact(args));
    sock.on("call", (args) => {
      if (!call && args.conversationId && args.offer) {
        setNewCall(args);
        navigate(`/conversation/${args.conversationId}`);
      }
    });

    //error handling
    sock.on("conn_error", () => {
      toast.error("could not connect to conversation");
      navigate("/main", { replace: true });
    });
    sock.on("replySignalError", () => {
      toast.error("could not reply to call");
      navigate("/main", { replace: true });
    });

    setSocket(sock);
    getTurnServers();
  };

  useEffect(() => {
    if (location.pathname.includes("/main")) {
      //perform connection again when the page is re-loaded redirect user to main page
      connect();
      navigate("/main", { replace: true });
      return () => {
        sock.disconnect();
      };
    }
  }, []);

  const getTurnServers = async () => {
    try {
      const { data: turnServers } = await axios.get(
        `https://toniodujinrin.metered.live/api/v1/turn/credentials?apiKey=${`1cfab4b0d52fcd15df7dc08b2edeefa47c32`}`
      );
      if (turnServers) setTurnServers(turnServers);
    } catch (error) {}
  };

  useEffect(() => {
    if (newTyper && newTyper !== user._id) {
      setTyping([newTyper, ...typing]);
      setNewTyper("");
    }
  }, [newTyper]);

  useEffect(() => {
    if (finishedTyper) {
      let _typing = [...typing];
      _typing = _typing.filter((typer) => typer != finishedTyper);
      setTyping(_typing);
      setFinishedTyper("");
    }
  }, [finishedTyper]);

  useEffect(() => {
    try {
      queryClient.invalidateQueries(["conversations"]);
      if (newMessage && groupKey) {
        const _newMessage = newMessage;
        _newMessage.body = JSON.parse(
          encryption.decryptMessage(_newMessage.body, groupKey)
        );
        if (_newMessage.senderId._id !== user._id) {
          socket.emit("messageRead", { conversationId: currentConversation });
        }
        setMessages([...messages, _newMessage]);
      }
    } catch (error) {}
  }, [newMessage]);

  useEffect(() => {
    if (encryptedGroupKey && user) {
      setGroupKey(
        encryption.decryptGroupKey(user.keyPair.privateKey, encryptedGroupKey)
      );
    }
  }, [encryptedGroupKey]);

  useEffect(() => {
    try {
      if (groupKey && previousMessages) {
        const _previousMessages = [...previousMessages];
        _previousMessages.map((message) => {
          if (typeof message.body == "string")
            message.body = JSON.parse(
              encryption.decryptMessage(message.body, groupKey)
            );
        });
        setMessages(_previousMessages);
        setPreviousMessages();
      }
    } catch (error) {}
  }, [groupKey, previousMessages]);

  useEffect(() => {
    if (newNotification.length > 0) {
      queryClient.invalidateQueries(["conversations"]);
      setNotifications(newNotification);
      toast.custom((t) => (
        <NotificationToast
          t={t}
          newNotification={newNotification[0]}
          navigate={navigate}
          location={location}
        />
      ));
    }
  }, [newNotification]);

  useEffect(() => {
    if (newOnlineContact && !onlineContacts.includes(newOnlineContact)) {
      onlineContacts.push(newOnlineContact);
      setNewOnlineContact("");
    }
  }, [newOnlineContact]);

  useEffect(() => {
    if (newOfflineContact) {
      setOnlineContacts(
        onlineContacts.filter((contact) => contact !== newOfflineContact)
      );
    }
  }, [newOfflineContact]);

  const disconnect = () => {
    if (socket) {
      socket.disconnect();
    }
  };

  const joinConversation = (conversationId) => {
    if (socket) {
      leaveConversation();
      setCurrentConversation(conversationId);
      socket.emit("join", { conversationId });
      socket.on("typing", (args) => setNewTyper(args));
      socket.on("notification", (args) => setNotifications(args));
      socket.on("new_notification", (args) => setNewNotification(args));
      socket.on("finished typing", (args) => setFinishedTyper(args));
      socket.on("previousMessages", (args) => setPreviousMessages(args));
      socket.on("groupKey", (args) => setEncryptedGroupKey(args));
      socket.on("onlineUsers", (args) => setOnlineGroupUsers(args));
      socket.on("new_message", (args) => setNewMessage(args));
    }
  };

  const leaveConversation = () => {
    if (socket && currentConversation) {
      socket.emit("leaveRoom", { conversationId: currentConversation });
      setMessages([]);
      setCurrentConversation("");
    }
  };

  const sendMessage = (payload) => {
    if (groupKey && socket) {
      payload.body = encryption.encryptMessage(payload.body, groupKey);
      socket.emit("message", payload);
    } else toast.error("could not send message");
  };

  const sendTyping = (isTyping) => {
    if (socket) {
      if (isTyping) {
        return socket.emit("typing", { conversationId: currentConversation });
      }
      socket.emit("finished typing", { conversationId: currentConversation });
    }
  };

  return (
    <SocketContext.Provider
      value={{
        joinConversation,
        connect,
        messages,
        setNewCall,
        onlineGroupUsers,
        sendMessage,
        onlineContacts,
        leaveConversation,
        disconnect,
        sendTyping,
        typing,
        notifications,
        groupKey,
        socket,
        call,
        turnServers,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
