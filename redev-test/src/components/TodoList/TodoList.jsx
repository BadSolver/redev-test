import { TodoItem } from "components/TodoItem";
import React, { Fragment, useState } from "react";
import "./style.css";

export const TodoList = ({ data, deleteOneTask, updatedTask }) => {
  const [editMode, setEditMode] = useState(false);
  const [editTaskId, setditTaskId] = useState(null);
  const [editText, setEditText] = useState("");

  const editTask = (taskId) => {
    const taskToEdit = data.find((task) => task.id === taskId);
    setEditMode(true);
    setditTaskId(taskId);
    setEditText(taskToEdit.text);
  };
  const updateTask = () => {
    const updateTask = data.map((task) => {
      if (task.id === editTaskId) {
        return { ...task, text: editText };
      }
      return task;
    });

    updatedTask(updateTask);
    setEditMode(false);
    setditTaskId(null);
    setEditText("");
  };
  const cancelEdit = () => {
    setEditMode(false);
    setditTaskId(null);
    setEditText("");
  };

  const setText = (e) => {
    setEditText(e.target.value);
  };
  return (
    <div className="todo-list-wrapper">
      <ul>
        {data.map((item, index) => {
          return (
            <Fragment key={index}>
              <TodoItem
                key={index}
                task={item}
                deleteOneTask={deleteOneTask}
                editTask={editTask}
              />
              {editMode && editTaskId === item.id ? (
                <li>
                  <form onSubmit={updateTask} className="edit-form">
                    <input type="text" value={editText} onChange={setText} />
                    <div className="edit-btn">
                      <button type="submit">Сохранить</button>
                      <button type="button" onClick={cancelEdit}>
                        Отмена
                      </button>
                    </div>
                  </form>
                </li>
              ) : (
                <></>
              )}
            </Fragment>
          );
        })}
      </ul>
    </div>
  );
};
