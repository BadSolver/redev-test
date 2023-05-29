import { TodoList } from "components/TodoList";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./style.css";

export const Todo = () => {
  const [toDo, setToDo] = useState([]);
  const [searchTodo, setSearchTodo] = useState([]);

  useEffect(() => {
    const savedData = localStorage.getItem("task");
    if (savedData) {
      setToDo(JSON.parse(savedData));
    }
  }, []);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const updatedTask = (data) => {
    setToDo(data);
  };

  const deleteOneTask = (taskId) => {
    const updatedTask = toDo.filter((task) => task.id !== taskId);
    const updatedSearchtask = searchTodo.filter((task) => task.id !== taskId);
    setToDo(updatedTask);
    setSearchTodo(updatedSearchtask);
  };

  const deleteAllTasks = () => {
    setToDo([]);
    setSearchTodo([]);
  };

  const onSubmit = (data) => {
    const randomId = Math.round(Math.random() * 100000);
    data.id = randomId;
    data.checked = false;
    const newTask = [...toDo, data];
    setToDo(newTask);
    reset();
  };

  const onSubmit2 = (data) => {
    filterByText(data.search);
  };

  const filterByText = (taskText) => {
    const updatedTask = toDo.filter((task) =>
      task.text.toLowerCase().includes(taskText.toLowerCase())
    );
    setSearchTodo(updatedTask);
  };

  useEffect(() => {
    localStorage.setItem("task", JSON.stringify(toDo));
  }, [toDo]);

  return (
    <div className="todo-wrapper">
      <h1>Todo</h1>
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
        data={searchTodo.length > 0 ? searchTodo : toDo}
        deleteOneTask={deleteOneTask}
        updatedTask={updatedTask}
      />
      {toDo.length >= 2 && (
        <button className="btn-delete-all" onClick={deleteAllTasks}>
          Delete all tasks
        </button>
      )}
    </div>
  );
};
