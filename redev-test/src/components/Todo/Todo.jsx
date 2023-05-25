import React, { useState } from "react";
import { useForm } from "react-hook-form";

export const Todo = () => {
  const [toDo, setToDo] = useState({
    checked: false,
    task: "",
  });

  const { register, reset, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(JSON.stringify(data));
    const newTask = {...toDo, data}
    console.log(newTask)
    setToDo({
      checked: false,
      task: data.task,
    });
    reset()
  };

  return (
    <>
      <h1>Todo</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Введите задачу
          <input type="text" {...register("task", {})} />
        </label>
        <input type="submit" value="Создать дело" />
        <h2>{toDo.task}</h2>
      </form>
    </>
  );
};
