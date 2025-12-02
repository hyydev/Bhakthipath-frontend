import axiosInstance from "../../services/axiosInstance";

// User profile APIs
export const fetchUserProfile = () => axiosInstance.get("/user/userprofile/");

export const updateUserProfile = (data) => axiosInstance.put("/user/userprofile/", data);

// User address APIs
export const fetchUserAddresses = () => axiosInstance.get("/user/addresses/");

export const addUserAddress = (data) => axiosInstance.post("/user/addresses/", data);

export const updateUserAddress = (id, data) => axiosInstance.put(`/user/addresses/${id}/`, data);

export const deleteUserAddress = (id) => axiosInstance.delete(`/user/addresses/${id}/`);

// Product APIs
export const fetchProductCategories = () => axiosInstance.get("/ecommerce/categories/");

export const fetchProducts = (params) => axiosInstance.get("/ecommerce/products/", { params });

export const fetchProductDetails = (id) => axiosInstance.get(`/ecommerce/products/${id}/`);
