import React, { useState } from "react";
import "./style.css";
import { useForm } from "react-hook-form";

export const Register = () => {
  //   const [name, setName] = useState("");
  //   const [subName, setSubName] = useState("");
  //   const [email, setEmail] = useState("");
  //   const [newPassword, setNewPassword] = useState("");
  const [registerData, setRegisterData] = useState({
    name: "",
    subName: "",
    email: "",
    password: "",
    regGender: "",
  });

  const { name, subName, email, password, regGender } = registerData;
  console.log(registerData);
  console.log(regGender);
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
    setRegisterData({
      name: data.name,
      subName: data.subName,
      email: data.email,
      password: data.password,
      regGender: data.regGender,
    });

    reset();
  };
  console.log(errors.name);
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
        {/* {errors.name && <p>{errors.name.message}</p>} */}
      </label>

      <label>
        Введите вашу фамилию
        <input
          type="text"
          {...register("subName", {
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
      </label>
      <label>
        Введите вашу почту
        <input
          type="email"
          {...register("email", {
            required: true,
            minLength: {
              value: 3,
              message: "Слишком короткий логин, используйте более 3 символов",
            },
          })}
          placeholder="Введите вашу почту"
        />
      </label>

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
          <option value="nothin">Не выбрано</option>
          <option value="man">Мужской</option>
          <option value="wooman">Женский</option>
        </select>
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

      <button type="submit" disabled={!checked}>
        {" "}
        Регистрация
      </button>
      {name && subName && email && password && regGender ? (
        <div>
          <h3>Проверьте введенные вами данные</h3>
          <ul>
            <li>Ваше имя: {name}</li>
            <li>Ваша фамилия: {subName}</li>
            <li>Ваша почта: {email}</li>
            <li>Ваш пароль: {password}</li>
            <li>Ваш пол: {regGender === "man" ? "Мужской" : "Женский"}</li>
          </ul>
        </div>
      ) : (
        <></>
      )}
    </form>
  );
};
