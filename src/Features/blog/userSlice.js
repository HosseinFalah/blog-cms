import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { craeteUser, deleteUser, getAllUsers } from "src/Services/usersServices";

const userAdaptor = createEntityAdapter();

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

const initialState = userAdaptor.getInitialState();

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(fetchUsers.fulfilled, userAdaptor.setAll)
        .addCase(addNewUser.fulfilled, userAdaptor.addOne)
        .addCase(deleteUserById.fulfilled, userAdaptor.removeOne)
    }
});

export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,

} = userAdaptor.getSelectors(state => state.users);

export default usersSlice.reducer;