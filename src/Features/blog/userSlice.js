import { createSlice, createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "src/Api/apiSlice";

const userAdaptor = createEntityAdapter();

const initialState = userAdaptor.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => "/users",
            transformResponse: responseData => {
                return userAdaptor.setAll(initialState, responseData)
            },
            providesTags: ["USER"]
        }),
        addNewUser: builder.mutation({
            query: user => ({ url: "/users", method: "POST", body: user }),
            invalidatesTags: ["USER"]
        }),
        deleteUser: builder.mutation({
            query: userId => ({ url: `/users/${userId}`, method: "DELETE" }),
            invalidatesTags: ["USER"]
        })
    })
})

export const selectUsersResult = extendedApiSlice.endpoints.getUsers.select();

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {}
});

const selectUsersData = createSelector(selectUsersResult, usersResult => usersResult.data);

export const { 
    selectAll: selectAllUsers,
    selectById: selectUserById
} = userAdaptor.getSelectors(state => selectUsersData(state) ?? initialState);

export const { 
    useGetUsersQuery, 
    useAddNewUserMutation, 
    useDeleteUserMutation 
} = extendedApiSlice;

export default usersSlice.reducer;