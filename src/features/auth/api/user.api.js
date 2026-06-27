import api from "../../../services/axios";

// API calls related to User Profile and User address

export const getUserProfile = (user_id) => api.get(`/user/userprofile/${user_id}/`)

export const updateUserProfile = (user_id,data) => api.patch(`/user/userprofile/${user_id}/`,data)

export const getUserAddresses = () => api.get(`/user/useraddresses/`)

export const addUserAddress = (data)=>api.post("/user/useraddresses/",data)

export const updateUserAddress = (id,data) =>api.patch(`/user/useraddresses/${id}/`,data)

export const deleteUserAddress = (id) => api.delete(`/user/useraddresses/${id}/`)

export const setDefaultAddress =(id)=>api.post(`/user/set-default-address/${id}/`)
