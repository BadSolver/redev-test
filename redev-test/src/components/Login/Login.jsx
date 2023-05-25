import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export const Login = () => {
  const [data, setData] = useState({
    userName: "",
    userPassword: "",
  });
  const navigate = useNavigate();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
    setData({
      userName: data.login,
      userPassword: data.password,
    });
    reset();
  };

  const { userName, userPassword } = data;
  return (
    <form className="wrapper" onSubmit={handleSubmit(onSubmit)}>
      <h3>Введите данные для входа</h3>
      <label>
        Введите ваше имя
        <input
          type="text"
          {...register("login", {
            required: true,
            minLength: {
              value: 2,
              message: "Слишком короткое имя, используйте более 2 символов",
            },
            maxLength: {
              value: 20,
              message: "Слишком длинное имя, используйте максимум 20 символов",
            },
          })}
          placeholder="Введите ваше имя"
        />
      </label>
      {/* {errors.login && <p>{errors.login.message}</p>} */}
      <label>
        Введите ваш пароль
        <input
          type="password"
          {...register("password", {
            required: "Поле обязательно для заполнения",
            minLength: {
              value: 3,
              message: "Слишком короткий пароль, используйте более 3 символов",
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
      {/* {errors.password && <p>{errors.password.message}</p>} */}

      <div className="button-block">
        <button type="submit">Войти </button>
        <button
          type="button"
          onClick={() => {
            navigate("/register");
          }}
        >
          Регистрация
        </button>
        <button
          type="button"
          onClick={() => {
            navigate("/todo");
          }}
        > todo</button>
      </div>

      {userName && userPassword ? (
        <>
          <p>Ваш логин : {userName}</p>
          <p>Ваш пароль: {userPassword}</p>
        </>
      ) : (
        <></>
      )}
    </form>
  );
};
