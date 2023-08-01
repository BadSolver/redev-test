// @ts-nocheck
import React, { useState } from "react";
import "./style.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../Login/login.css";

export const Register = () => {
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    gender: "",
    age: "",
  });

  const [checked, isChecked] = useState(false);
  const navigate = useNavigate();

  const { username, email, password, gender, age } = registerData;

  const registerUser = async (userData) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };

    const urlForReg = process.env.REACT_APP_URL_FOR_REGISTRATION;
    const response = await fetch(urlForReg, options);
    await response.json();
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    setRegisterData(data);
    registerUser(data);
    reset();
  };
 

  return (
    <form className="wrapper" onSubmit={handleSubmit(onSubmit)}>
      <h3>Регистрация пользователя</h3>

      <label>
        Введите ваш никнейм
        <input
          type="text"
          {...register("username", {
            required: true,
            minLength: {
              value: 2,
              message: "Слишком коротко, используйте более 2 символов",
            },
            maxLength: {
              value: 20,
              message: "Слишком длинно, используйте максимум 20 символов",
            },
          })}
          placeholder="Введите ваш никнейм"
        />
        {errors.username && <p>{errors.username.message}</p>}
      </label>
      <label>
        Введите вашу почту
        <input
          type="email"
          {...register("email", {
            required: true,
            minLength: {
              value: 3,
              message: "Слишком короткая почта, используйте более 3 символов",
            },
          })}
          placeholder="Введите вашу почту"
        />
      </label>
      {errors.email && <p>{errors.email.message}</p>}

      <label>
        Введите ваш пароль
        <input
          type="password"
          {...register("password", {
            required: "Поле обязательно для заполнения",
            minLength: {
              value: 8,
              message: "Слишком короткий логин, используйте более 8 символов",
            },
            maxLength: {
              value: 20,
              message:
                "Слишком длинный логин, используйте максимум 20 символов",
            },
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
              message:
                "Пароль должен содержать как минимум 1 заглавную букву, 1 прописную букву, 1 число и 1 специальный символ",
            },
          })}
          placeholder="Введите ваш пароль"
        />
      </label>
      {errors.password && <p>{errors.password.message}</p>}
      <label>
        Выберите свой пол
        <select
          {...register("gender", {
            required: true,
          })}
        >
          <option>Не выбрано</option>
          <option value="male">Мужской</option>
          <option value="female">Женский</option>
        </select>
      </label>
      <label>
        Введите ваш возраст
        <input
          type="number"
          {...register("age", {
            required: true,
            minLength: {
              value: 1,
              message: "Используйте более 1 и более символов",
            },
            maxLength: {
              value: 2,
              message: "Используйте максимум 2 символа",
            },
          })}
          placeholder="Введите ваш возраст"
        />
        {errors.age && <p>{errors.age.message}</p>}
      </label>
      <label>
        С правилами ознакомлен
        <input
          type="checkbox"
          className="input-checkbox"
          checked={checked}
          onChange={() => {
            isChecked(!checked);
          }}
        />
      </label>
      <div className="button-block">
        <button type="submit" disabled={!checked}>
          Регистрация
        </button>
        <button
          type="submit"
          onClick={() => {
            navigate("/");
          }}
        >
          Авторизация
        </button>
      </div>
      {username && email && password && gender ? (
        <div>
          <h3>Проверьте введенные вами данные</h3>
          <ul>
            <li>Ваша фамилия: {username}</li>
            <li>Ваша почта: {email}</li>
            <li>Ваш пароль: {password}</li>
            <li>Ваш пол: {gender}</li>
            <li>Ваш возраст: {age} </li>
          </ul>
        </div>
      ) : (
        <></>
      )}
    </form>
  );
};
