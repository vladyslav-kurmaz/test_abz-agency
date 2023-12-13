import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Service from "../../service/service";
import { TInitialState } from "../../types/types";

const initialState: TInitialState = {
  workers: null,
  maxCount: 0,
  count: 6,
  disabled: false,
  loading: false,
  error: false,
  position: [],
  success: false,
  error409: false,
};

export const fetchData = createAsyncThunk(
  `worker/fetchWorkers`,
  async (count?: number) => {
    const { getUsers } = Service();
    return await getUsers(count);
  }
);

export const fetchPosition = createAsyncThunk(
  `worker/fetchPosition`,
  async () => {
    const { getPosition } = Service();
    return await getPosition();
  }
);

export const workerReducer = createSlice({
  name: "worker",
  initialState,
  reducers: {
    showMoreWorker: (state) => {
      if (
        state.maxCount % 6 < 6 &&
        (state.maxCount % 6) + state.count === state.maxCount
      ) {
        state.count = state.maxCount;
        state.disabled = true;
      } else {
        state.count = state.count + 6;
        state.disabled = false;
      }
    },
    changeSuccess: (state, action) => {
      state.success = action.payload;
    },
    changeStatusError409: (state, action) => {
      state.error409 = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.maxCount = action.payload.total_users;
        state.workers = action.payload.users;
        state.loading = false;
      })
      .addCase(fetchData.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(fetchPosition.pending, (state, action) => {})
      .addCase(fetchPosition.fulfilled, (state, action) => {
        state.position = [...action.payload.positions];
      })
      .addCase(fetchPosition.rejected, (state, action) => {})
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = workerReducer;

export default reducer;

export const { showMoreWorker, changeSuccess, changeStatusError409 } = actions;
