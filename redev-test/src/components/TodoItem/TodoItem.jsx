// @ts-nocheck
import React from "react";
import "./style.css";
import { deleteOneTaskFromServer } from "../../store/todoSlice";
import { useDispatch } from "react-redux";

export const TodoItem = ({ todo, editTask }) => {
  const dispatch = useDispatch();

  return (
    <li className="item-wrapper">
      <button
        type="button"
        className="todo-edit-btn"
        onClick={() => {
          editTask(todo.id);
        }}
      ></button>
      <span className="todo-text">{todo.title}</span>
      <button
        type="button"
        className="todo-delete-btn"
        onClick={() => {
          dispatch(deleteOneTaskFromServer(todo.id));
        }}
      ></button>
    </li>
  );
};
