// @ts-nocheck
import React from "react";
import { useForm } from "react-hook-form";
import "./style.css";
import { TodoList, InputField, Loader } from "components";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllTasks, searchTodo } from "../../store/todoSlice";

export const TodoPage = () => {
  const dispatch = useDispatch();
  const {
    searchTodo: search,
    todo,
    status,
  } = useSelector((state) => state.todo);

  console.log(search, todo, status);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit2 = (data) => {
    dispatch(searchTodo(data.text));
  };

  return (
    <div className="todo-wrapper">
      <h1>Todo</h1>
      <InputField />
      {errors.text ? <p className="error-msg"> Ошибка </p> : <></>}
      {status === "loading" && <Loader />}
      {todo.length > 2 && (
        <form onSubmit={handleSubmit(onSubmit2)} className="todo-form">
          <label>
            <h2>Поиск</h2>
            <input
              type="text"
              {...register("search")}
              className="todo-input"
              placeholder="Введите название задачи, которую ищете"
              onChange={(e) => dispatch(searchTodo(e.target.value))}
            />
          </label>
          <input type="submit" className="todo-add-btn" value="Найти" />
        </form>
      )}
      <TodoList allTasks={search.length > 0 ? search : todo} />
      {todo.length >= 2 && (
        <button
          className="btn-delete-all"
          onClick={() => dispatch(deleteAllTasks())}
        >
          Delete all tasks
        </button>
      )}
    </div>
  );
};
