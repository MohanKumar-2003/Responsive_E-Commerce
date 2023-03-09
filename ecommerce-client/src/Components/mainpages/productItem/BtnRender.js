import React, { useContext, useState } from "react"
import './productitem.css'
import { GlobalState } from "../../../GlobalState"
import { Link } from "react-router-dom"
import axios from "axios"
function BtnRender({product,deleteProduct,updateProduct}){
    const state=useContext(GlobalState)
    const [token]=state.token
    const [isAdmin]=state.userAPI.isAdmin
    const addCart=state.userAPI.addCart
    var visited=product.visited
    const handleVisited=async(req,res)=>{ 
            await axios.put(`https://abox.onrender.com/api/products/${product._id}`,{...product,visited},{
                headers:{Authorization:token}
            })
           
    }
    return(
    <div className="row_btn">
    { isAdmin?<>
                <Link id="btn_buy" to="#!" onClick={()=>deleteProduct(product._id,product.images.public_id)}>Delete</Link>
               
                <Link id="btn_view" to ={`/edit_product/${product._id}`}> Edit
                </Link></>:
                <>
                <Link id="btn_buy" to="#!" onClick={()=>addCart(product)}>Buy</Link>
               
               <Link id="btn_view" to ={`/detail/${product._id}`} onClick={()=>updateProduct(product._id)}> view
               </Link></>
            }
            </div>
    )
}
export default BtnRender