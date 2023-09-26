import { createContext, useEffect } from "react";
import jwtDecode from "jwt-decode";
import {} from "../api/config";

export const TokenContext = createContext();

const TokenContextProvider = ({ children }) => {
  const checkForToken = () => {
    try {
      const token = window.localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      if (decodedToken.isVerified) {
        return typeof token == "string";
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };
  const checkForTokenAndNotVerify = () => {
    const token = window.localStorage.getItem("token");
    return typeof token == "string";
  };

  return (
    <TokenContext.Provider value={{ checkForToken, checkForTokenAndNotVerify }}>
      {children}
    </TokenContext.Provider>
  );
};

export default TokenContextProvider;
