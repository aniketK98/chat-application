import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import messageService from "./messageService";

export const initialState = {
  channelData: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  channelCreated: null,
  message: "",
};

//createChannel
export const createChannel = createAsyncThunk(
  "message/createChannel",
  async (channelData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await messageService.createChannel(channelData, token);
    } catch (error) {
      console.log(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);
//Get Channel
export const getChannels = createAsyncThunk(
  "message/getChannels",
  async (userId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      const response = await messageService.getChannels(userId, token);
      return response;
    } catch (error) {
      console.log(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//sendMessage
export const sendMessage = createAsyncThunk(
  "message/sendMessage",
  async (messageData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await messageService.sendMessage(messageData, token);
    } catch (error) {
      console.log(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//slice
export const messageSlice = createSlice({
  initialState: initialState,
  name: "message",
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createChannel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createChannel.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
        state.channelCreated = action.payload;
      })
      .addCase(createChannel.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getChannels.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getChannels.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
        state.channelData = action.payload;
      })
      .addCase(getChannels.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(sendMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = messageSlice.actions;
export default messageSlice.reducer;
