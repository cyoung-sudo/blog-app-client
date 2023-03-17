import { configureStore } from "@reduxjs/toolkit";
import AppReducer from "../AppSlice";

export default configureStore({
  reducer: {
    App: AppReducer
  }
});