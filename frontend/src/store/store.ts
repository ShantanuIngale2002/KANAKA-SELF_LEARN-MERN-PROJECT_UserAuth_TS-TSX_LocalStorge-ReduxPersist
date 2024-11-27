import { configureStore } from "@reduxjs/toolkit";
// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import { persistReducer, persistStore } from "redux-persist";
// import { storage } from "redux-persist/lib/storage";
import authReducer from "./slices/authSlice.ts";
import { apiSlice } from "./slices/apiSlice.ts";

// const persistConfig = {
//     key: "root",
//     version: 1,
//     storage
// };

const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});

export default store;

// to remove type error while using it.
export type RootState = ReturnType<typeof store.getState>;
