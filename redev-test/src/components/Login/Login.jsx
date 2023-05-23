import React, { useState } from "react";
import "./login.css";
import { Button, CustomInput } from "components";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState({
    userLogin: "",
    userPassword: "",
  });
  const navigate = useNavigate();

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

  const { userLogin, userPassword } = data;
  return (
    <form className="wrapper" onSubmit={showData}>
      <h3>Введите данные для входа</h3>
      <CustomInput
        placeholder="Введите ваш логин"
        value={login}
        type="text"
        onChange={onChangeLogin}
      />

      <CustomInput
        placeholder="Введите ваш пароль"
        value={password}
        type="password"
        onChange={onChangePassword}
      />

      <div className="button-block">
        <Button onClick={() => {}} text="Войти" type="submit" />
        <Button
          onClick={() => {
            navigate("/register");
          }}
          text="Зарегистрироваться"
          type="button"
        />
      </div>

      {userLogin && userPassword ? (
        <>
          <p>Ваш логин : {userLogin}</p>
          <p>Ваш пароль: {userPassword}</p>
        </>
      ) : (
        <></>
      )}
    </form>
  );
};
