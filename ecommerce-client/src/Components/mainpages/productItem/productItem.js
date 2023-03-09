import React from "react";
import { GlobalState } from "../../../GlobalState";
import BtnRender from "./BtnRender";
import './productitem.css'
import axios from "axios";

function ProductItem({product,isAdmin,deleteProduct,handleCheck,updateProduct}){
   
 
    return(
        <div className="product_card">
            {
                isAdmin && <input type="checkbox" checked={product.checked} onChange={()=>handleCheck(product._id)} />
            }
            <img src={product.images.url} alt="" />
            <div className="product_box">
                <h2 title={product.title}>{product.title}</h2>
                <span>
                    Rs.{product.price}
                </span>
                <p>{product.description}</p>
            </div>
            <BtnRender product={product} deleteProduct={deleteProduct} updateProduct={updateProduct}/>
           
        </div>
    )
}
export default ProductItem