import { TodoItem } from "components/TodoItem";
import React from "react";
import "./style.css";

export const TodoList = ({
  data,
  deleteOneTask,
  editTask,
  editMode,
  updateTask,
  editText,
  editTaskId,
  setText,
  cancelEdit,
}) => {
  return (
    <div className="todo-list-wrapper">
      <ul>
        {data.map((item, index) => {
          return (
            <>
              <TodoItem
                key={index}
                task={item}
                deleteOneTask={deleteOneTask}
                editTask={editTask}
              />
              {editMode && editTaskId === item.id ? (
                <form onSubmit={updateTask} className="edit-form">
                  <input type="text" value={editText} onChange={setText} />
                  <div className="edit-btn">
                    <button type="submit">Сохранить</button>
                    <button type="button" onClick={cancelEdit}>
                      Отмена
                    </button>
                  </div>
                </form>
              ) : (
                <></>
              )}
            </>
          );
        })}
      </ul>
    </div>
  );
};
