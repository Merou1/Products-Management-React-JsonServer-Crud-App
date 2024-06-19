import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCheckCircle, faCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { deleteProduct, getProducts, checkProduct } from "../app/app";

const Products = () => {
    const[products,setProducts]=useState([])
    useEffect(()=>{
        handleGetProducts();
    },[])
    const handleGetProducts=()=>{
        getProducts().then(resp=>{
            setProducts(resp.data)
        }).catch(e=>console.log(e))
    }
    const handleDeleteProduct=product=>{
        deleteProduct(product).then(
            resp=>{
                const newProducts=products.filter(p=>p.id!=product.id)
                setProducts(newProducts)
            }
        ).catch(e=>console.log(e))
    }
    const handleCheckButton=product=>{
        checkProduct(product).then(resp=>{
        const newProducts=products.map(p=>{
            if( p.id==product.id) {p.checked=!p.checked}
            return p
        })
        setProducts(newProducts)
    }).catch(e=>console.log(e))
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