import React,{useContext, useEffect, useState} from "react";
import {GlobalState} from '../../../GlobalState'
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
function cart(){
    const state=useContext(GlobalState)
    const [cart,setCart]=state.userAPI.cart
    const [token]=state.token
    const [total,setTotal]=useState(0)
    const history=useHistory()
    useEffect(()=>{
        const getTotal=()=>{
            const total=cart.reduce((prev,item)=>{
                return prev+(item.price * item.quantity)
            },0)
            setTotal(total)
        }
        getTotal()
    },[cart])
    const addToCart=async(cart)=>{
        await axios.patch('https://abox.onrender.com/user/addcart',{cart},{
            headers:{Authorization:token}
        })
    }
    const increment=(id)=>{
        cart.forEach(item=>{
            if(item._id===id){
                item.quantity+=1
            }
        })
        setCart([...cart])
        addToCart(cart)
    }
    const decrement=(id)=>{
        cart.forEach(item=>{
            if(item._id===id){
                item.quantity===1 ?  item.quantity=1: item.quantity-=1
            }
        })
        setCart([...cart])
        addToCart(cart)
    }
    const removeProduct=id=>{
        if(window.confirm("Do you want to delete this product?")){
            cart.forEach((item,index)=>{
                if(item._id===id){
                    cart.splice(index,1)
                }
            })
            setCart([...cart])
            addToCart(cart)
        }
    }
    const handleClick=()=>{
        alert(`Your Item is added!`)
        history.push('/')
        
    }
    if(cart.length==0)
        return <h2 style={{textAlign:'center',fontSize:"5rem"}}>Cart Empty</h2>
     
    
    return(
        <div>
            {
                cart.map(product=>(
                    <div className="detail cart" key={product._id}>
                    <img src={product.images.url} alt="" />
                    <div className="box-detail">
                     
                         <h2>{product.title}</h2>
                         
                     <span>Rs.{product.price * product.quantity}</span>
                     <p>{product.description}</p>
                     <p>{product.content}</p>
                     <div className="amount">
                        <button onClick={()=>decrement(product._id)}> - </button>
                        <span>{product.quantity}</span>
                        <button onClick={()=>increment(product._id)}> + </button>
                     </div>
                    <div className="delete" onClick={()=>removeProduct(product._id)}>
                       X </div>
                    
                    </div>
                 </div>
                ))
            }
            <div className="total">
               <h2>Total: Rs. {total}</h2>
               <button onClick={handleClick}>Checkout</button>

               {/* <PayPalButton/> */}
            </div>
        </div>
    )
}
export default cart