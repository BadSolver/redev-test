// @ts-nocheck
import React from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { logInUser } from "store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "components";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector((state) => state.user.status);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    await dispatch(logInUser(data));
    navigate("/todo");

    reset();
  };
  return (
    <>
      <form className="wrapper" onSubmit={handleSubmit(onSubmit)}>
        {status === "loading" && <Loader />}
        {!status && (
          <>
            <h3>Введите данные для входа</h3>
            <label>
              Введите вашу почту
              <input
                type="email"
                {...register("email", {
                  required: true,
                  minLength: {
                    value: 2,
                    message:
                      "Слишком короткое имя, используйте более 2 символов",
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
              <button type="button" onClick={() => navigate("/register")}>
                Регистрация
              </button>
            </div>
          </>
        )}
      </form>
    </>
  );
};
