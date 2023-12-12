import React, { useState, useEffect } from 'react';
import Navbar from "./../../components/Navbar/Navbar";
import "./MyOrders.css";
import axios from "axios";
import { Link } from 'react-router-dom';

const STATUS_BADGE_COLOR_MAP = {
  "pending": "badge-danger",
  "shipped":"badge-warning",
  "delivered":"badge-success"
}

function MyOrders() {
  const [user, setUser] = useState({});
  const [order, setOrder] = useState([]);


  useEffect(() => {
    const storageUse = JSON.parse(localStorage.getItem("user") || '{}');
  
    if (storageUse?.email) {
      setUser(storageUse);
    }
    else {
      alert("You are not logged in!");
      window.location.href = "/login";
    }
  }, [])


  const loadOrder = async () => {
    const storageUse = JSON.parse(localStorage.getItem("user") || '{}');
    const userID = storageUse._id;

    if (!userID) {
      return;
    }

    try {
      const response = await axios.get(`/order/user/${userID}`);

      setOrder(response?.data?.data);

    } catch (err) {
      console.log(err.message);
    }

  }
  useEffect(() => {
    loadOrder();
  }, [user])

  return (
    <div>
      <Navbar />
      <h1 className='text-center'>MyOrder</h1>

      <div className='orders-container'>
        {
          order?.map((orderfetch) => {
            const { product, shippingAddress, deliveryCharge, quantity, status } = orderfetch;

            return (<>
              <div className='order-subConatiner'>

                <div>
                  <img src={product.image} className='order-product-img' />
                </div>

                <div>
               <Link to={`/buy/${product._id}`}>{product.name}</Link>   
                  <h4>{shippingAddress} </h4>
                  <h4>{product.price} x {quantity} = {product.price * quantity}</h4>
                  <p>{deliveryCharge}</p>
                  <p className={`order-status ${STATUS_BADGE_COLOR_MAP[status]}`}>{status}</p>
                  <p></p>
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



