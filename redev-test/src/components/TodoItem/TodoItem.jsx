import React from "react";

import "./style.css";

export const TodoItem = ({ task, deleteOneTask, editTask }) => {
  return (
    <div className="item-wrapper">
      <button
        type="button"
        className="todo-edit-btn"
        onClick={() => {
          editTask(task.id);
        }}
      ></button>
      <li key={task.id}>{task.text}</li>
      <button
        type="button"
        className="todo-delete-btn"
        onClick={() => {
          deleteOneTask(task.id);
        }}
      ></button>
    </div>
  );
};
