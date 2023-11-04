import React, { useState, useEffect } from 'react';
import Navbar from "./../../components/Navbar/Navbar";
import "./MyOrders.css";
import axios from "axios";

function MyOrders() {
  const [user, setUser] = useState({});
  const [order, setOrder] = useState([]);



  useEffect(()=>{
    const storageUse = JSON.parse(localStorage.getItem("user") || '{}');

    if(storageUse?.email){
      setUser(storageUse);
    }
    else
    {
      alert("You are not logged in!");
      window.location.href = "/login";
    }
  }, [])


  const loadOrder = async ()=>{
    const storageUse = JSON.parse(localStorage.getItem("user") || '{}');
    const userID = storageUse._id;

    if(!userID){
      return;
    }
    console.log(userID);
    try{
      const response = await axios.get(`/order/user/${userID}`);
  
      setOrder(response?.data?.data);
      console.log(response?.data?.data);
    

    }catch(err){
      console.log(err.message);
    }
   
  }
  useEffect(()=>{
    loadOrder();
  },[user])

  return (
    <div>
      <Navbar />
      <h1 className='text-center'>MyOrder</h1>

<div className='orders-container'>
      {
        order?.map((orderfetch)=>{
          const {product, shippingAddress,deliveryCharge,quantity, status} = orderfetch;

          return(<>
<div className='order-subConatiner'>
  

<div>
<img src={product.image} className='order-product-img'/>
</div>
         
       <div>
       <h2>{product.name}</h2>
       <p>{shippingAddress}</p>
          <p>{deliveryCharge}</p>
          <p>{status}</p>
          <p>{quantity}</p>
       </div>
</div>
          </>
          )
        })
      }
    </div>
    </div>
  )
}

export default MyOrders



