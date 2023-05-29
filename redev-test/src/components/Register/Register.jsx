// @ts-nocheck
import React, { useState } from "react";
import "./style.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../Login/login.css";

export const Register = () => {
  const [registerData, setRegisterData] = useState({
    name: "",
    userName: "",
    email: "",
    password: "",
    regGender: false,
    age: "",
  });
  const navigate = useNavigate();

  const { name, userName, email, password, regGender, age } = registerData;

  const registerUser = async (userData) => {
    if (userData.regGender === "man") {
      userData.regGender = true;
    } else if (userData.regGender === "wooman") {
      userData.regGender = false;
    }

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userData.name,
        username: userData.userName,
        email: userData.email,
        password: userData.password,
        age: userData.age,
        isMan: userData.regGender,
      }),
    };

    const urlForReg =
      "https://first-node-js-app-r.herokuapp.com/api/users/register";
    const response = await fetch(urlForReg, options);
    const responseData = await response.json();
    console.log(responseData);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    setRegisterData({
      name: data.name,
      userName: data.userName,
      email: data.email,
      password: data.password,
      regGender: data.regGender,
      age: data.age,
    });
    registerUser(data);
    reset();
  };
  const [checked, isChecked] = useState(false);

  return (
    <form className="wrapper" onSubmit={handleSubmit(onSubmit)}>
      <h3>Регистрация пользователя</h3>
      <label>
        Введите ваше имя
        <input
          type="text"
          {...register("name", {
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
        {errors.name && <p>{errors.name.message}</p>}
      </label>

      <label>
        Введите вашу фамилию
        <input
          type="text"
          {...register("userName", {
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
          placeholder="Введите вашу фамилию"
        />
        {errors.userName && <p>{errors.userName.message}</p>}
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
              value: 3,
              message: "Слишком короткий логин, используйте более 3 символов",
            },
            maxLength: {
              value: 20,
              message:
                "Слишком длинный логин, используйте максимум 20 символов",
            },
          })}
          placeholder="Введите ваш пароль"
        />
      </label>

      <label>
        Выберите свой пол
        <select
          {...register("regGender", {
            required: true,
          })}
        >
          <option>Не выбрано</option>
          <option value="man">Мужской</option>
          <option value="wooman">Женский</option>
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
      {name && userName && email && password && regGender ? (
        <div>
          <h3>Проверьте введенные вами данные</h3>
          <ul>
            <li>Ваше имя: {name}</li>
            <li>Ваша фамилия: {userName}</li>
            <li>Ваша почта: {email}</li>
            <li>Ваш пароль: {password}</li>
            <li>Ваш пол: {regGender}</li>
            <li>Ваш возраст: {age} </li>
          </ul>
        </div>
      ) : (
        <></>
      )}
    </form>
  );
};
