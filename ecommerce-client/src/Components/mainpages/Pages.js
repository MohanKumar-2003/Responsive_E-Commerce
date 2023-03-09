import React, { useContext } from "react";
import {Switch,Route} from 'react-router-dom';
import Product from "./Products/products"; 
import Login from "./auth/Login";
import Register from "./auth/Register";
import cart from "./cart/cart";
import notFound from "./utils/NotFound/notFound";
import Categories from "./Categories/Categories";
import DetailProduct from "./DetailProduct/DetailProduct";
import createProduct from "./createProduct/createProduct";
import { GlobalState } from "../../GlobalState";
function Pages(){
  const state=useContext(GlobalState)
  const [isLogged]=state.userAPI.isLogged
  const [isAdmin]=state.userAPI.isAdmin
    return(  
      <Switch>
        <Route path="/" exact component={Product}></Route>
        <Route path="/detail/:id" exact component={DetailProduct}></Route>
        <Route path="/login" exact component={isLogged? notFound:Login}></Route>
        <Route path="/category" exact component={isAdmin? Categories:notFound}></Route>
        <Route path="/create_product" exact component={isAdmin? createProduct:notFound}></Route>
        <Route path="/edit_product/:id" exact component={isAdmin? createProduct:notFound}></Route>
        <Route path="/register" exact component={isLogged? notFound:Register}></Route>     
        <Route path="/cart" exact component={cart}></Route>
        
      </Switch>
    
        )
}
export default Pages