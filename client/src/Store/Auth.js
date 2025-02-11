import { createSlice } from "@reduxjs/toolkit";

 
const AuthSlice = createSlice({
  name : "Auth",
  initialState : {isLoggedIn : false,role : "user"},
  reducers : {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
        state.isLoggedIn = false;
    },
    changeRole(state,action){
        const role = action.payload;
        state.role = role;
    },
  },
});

export const authActions = AuthSlice.actions;
export default AuthSlice.reducer;