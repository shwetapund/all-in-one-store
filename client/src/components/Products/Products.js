import React from 'react'
import "./Products.css";

function Products({name, discription, brand, price, image}) {
  return (
    <div className='product-container'>
      <img src = {image} className='img-product'/>
      <h3 className='product-card-name'>{name}</h3>
      <p className='product-card-discr'>{discription}</p>
      <p>{brand}</p>
      <h4 className='product-card-price'>Rs. ₹ {price} </h4>
    </div>
  )
}

export default Products
