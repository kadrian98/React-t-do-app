import { configureStore } from "@reduxjs/toolkit";
import userProfileSlice from "../../stores/userProfileSlice";

export default configureStore({
  reducer: {
    userProfile: userProfileSlice
  }
});
