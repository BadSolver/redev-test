// @ts-nocheck
import React from "react";
import { useForm } from "react-hook-form";
import "./style.css";
import { TodoList, InputField } from "components";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllTasks, searchTodo } from "../../store/todoSlice";

export const Todo = () => {
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.todo.searchTodo);
  const toDo = useSelector((state) => state.todo.todo);

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
      {toDo.length > 2 && (
        <>
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
        </>
      )}
      <TodoList allTasks={searchResults.length > 0 ? searchResults : toDo} />
      {toDo.length >= 2 && (
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
