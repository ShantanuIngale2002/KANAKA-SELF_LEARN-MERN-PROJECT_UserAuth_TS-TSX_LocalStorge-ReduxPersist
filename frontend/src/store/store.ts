import { configureStore } from "@reduxjs/toolkit";
// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import { persistReducer, persistStore } from "redux-persist";
// import { storage } from "redux-persist/lib/storage";
import authReducer from "./slices/authSlice.ts";

// const persistConfig = {
//     key: "root",
//     version: 1,
//     storage
// };

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});

export default store;
