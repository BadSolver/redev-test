import React, { createContext, useState } from "react";

const initValue = {
  data: {
    userEmail: "",
    userPassword: "",
  },
};
export const MyContext = createContext(initValue);

export const MyContextProvider = ({ children }) => {
  const [data, setData] = useState({
    userEmail: "",
    userPassword: "",
  });
  const [userToken, setUserToken] = useState("");

  const changeValueToken = (newValue) => {
    setUserToken(newValue);
  };
  const changeData = (data) => {
    setData({
      userEmail: data.email,
      userPassword: data.password,
    });
  };

  const contextValue = {
    data,
    changeData: changeData,
    userToken,
    changeValueToken: changeValueToken,
  };

  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  );
};
