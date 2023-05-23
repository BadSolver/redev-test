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
  const [checked, setChecked] = useState(false);

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
    const str = e.target.value.toLowerCase().trim();
    const validStr = str.slice(0, 1).toUpperCase() + str.slice(1);
    setName(validStr);
  };

  const onChangeSubName = (e) => {
    const str = e.target.value.toLowerCase().trim();
    const validStr = str.slice(0, 1).toUpperCase() + str.slice(1);
    setSubName(validStr);
  };

  const onChangeEmail = (e) => {
    const str = e.target.value.toLowerCase().trim();
    const validStr = str.slice(0, 1).toUpperCase() + str.slice(1);
    setEmail(validStr);
  };

  const onChangeNewPassword = (e) => {
    setNewPassword(e.target.value.trim());
  };

  const onChangeLogin = (e) => {
    const str = e.target.value.toLowerCase().trim();
    const validStr = str.slice(0, 1).toUpperCase() + str.slice(1);
    setLogin(validStr);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value.trim());
  };

  const showData = (e) => {
    e.preventDefault();
    if (login.length < 2 || login.length >= 20) {
      alert("Ваш логин должен содержать от 2 до 20 символов");
      return;
    } else if (password.length < 6 || password.length >= 20) {
      alert("Пароль должен содержать от 6 до 20 символов");
      return;
    } else {
      setData({
        userLogin: login,
        userPassword: password,
      });
      setLogin("");
      setPassword("");
    }
  };

  const showRegistrationData = (e) => {
    e.preventDefault();
    if (name.length < 2 || name.length >= 20) {
      alert("Имя должно содержать от 2 до 20 символов");
      return;
    } else if (subName.length < 2 || subName.length >= 20) {
      alert("Фамилия должна содержать от 2 до 20 символов");
      return;
    } else if (email.length < 3 || newPassword.length >= 30) {
      alert("Почта должна содержать от 3 до 30 символов");
      return;
    } else if (newPassword.length < 6 || newPassword.length >= 20) {
      alert("Пароль должен содержать от 6 до 20 символов");
      return;
    } else if (gender.length === 0) {
      alert("Пожалуйста выберите ваш пол");
      return;
    } else if (checked === false) {
      alert("Ознакомьтесь пожалуйста с правилами портала");
      return;
    } else {
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
    }
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
