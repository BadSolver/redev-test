import React from "react";

import "./style.css";

export const TodoItem = ({ task, deleteOneTask, editTask }) => {
  return (
    <li className="item-wrapper">
      <button
        type="button"
        className="todo-edit-btn"
        onClick={() => {
          editTask(task.id);
        }}
      ></button>
      <span className="todo-text">{task.text}</span>
      <button
        type="button"
        className="todo-delete-btn"
        onClick={() => {
          deleteOneTask(task.id);
        }}
      ></button>
    </li>
  );
};
