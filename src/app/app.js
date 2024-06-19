import axios from "axios";

export const productsApi=axios.create({
    baseURL:"http://localhost:3000/"
})

export const getProducts=()=>{
    return productsApi.get("/products")
}
export const deleteProduct=(product)=>{
    return productsApi.delete(`/products/${product.id}`)
}
export const getProduct=id=>{
    return productsApi.get(`/products/${id}`)
}
export const saveProduct=(product)=>{
    return productsApi.post(`/products`,product)
}
export const checkProduct=product=>{
    return productsApi.patch(`/products/${product.id}`,{checked: !product.checked}) //patch mnin kanbghi n update attribut wla juj sf put mnen kanbghe nbdedel objet kaml ,hna derna checked dyal produit yweli feha leaks dyal checked li kan feh
}
export const updateProduct=product=>{
    return productsApi.put(`products/${product.id}`,product)
}