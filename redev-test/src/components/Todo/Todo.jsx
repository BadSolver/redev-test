// @ts-nocheck
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./style.css";
import { TodoList, InputField } from "components";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllTasks } from "../../store/todoSlice";

export const Todo = () => {
  const dispatch = useDispatch();

  const [searchTodo, setSearchTodo] = useState([]);
  const toDo = useSelector((state) => state.todo.todo);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const updatedTask = async (data) => {
    // setToDo(data);
  };

  const onSubmit2 = (data) => {
    filterByText(data.search);
  };

  const filterByText = (taskText) => {
    const updatedTask = toDo.filter((task) =>
      task.title.toLowerCase().includes(taskText.toLowerCase())
    );

    return updatedTask.length === 0 ? [] : setSearchTodo(updatedTask);
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
                onChange={(e) => filterByText(e.target.value)}
              />
            </label>
            <input type="submit" className="todo-add-btn" value="Найти" />
          </form>
        </>
      )}
      <TodoList
        allTasks={searchTodo.length > 0 ? searchTodo : toDo}
        updatedTask={updatedTask}
      />
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
