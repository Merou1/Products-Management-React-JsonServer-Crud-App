import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCheckCircle, faCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Products = () => {
    const[products,setProducts]=useState([])
    useEffect(()=>{
        handleGetProducts();
    })
    const handleGetProducts=()=>{
        axios.get("http://localhost:3000/products/").then(
            res=>{
                const products=res.data;
                setProducts(products)
            }
        ).catch(e=>console.log(e))
    }
    const handleDeleteProduct=product=>{
        const newProducts=products.filter(p=>p.id!=product.id)
        setProducts(newProducts)
    }
    const handleCheckButton=product=>{
        const newProducts=products.map(p=>{
            if( p.id==product.id) {p.checked=!p.checked}
            return p
        })
        setProducts(newProducts)
    }
    return ( 
        <div className="p-1 m-1">
            <div className="row">
                <div className="col-md6">
                <div className="card">
            <div className="card-body">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Checked</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product=>{
                            return(
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td><button onClick={()=>handleCheckButton(product)} className="btn btn-outline-success">
                                <FontAwesomeIcon icon={product.checked.toString()=="true"? faCheckCircle:faCircle}></FontAwesomeIcon>
                                    </button>
                                </td>
                                <td>
                                    <button onClick={()=>handleDeleteProduct(product)} className="btn btn-outline-danger">
                                        <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                                    </button>
                                </td>
                            </tr>
                            )

                        })}
                    </tbody>
                </table>
            </div>
        </div>
                </div>
            </div>
   
        </div>     );
}
 
export default Products;