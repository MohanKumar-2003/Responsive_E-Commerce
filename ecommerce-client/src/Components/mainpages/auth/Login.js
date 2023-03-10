import React,{useState} from "react";
import {Link} from 'react-router-dom'
import axios from 'axios'

function Login(){
    const [user,setUser]=useState({
        email:'',password:''
    })
    const onChangeInput=e=>{
        const {name,value}=e.target;
        setUser({...user,[name]:value})
    }
    const loginSubmit=async e=>{
        e.preventDefault()
        try{
           await axios.post('https://abox.onrender.com/user/login',{...user}).then(res => localStorage.setItem('token', res.data.accesstoken))
           localStorage.setItem('firstLogin', true)
           window.location.href = '/'
        }
        catch(err){
            alert(err.response.data.msg)
        }
    }
    return(
    <div className="login-page">
        <form onSubmit={loginSubmit}>
            <h2>LOGIN PAGE</h2>
            <input type="email" name="email" required placeholder="Email" value={user.email} onChange={onChangeInput} />
            <input type="password" name="password" required autoComplete="on" placeholder="Password" value={user.password} onChange={onChangeInput} />
        </form>
        <div className="row">
            <button type="submit" onClick={loginSubmit}>Login</button>
            <Link to="/register">Register</Link>
        </div>
    </div>
    )
}
export default Login