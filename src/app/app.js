import axios from "axios";

export const productsApi=axios.create({
    baseURL:"http://localhost:3000/"
})

const getProducts=()=>{
    return productsApi.get("/products")
}
const deleteProduct=(product)=>{
    return productsApi.delete(`/products/${product.id}`)
}
const getProduct=id=>{
    return productsApi.get(`/products/${id}`)
}
const saveProduct=(product)=>{
    return productsApi.post(`/products`,product)
}
const checkProduct=product=>{
    return productsApi.patch(`/products/`,{checked: !product.checked}) //patch mnin kanbghi n update attribut wla juj sf put mnen kanbghe nbdedel objet kaml ,hna derna checked dyal produit yweli feha leaks dyal checked li kan feh
}
const updateProduct=product=>{
    return productsApi.put(`products`,product)
}