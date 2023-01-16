import { createSlice } from "@reduxjs/toolkit";

export const userProfileSlice = createSlice({
  name: "userProfile",
  initialState: {
    profileUsername: "...",
    counts: { postCount: "" }
  },
  reducers: {
    setUserProfile: (state, action) => {
      const apiResponse = action.payload;

      state.profileUsername = apiResponse.profileUsername;
      state.counts.postCount = apiResponse.counts.postCount;
    }
  }
});

export const { setUserProfile } = userProfileSlice.actions;

export default userProfileSlice.reducer;

export function selectProfilePostCount(state) {
  return state.userProfile.counts.postCount;
}
