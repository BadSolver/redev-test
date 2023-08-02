// @ts-nocheck
import { TodoItem } from "components/TodoItem";
import React, { Fragment, useEffect, useState } from "react";
import "./style.css";
import { useDispatch } from "react-redux";
import { getAllTodoFromServer } from "store/todoSlice";

export const TodoList = ({ allTasks }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTodoFromServer());
  }, [dispatch]);

  const token = localStorage.getItem("token");
  const [editMode, setEditMode] = useState(false);
  const [editTaskId, setditTaskId] = useState(null);
  const [editText, setEditText] = useState("");
  const [taskId, setTaskId] = useState(null);

  // const editTask = async (taskId) => {
  //   setEditMode(true);
  //   setditTaskId(taskId);
  //   setTaskId(taskId);
  // };

  // const updateTask = () => {
  //   const updateTask = allTasks.map((task) => {
  //     if (task.id === editTaskId) {
  //       return { ...task, title: editText };
  //     }
  //     return task;
  //   });

  //   setEditMode(false);
  //   setditTaskId(null);
  //   setEditText("");
  // };
  const cancelEdit = () => {
    setEditMode(false);
    setditTaskId(null);
    setEditText("");
  };
  const setText = (e) => {
    setEditText(e.target.value);
  };

  const edTask = async () => {
    const url = process.env.REACT_APP_URL_FOR_EDIT_ONE_TASKS + taskId;
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: editText }),
    };
    await fetch(url, options);
  };

  return (
    <div className="todo-list-wrapper">
      <ul>
        {allTasks.map((todo, index) => {
          return (
            <Fragment key={index}>
              <TodoItem
                key={index}
                todo={todo}
                // editTask={editTask}
              />
              {editMode && editTaskId === todo.id ? (
                <li>
                  <form className="edit-form">
                    <input type="text" value={editText} onChange={setText} />
                    <div className="edit-btn">
                      <button type="submit" onClick={edTask}>
                        Сохранить
                      </button>
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
