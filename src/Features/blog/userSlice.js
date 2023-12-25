import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { craeteUser, deleteUser, getAllUsers } from "src/Services/usersServices";

export const fetchUsers = createAsyncThunk('/users/fetchUsers', async () => {
    const { data } = await getAllUsers();
    return data;
})

export const deleteUserById = createAsyncThunk('/users/deleteUserById', async (initialUserId) => {
    await deleteUser(initialUserId);
    return initialUserId;
})

export const addNewUser = createAsyncThunk('/users/addNewUser', async (initialUser) => {
    const { data } = await craeteUser(initialUser);
    return data;
})

const usersSlice = createSlice({
    name: "users",
    initialState: [],
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(fetchUsers.fulfilled, (state, action) => {
            return action.payload;
        })
        .addCase(addNewUser.fulfilled, (state, action) => {
            state.push(action.payload);
        })
        .addCase(deleteUserById.fulfilled, (state, action) => {
            return state.filter(user => user.id !== action.payload)
        })
    }
});

export const selectAllUsers = state => state.users;
export const selectUserById = (state, userId) => state.users.find(user => user.id === userId);

export default usersSlice.reducer;