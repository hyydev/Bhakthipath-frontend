import api from "../../../services/axios";

// API calls related to User Profile and User address

export const getUserProfile = () => api.get(`/user/userprofile/`)

export const updateUserProfile = (data) => api.patch(`/user/userprofile/`,data)

export const getUserAddresses = () => api.get(`/user/useraddresses/`)

export const addUserAddress = (data)=>api.post("/user/useraddresses/",data)

export const updateUserAddress = (id,data) =>api.patch(`/user/useraddresses/${id}/`,data)

export const deleteUserAddress = (id) => api.delete(`/user/useraddresses/${id}/`)

export const setDefaultAddress =(id)=>api.post(`/user/set-default-address/${id}/`)
