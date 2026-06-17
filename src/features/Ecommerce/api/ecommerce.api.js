import api from "../../../services/axios";


export const fetchAllProducts =(params)=> api.get('/product/all-product/',{params})
export const fetchProductDetail =(id)=>api.get(`/product/get-product/${id}/`)
export const fetchProductCategories =()=>api.get('/product/category/')

