import React, { useContext } from "react";
import "./login.css";
import { MyContext } from "ContextData";
import { Button, Form } from "components";
import { Link } from "react-router-dom";

export const Login = () => {
  const { showData, onChangeLogin, onChangePassword, data, login, password } =
    useContext(MyContext);
  const options = {
    textDecoration: "none",
    color: "Black",
  };

  const { userLogin, userPassword } = data;
  return (
    <form className="wrapper">
      <h3>Введите данные для входа</h3>
      <Form
        placeholder="Введите ваш логин"
        onChange={onChangeLogin}
        name="login"
        value={login}
        type="text"
      />
      <Form
        placeholder="Введите ваш пароль"
        onChange={onChangePassword}
        name="email"
        value={password}
        type="password"
      />
      <div className="button-block">
        <Button onClick={showData} text="Войти" />
        <Button
          onClick={(e) => {
            e.preventDefault();
          }}
          text={
            <Link to="/register" style={options}>
              Зарегистрироваться
            </Link>
          }
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
