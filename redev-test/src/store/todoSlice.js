// @ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllTodoFromServer = createAsyncThunk(
  "todo/getAllTodoFromServer",
  async function (_, { rejectWithValue }) {
    const url = process.env.REACT_APP_URL_FOR_GET_ALL_TASKS;
    const token = localStorage.getItem("token");
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Не удалось выполнить запрос");
      }
      const responseData = await response.json();

      return responseData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addTodoToServer = createAsyncThunk(
  "todo/addTodoToServer",
  async function (data, { rejectWithValue, dispatch }) {
    const token = localStorage.getItem("token");
    const url = process.env.REACT_APP_URL_FOR_ONE_TASK;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: data.title }),
    };
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Ошибка при отправке данных");
      }
      const dataResponse = await response.json();

      dispatch(addTodo(dataResponse));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteOneTaskFromServer = createAsyncThunk(
  "todo/deleteOneTaskFromServer",
  async function (id, { rejectWithValue, dispatch }) {
    const url = process.env.REACT_APP_URL_FOR_DELETE_ONE_TASK + id;
    const token = localStorage.getItem("token");
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Запрос не удался");
      }
      //   const responseData = await response.json();
      dispatch(deleteOneTodo(id));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todo: [],
    isCompleted: false,
    status: null,
    error: null,
    searchTodo: [],
  },
  reducers: {
    addTodo(state, { payload }) {
      state.todo.push(payload);
    },
    deleteAllTasks(state) {
      state.todo = [];
    },
    deleteOneTodo(state, { payload }) {
      state.todo = state.todo.filter((todo) => todo.id !== payload);
      state.searchTodo = state.searchTodo.filter((todo) => todo.id !== payload);
    },
    searchTodo(state, { payload }) {
      state.searchTodo = state.todo.filter((todo) =>
        todo.title.toLowerCase().includes(payload.toLowerCase())
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTodoFromServer.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllTodoFromServer.fulfilled, (state, { payload }) => {
        state.status = "complete";
        state.todo = payload;
      })
      .addCase(getAllTodoFromServer.rejected, (state, { payload }) => {
        state.status = "fail";
        state.error = payload;
      });
  },
});

export default todoSlice.reducer;
export const { addTodo, deleteAllTasks, deleteOneTodo, searchTodo } =
  todoSlice.actions;
