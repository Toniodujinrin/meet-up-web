import { createContext, useContext, useState } from "react";
import { _delete, post } from "../api/config";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { get } from "../api/config";
import { useQueryClient } from "react-query";

export const ConversationContext = createContext();

const ConversationContextProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [conversationDetails, setconversationDetails] = useState(null);
  const [conversationProcessLoading, setConversationProcessLoading] =
    useState(false);

  const getConversation = async (id) => {
    try {
      const { data } = await get(`conversations/${id}`);
      if (data) setconversationDetails(data);
      else setconversationDetails(null);
    } catch (error) {
      if (error.response && error.response.data)
        return toast.error(error.response.data);
      toast.error("could not get conversation details");
    }
  };

  const createConversation = async (payload) => {
    try {
      const { data } = await post("conversations", payload);
      if (data && data.status == "success")
        queryClient.invalidateQueries(["conversations"]);
      navigate("/main");
      toast.success("conversation created successfully");
    } catch (error) {
      if (error.response && error.response.data)
        return toast.error(error.response.data);
      toast.error("could not create conversation");
    }
  };

  const addToConversation = async (payload) => {
    try {
      setConversationProcessLoading(true);
      const { data } = await post("conversations/add", payload);
      if (data && data.status == "success") {
        queryClient.invalidateQueries(["conversations"]);
        toast.success("user added to conversation");
      }
    } catch (error) {
      if (error.response && error.response.data)
        return toast.error(error.response.data);
      toast.error("could not create conversation");
    } finally {
      setConversationProcessLoading(false);
    }
  };

  const leaveConversation = async () => {
    try {
      setConversationProcessLoading(true);
      const { data } = await post(
        `conversations/leave/${conversationDetails._id}`
      );
      if (data && data.status == "success") {
        navigate("/main", { replace: true });
        queryClient.invalidateQueries(["conversations"]);
        toast.success("successfully left conversation");
      }
    } catch (error) {
      if (error.response && error.response.data)
        return toast.error(error.response.data);
      toast.error("could not leave conversation");
    } finally {
      setConversationProcessLoading(false);
    }
  };

  const deleteConversation = async () => {
    try {
      setConversationProcessLoading(true);
      const { data } = await _delete(
        `conversations/${conversationDetails._id}`
      );
      if (data && data.status == "success") {
        navigate("/main", { replace: true });
        queryClient.invalidateQueries(["conversations"]);
        toast.success("successfully deleted conversation");
      }
    } catch (error) {
      if (error.response && error.response.data)
        return toast.error(error.response.data);
      toast.error("could not delete conversation");
    } finally {
      setConversationProcessLoading(false);
    }
  };

  return (
    <ConversationContext.Provider
      value={{
        deleteConversation,
        conversationProcessLoading,
        addToConversation,
        leaveConversation,
        createConversation,
        getConversation,
        conversationDetails,
        conversationProcessLoading,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

export default ConversationContextProvider;
