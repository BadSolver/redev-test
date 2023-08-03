// @ts-nocheck
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const logInUser = createAsyncThunk(
  "user/logInUser",
  async function (userData, { rejectWithValue }) {
    const url = process.env.REACT_APP_URL_FOR_LOGIN;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Не удалось связаться с сервером");
      }
      const responseData = await response.json();
      localStorage.setItem("token", responseData.token);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async function (userData, { rejectWithValue }) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };
    const url = process.env.REACT_APP_URL_FOR_REGISTRATION;

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Ошибка");
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: {
      id: "",
      username: "",
      email: "",
      gender: "",
      age: "",
    },
    token: "",
    errors: null,
    status: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logInUser.pending, (state, { payload }) => {
        state.status = "loading";
      })
      .addCase(logInUser.fulfilled, (state, { payload }) => {
        state.token = payload;
        state.status = null;
      })
      .addCase(logInUser.rejected, (state, { payload }) => {
        state.errors = payload;
      })
      .addCase(registerUser.pending, (state, { payload }) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.userData = payload;
        state.status = null;
      });
  },
});

export default userSlice.reducer;
// export const {} = userSlice.actions;
