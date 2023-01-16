import { useEffect } from "react";
import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    profileUsername: "...",
    value: 2
  },
  reducers: {
    addUser: () => {
      useEffect(state => {
        async function fetchData() {
          try {
            const response = await Axios.post(`/profile/${username}`, {
              token: appState.user.token
            });
            state.value += 1;
          } catch (e) {
            console.log("problem");
          }
        }
        fetchData();
      }, []);
    }
  }
});

export const { addUser } = counterSlice.actions;

export default counterSlice.reducer;
