import { configureStore } from "@reduxjs/toolkit"
import thunk from 'redux-thunk'
import workerReducer from "./reducers/workerReducer";

export const store = configureStore({
  reducer: workerReducer, 
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: process.env.NODE_ENV !== 'production'
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

