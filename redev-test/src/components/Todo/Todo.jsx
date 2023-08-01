import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./style.css";
import { TodoList } from "components";

export const Todo = () => {
  const [toDo, setToDo] = useState([]);
  const [searchTodo, setSearchTodo] = useState([]);
  const token = localStorage.getItem("token");
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const getAllTasks = async () => {
    const url = process.env.REACT_APP_URL_FOR_GET_ALL_TASKS;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, options);
    const responseData = await response.json();
    setToDo(responseData);
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  const postOneTask = async (data) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: data.title }),
    };

    const url = process.env.REACT_APP_URL_FOR_ONE_TASK;
    const response = await fetch(url, options);
    const resultData = await response.json();
    const newTasks = [...toDo, resultData];
    setToDo(newTasks);
  };

  const updatedTask = async (data) => {
    setToDo(data);
  };

  const deletOneTaskFromData = async (taskId) => {
    const url = process.env.REACT_APP_URL_FOR_DELETE_ONE_TASK + taskId;
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const updatedTask = toDo.filter((task) => task.id !== taskId);
    const updatedSearchtask = searchTodo.filter((task) => task.id !== taskId);

    const response = await fetch(url, options);
    await response.json();
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
    data.isCompleted = false;
    data.title = data.text;
    data.user_id = randomId;
    const newTask = [...toDo, data];
    postOneTask(data);
    setToDo(newTask);
    reset();
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
        allTasks={searchTodo.length > 0 ? searchTodo : toDo}
        deleteOneTask={deletOneTaskFromData}
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
