import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Service from "../../service/service";
import { IInitialState } from "../../types/types";

const initialState: IInitialState = {
  workers: null,
  count: 6,
  disabled: false,
  loading: false,
  error: false,
  position: [],
  success: false,
  error409: false
};

export const fetchData = createAsyncThunk(
  `worker/fetchWorkers`,
  async (count?: number) => {   
    const { getUsers } = Service(); 
    return await getUsers(count);
  }
);

export const fetchPosition = createAsyncThunk(`worker/fetchPosition`, () => {
  const { getPosition } = Service();
  return getPosition();
});

export const workerReducer = createSlice({
  name: "worker",
  initialState,
  reducers: {
    showMoreWorker: (state) => {
      if (state.count >= 96) {
        state.count = 100;
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
      state.error409 = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.count > 6 ? (state.loading = false) : (state.loading = true);
      })
      .addCase(fetchData.fulfilled, (state, action) => {
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

export const { 
  showMoreWorker,
  changeSuccess,
  changeStatusError409
} = actions;
