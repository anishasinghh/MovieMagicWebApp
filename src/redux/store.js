import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import movieReducer from "./reducers/movieReducer";

const store = configureStore({
  reducer: {
    userReducer,
    movieReducer,
  },
});
export default store;