import React, { createContext, useState } from "react";

const defaultValue = {
  login: "",
  onChangeLogin() {},
  password: "",
  onChangePassword() {},
  data: {
    userLogin: "",
    userPassword: "",
  },
  showData() {},
  name: "",
  subName: "",
  email: "",
  newPassword: "",
  gender: "",
  showRegistrationData() {},
  onChangeName() {},
  onChangeSubName() {},
  onChangeEmail() {},
  onChangeNewPassword() {},
  onChangeGender() {},
  onChangeChecked() {},
};

export const MyContext = createContext(defaultValue);

export const MyContextProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [subName, setSubName] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [gender, setGender] = useState("");
  const [registerData, setRegisterData] = useState({
    registerName: name,
    registerSubName: subName,
    registerEmail: email,
    registerPassword: newPassword,
    registerGender: gender,
  });
  const [checked, setChecked] = useState(true);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState({
    userLogin: "",
    userPassword: "",
  });

  const onChangeChecked = () => {
    setChecked(!checked);
  };

  const onChangeGender = (e) => {
    setGender(e.target.value);
  };

  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangeSubName = (e) => {
    setSubName(e.target.value);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangeNewPassword = (e) => {
    setNewPassword(e.target.value);
  };
  const onChangeLogin = (e) => {
    setLogin(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const showData = (e) => {
    e.preventDefault();
    setData({
      userLogin: login,
      userPassword: password,
    });
    setLogin("");
    setPassword("");
  };

  const showRegistrationData = (e) => {
    e.preventDefault();
    setRegisterData({
      registerName: name,
      registerSubName: subName,
      registerEmail: email,
      registerPassword: newPassword,
      registerGender: gender,
    });
    setName("");
    setSubName("");
    setEmail("");
    setNewPassword("");
  };

  const contextValue = {
    login,
    password,
    data,
    onChangeLogin,
    onChangePassword,
    showData,
    name,
    subName,
    newPassword,
    gender,
    email,
    registerData,
    showRegistrationData,
    onChangeName,
    onChangeSubName,
    onChangeEmail,
    onChangeNewPassword,
    onChangeGender,
    onChangeChecked,
  };

  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  );
};
