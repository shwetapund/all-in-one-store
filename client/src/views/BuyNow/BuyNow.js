import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./BuyNow.css";
import increQuan from "./../BuyNow/minus (2).png";
import decreQuan from "./../BuyNow/plus.png"

function BuyNow() {

  const { _id } = useParams();

  const [product, setProduct] = useState({})
  const [quantity, setQuantity] = useState(1);
  const [shippingAddress, setShippingAddress] = useState('');
  const [charges, setCharges] = useState('50');

  const loadProduct = async () => {
    const response = await axios.get(`/find-one-product/${_id}`);

    setProduct(response?.data?.data);
  }

  useEffect(() => {
    loadProduct();
  })

  const incrementQuantity = () => {
    setQuantity(quantity + 1)
  }
  const decrementQuantity = () => {
    if (quantity === 1) {
      return
    }
    setQuantity(quantity - 1)
  }

  const placeOrder = async () => {
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

    const orderDetails = {
      user:currentUser._id,
      product:_id,
      shippingAddress:shippingAddress,
      deliveryCharge:charges,
      quantity:quantity
    }
    
    const response = await axios.post('/order',orderDetails);
    alert(response?.data?.message);
    if(response?.data?.success){
      window.location.href = '/orders'
    }

  }


  return (
    <div>
      <Navbar />
      <div className='specific-product-container'>
        <div>
          <img src={product.image} className='img-product' />
        </div>
        <div>
          <p className='product-name'>{product.name}</p>
          <p className='product-discription'>{product.discription}</p>
          <p className='product-brand'><span className='brand-text'>Brand:</span> {product.brand}</p>
          <p className='product-price'><span className='price-text'>Rs. ₹</span> {product.price}</p>

          <p className='quantity-text'>Quantity:
            <span
              onClick={incrementQuantity}>
              <img src={increQuan} />
            </span>

            <span className='quantity'>{quantity}</span>

            <span onClick={decrementQuantity}>
              <img src={decreQuan} />
            </span>
          </p>

          
          <div>
            <input 
            type='radio'
            name='charges'
            checked = {charges === '40'}
            onClick={()=>{
              setCharges('40')
            }}
            /> Regular Delivery 

            <input 
            type='radio'
            name='charges'
            checked = {charges === '100'}
            onClick={()=>{
              setCharges('100')
            }}/> Fastest Delivery 
          </div>

          <input type='text'
            placeholder='Enter Shipping Address'
            className='input-product-address'
            value={shippingAddress}
            onChange={(e) => {
              setShippingAddress(e.target.value)
            }}
          />

          <button type="button"
            className='btn btn-place-order'
            onClick={placeOrder}>
            Place Order</button>
        </div>

      </div>


    </div>

  )
}


export default BuyNow
