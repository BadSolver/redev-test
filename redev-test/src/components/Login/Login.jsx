// @ts-nocheck
import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export const Login = () => {
  const [formData, setFormdData] = useState({
    userEmail: "",
    userPassword: "",
  });

  const navigate = useNavigate();

  const loginUser = async (userData) => {
    const url = process.env.REACT_APP_URL_FOR_LOGIN;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };

    const response = await fetch(url, options);
    const responseData = await response.json();
    localStorage.setItem("token", JSON.stringify(responseData.token));
    if (responseData.token) {
      navigate("/todo");
    }
  };

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    setFormdData(data);
    loginUser(data);

    reset();
  };

  const { userEmail, userPassword } = formData;
  return (
    <>
      <form className="wrapper" onSubmit={handleSubmit(onSubmit)}>
        <h3>Введите данные для входа</h3>
        <label>
          Введите вашу почту
          <input
            type="email"
            {...register("email", {
              required: true,
              minLength: {
                value: 2,
                message: "Слишком короткое имя, используйте более 2 символов",
              },
              maxLength: {
                value: 50,
                message:
                  "Слишком длинное имя, используйте максимум 20 символов",
              },
            })}
            placeholder="Введите вашу почту"
          />
          {errors.email && <p>{errors.email.message}</p>}
        </label>
        {errors.login && <p>Ошибка</p>}
        <label>
          Введите ваш пароль
          <input
            type="password"
            {...register("password", {
              required: "Поле обязательно для заполнения",
              minLength: {
                value: 3,
                message:
                  "Слишком короткий пароль, используйте более 3 символов",
              },
              maxLength: {
                value: 20,
                message:
                  "Слишком длинный пароль, используйте максимум 20 символов",
              },
            })}
            placeholder="Введите ваш пароль"
          />
        </label>
        {errors.password && <p>ошибка</p>}

        <div className="button-block">
          <button type="submit" disabled={!isValid}>
            Войти
          </button>
          <button
            type="button"
            onClick={() => {
              navigate("/register");
            }}
          >
            Регистрация
          </button>
        </div>

        {userEmail && userPassword ? (
          <>
            <p>Ваша почта : {userEmail}</p>
            <p>Ваш пароль: {userPassword}</p>
          </>
        ) : (
          <></>
        )}
      </form>
    </>
  );
};
