// @ts-nocheck
import { TodoItem } from "components";
import React, { Fragment, useEffect, useState } from "react";
import "./style.css";
import { useDispatch } from "react-redux";
import { getAllTodoFromServer, editOneTodo } from "store/todoSlice";

export const TodoList = ({ allTasks }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTodoFromServer());
  }, [dispatch]);

  const [editMode, setEditMode] = useState(false);
  const [taskIdToEdit, setTaskIdToEdit] = useState(null);
  const [editedTitles, setEditedTitles] = useState("");

  const editTask = (taskId, title) => {
    setEditMode(true);
    setTaskIdToEdit(taskId);
    setEditedTitles(title || "");
  };

  const handleSaveEdit = () => {
    dispatch(editOneTodo({ id: taskIdToEdit, title: editedTitles }));
    setEditMode(false);
    setTaskIdToEdit(null);
    setEditedTitles("");
  };

  const cancelEdit = () => {
    setEditMode(false);
    setTaskIdToEdit(null);
    setEditedTitles("");
  };
  //   const url = process.env.REACT_APP_URL_FOR_EDIT_ONE_TASKS + editTaskId;
  //   const options = {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //     body: JSON.stringify({ title: editText }),
  //   };

  //   const response = await fetch(url, options);
  //   const responseData = await response.json();
  //   setEditMode(false);
  //   console.log(responseData);
  // };

  return (
    <div className="todo-list-wrapper">
      <ul>
        {allTasks.map((todo, index) => {
          return (
            <Fragment key={index}>
              <TodoItem key={index} todo={todo} editTask={editTask} />
              {editMode && taskIdToEdit === todo.id ? (
                <li>
                  <form className="edit-form">
                    <input
                      type="text"
                      value={editedTitles}
                      onChange={(e) => setEditedTitles(e.target.value)}
                    />
                    <div className="edit-btn">
                      <button type="submit" onClick={handleSaveEdit}>
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
