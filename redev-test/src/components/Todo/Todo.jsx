import React, { useState } from "react";
import { useForm } from "react-hook-form";

export const Todo = () => {
  const [toDo, setToDo] = useState([]);

  //   const [value, setValue] = useState("");

  const { register, reset, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(JSON.stringify(data));
    const newTask = [...toDo, data];
    console.log(newTask);
    setToDo(newTask);

    reset();
  };

  const [checked, setChecked] = useState(false);

  return (
    <>
      <h1>Todo</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Введите задачу
          <input
            type="text"
            {...register("text", { required: "Заполнение обязательно" })}
            placeholder="Введите задачу"
          />
        </label>
        <input type="submit" value="Создать дело" />
        <h2>
          <ul>
            {toDo.map((item, index) => {
              return (
                <li key={index}>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => {
                      setChecked(!checked);
                    }}
                  />
                  {item.text}
                </li>
              );
            })}
          </ul>
        </h2>
      </form>
    </>
  );
};
