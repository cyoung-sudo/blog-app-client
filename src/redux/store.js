import { configureStore } from "@reduxjs/toolkit";
// Reducers
import appReducer from "../appSlice";
import popupReducer from "../components/popup/slices/popupSlice";

export default configureStore({
  reducer: {
    app: appReducer,
    popup: popupReducer
  }
});