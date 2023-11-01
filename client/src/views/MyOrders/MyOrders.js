import React, { useState, useEffect } from 'react';
import Navbar from "./../../components/Navbar/Navbar";
import "./MyOrders.css";

function MyOrders() {
  const [user, setUser] = useState({});

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
  return (
    <div>
      <Navbar />
      <h1>MyOrder</h1>
    </div>
  )
}

export default MyOrders
