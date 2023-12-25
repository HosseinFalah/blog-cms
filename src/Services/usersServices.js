import apiRequest from "./Config/config";

// @desc Get All Users
// @route GET http://localhost:9000/users
export const getAllUsers = () => {
    return apiRequest.get('/users');
}
// @desc Get With User ID
// @route GET http://localhost:9000/users/:userId
export const getUser = (userId) => {
    return apiRequest.get(`/users/${userId}`);
}
// @desc Craete New User
// @route POST http://localhost:9000/users
export const craeteUser = (user) => {
    return apiRequest.post('/users', user);    
}
// @desc Delete User
// @route DELETE http://localhost:9000/users
export const deleteUser = (userId) => {
    return apiRequest.delete(`/users/${userId}`);
}