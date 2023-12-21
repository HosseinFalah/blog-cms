import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllUsers } from "src/Services/usersServices";

export const fetchUsers = createAsyncThunk('/users/fetchUsers', async () => {
    const response = await getAllUsers();
    return response.data;
})

const usersSlice = createSlice({
    name: "users",
    initialState: [],
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            return action.payload;
        })
    }
});

export const selectAllUsers = state => state.users;
export const selectUserById = (state, userId) => state.users.find(user => user.id === userId);

export default usersSlice.reducer;