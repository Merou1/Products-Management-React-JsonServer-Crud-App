import { useState } from "react";
import { saveProduct } from "../app/app";
import { JSON } from "mysql/lib/protocol/constants/types";
import { STRING } from "mysql/lib/protocol/constants/types";


const New = () => {
    const [name,setName]=useState("")
    const [price,setPrice]=useState(0)
    const [checked,setChecked]=useState(false)
const handleSaveProduct=(event)=>{
    event.preventDefault()
    let product={name,price,checked}
    saveProduct(product).then(resp=>{
            alert(JSON.stringify(resp.data)) 
    }).catch(e=>console.log(e))
}
    return ( 
        <div className="row p-1">
            <div className="col-md-6">
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={handleSaveProduct} action="">
                            <div className="mb-3">
                                <label className="form-label" htmlFor="">Name</label>
                                <input onChange={(e)=>setName(e.target.value )} value={name} className="form-control" type="text" name="" id="" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="">Price</label>
                                <input onChange={e=>setPrice(e.target.value)} value={price} className="form-control" type="text" name="" id="" />
                            </div>
                            <div className="form-check mb-3">
                                <input className="form-check-input" onChange={e=>setChecked(e.target.checked)}  checked={checked} type="checkbox" />
                                <label className="form-check-label" htmlFor="">Checked</label>
                            </div>
                            <button className="btn btn-success">Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default New;