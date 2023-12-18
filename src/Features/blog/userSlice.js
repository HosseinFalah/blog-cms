import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {id: 1, fullname: "حسین فلاح"},
    {id: 2, fullname: "امیررضا حقی"},
    {id: 3, fullname: "محمد رضا احمدی"},
]

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {}
});


export default usersSlice.reducer;