import Signup from "./pages/signup";
import VerifyAccount from "./pages/signup/verifyAccount";
import VerifyEmail from "./pages/signup/verifyEmail";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TokenContextProvider from "./contexts/TokenContext";
import UserContextProvider from "./contexts/UserContext";
import { Toaster } from "react-hot-toast";
import SignUpContextProvider from "./contexts/SignUpContext";
import Login from "./pages/login";
import "./api/config";
import { QueryClientProvider, QueryClient } from "react-query";
import Main from "./pages/main";
import Conversation from "./pages/main/conversation";
import NewConversation from "./pages/main/newConversation";
import ConversationContextProvider from "./contexts/conversationContext";
import SocketContextProvider from "./contexts/socketContext";
import Contacts from "./pages/main/contacts";
import Settings from "./pages/main/settings";
import Home from "./pages/home";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";

const queryClient = new QueryClient();
const App = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            background: "#000000",
            color: "#ffffff",
          },
        }}
      />
      <QueryClientProvider client={queryClient}>
        <TokenContextProvider>
          <BrowserRouter>
            <SocketContextProvider>
              <ConversationContextProvider>
                <UserContextProvider>
                  <SignUpContextProvider>
                    <AnimatePresence>
                      <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route
                          path="/verifyAccount"
                          element={<VerifyAccount />}
                        />
                        <Route path="/verifyEmail" element={<VerifyEmail />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route
                          path="/main/conversation/:id"
                          element={<Conversation />}
                        />
                        <Route
                          path="/main/create"
                          element={<NewConversation />}
                        />
                        <Route path="/main/contacts" element={<Contacts />} />
                        <Route path="/main/settings" element={<Settings />} />
                        <Route path="/main" element={<Main />} />

                        <Route path="/" element={<Home />} />
                      </Routes>
                    </AnimatePresence>
                  </SignUpContextProvider>
                </UserContextProvider>
              </ConversationContextProvider>
            </SocketContextProvider>
          </BrowserRouter>
        </TokenContextProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
