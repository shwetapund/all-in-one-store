import React from 'react'
import "./Products.css";
import { Link } from 'react-router-dom';

function Products({_id,name, discription, brand, price, image}) {

  return (
    <div className='product-container'>
      <img src = {image} className='img-products'/>
      <h3 className='product-card-name'>{name}</h3>
      <p className='product-card-discr'>{discription}</p>
      <p>{brand}</p>
      <h4 className='product-card-price'>Rs. ₹ {price} </h4>

      <Link to={`/buy/${_id}`}><button className='buy-btn btn'
     >Buy Now</button></Link>
    </div>
  )
}

export default Products
