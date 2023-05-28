import React, { useContext, useEffect } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { MyContext } from "components/context";

export const Login = () => {
  const { userToken, changeData, data, changeValueToken } =
    useContext(MyContext);

  useEffect(() => {
    localStorage.setItem("token", userToken);
  }, [userToken]);

  const navigate = useNavigate();

  const loginUser = async (userData) => {
    const url = "https://first-node-js-app-r.herokuapp.com/api/auth/login";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
      }),
    };

    const response = await fetch(url, options);
    const data = await response.json();
    changeValueToken(data.token);
  };

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    changeData(data);
    loginUser(data);
    reset();
  };

  const { userEmail, userPassword } = data;
  return (
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
              message: "Слишком длинное имя, используйте максимум 20 символов",
            },
          })}
          placeholder="Введите вашу почту"
        />
        {/* {errors.email && <p>{errors.email.message}</p>} */}
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
        <button
          type="button"
          onClick={() => {
            navigate("/todo");
          }}
        >
          todo
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
  );
};
