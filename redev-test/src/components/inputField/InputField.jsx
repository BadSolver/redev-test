// @ts-nocheck
import React from "react";
import "./style.css";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addTodoToServer } from "../../store/todoSlice";

export const InputField = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const randomId = Math.round(Math.random() * 100000);
    data.id = randomId;
    data.isCompleted = false;
    data.title = data.text;
    data.user_id = randomId;
    dispatch(addTodoToServer(data));
    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="todo-form">
        <label>
          <input
            type="text"
            {...register("text", {
              minLength: {
                value: 3,
                message: "Минимум 3 символа",
              },
            })}
            placeholder="Введите задачу"
            className="todo-input"
          />
        </label>
        <input type="submit" value="Создать дело" className="todo-add-btn" />
      </form>
      {errors.text ? <p className="error-msg"> Ошибка </p> : <></>}
    </>
  );
};
