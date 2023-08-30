import Signup from "./pages/signup";
import VerifyAccount from "./pages/signup/verifyAccount";
import VerifyEmail from "./pages/signup/verifyEmail";
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TokenContextProvider from "./contexts/TokenContext";
import UserContextProvider from "./contexts/UserContext";
import { Toaster } from "react-hot-toast";
import SignUpContextProvider from "./contexts/SignUpContext";
import Login from "./pages/login";
import "./api/config"
import { QueryClientProvider, QueryClient } from "react-query";
import Main from "./pages/main";
import Conversation from "./pages/main/conversation";
import NewConversation from "./pages/main/newConversation";
import ConversationContextProvider from "./contexts/conversationContext";
import SocketContextProvider from "./contexts/socketContext";
import Contacts from "./pages/main/contacts";
import Settings from "./pages/main/settings";

const queryClient = new QueryClient()
const App = ()=> {
  
  return (
  <>
  <Toaster
     toastOptions={
      {
      style:{
        background:"#000000",
        color:"#ffffff"
      }
      }
     }
  />
  <QueryClientProvider client={queryClient}>
<TokenContextProvider>
<BrowserRouter>
<SocketContextProvider>
<ConversationContextProvider>
<UserContextProvider>
 <SignUpContextProvider>
 <Routes>

 <Route path="/create" element={<NewConversation/>}/>
  <Route path="/login" element={<Login/>}/>
  <Route path="/verifyAccount" element={<VerifyAccount/>} />
  <Route path="/verifyEmail" element={<VerifyEmail/>} />
  <Route path="/signup" element={<Signup/>} />
  <Route path="/main" element={<Main/>}/>
  <Route path="/conversation/:id" element={<Conversation/>}/>
  <Route path="/contacts" element={<Contacts/>}/>
  <Route path="/settings" element={<Settings/>}/>
  

 </Routes>
 </SignUpContextProvider>
 </UserContextProvider>
 </ConversationContextProvider>
 </SocketContextProvider>
 </BrowserRouter>
 </TokenContextProvider>
 </QueryClientProvider>

</>
  );
}

export default App;
