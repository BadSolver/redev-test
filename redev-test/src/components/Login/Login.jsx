import React, { useContext } from "react";
import "./login.css";
import { MyContext } from "ContextData";
import { Button, CustomInput } from "components";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  const { showData, onChangeLogin, onChangePassword, data, login, password } =
    useContext(MyContext);

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
