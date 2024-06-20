import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCheckCircle, faCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { deleteProduct, getProducts, checkProduct } from "../app/app";

const Products = () => {
    const[state,setState]=useState({
        products:[],
        currentPage:1,
        pageSize:4,
        keyword:"",
        totalPages:0
    })
    useEffect(()=>{
        handleGetProducts(state.keyword,state.currentPage,state.pageSize);
    },[])

    const handleGetProducts=(keyword,page,size)=>{
        getProducts(keyword,page,size)
        .then(resp=>{
            const totalElements=resp.headers['x-total-count']
            console.log(parseInt(totalElements))
            let totalPages=Math.floor(totalElements/size)
            if(totalElements%size!==0) ++totalPages
            setState({ 
                products: resp.data,
                keyword:keyword,
                currentPage:page,
                pageSize:size,
                totalPages:totalPages
            });
        }).catch(e=>console.log(e))
    }
    const handleDeleteProduct=product=>{
        deleteProduct(product).then(
            resp=>{
                const newProducts=state.products.filter(p=>p.id!=product.id)
                setState({...state,products:newProducts});
            }
        ).catch(e=>console.log(e))
    }
    const handleCheckButton=product=>{
        checkProduct(product).then(resp=>{
        const newProducts=state.products.map(p=>{
            if( p.id==product.id) {p.checked=!p.checked}
            return p
        })
        setState({...state, products:newProducts})
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
                        {state.products.map(product=>{
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
                <ul className="nav nav-pills">
                    {
                        new Array(state.totalPages).fill(0).map((v,index)=>{
                            return(
                            <li>
                                <button>{index+1}</button>
                            </li>
                        )})
                    }
                </ul>

            </div>
        </div>
                </div>
            </div>
   
        </div>     );
}
 
export default Products;