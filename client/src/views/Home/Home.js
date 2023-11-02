import React, { useEffect, useState } from 'react'
import Navbar from './../../components/Navbar/Navbar';
import './Home.css';
import axios from "axios";
import Products from "./../../components/Products/Products";


function Home() {

  const [products, setProducts] = useState([]);

  const loadProduct = async ()=>{
   try{
    const response = await axios.get('/all-in-one-product')
    setProducts(response?.data?.data)
   }
   catch(err){
    console.log(err);
    alert("Error loading products");
   }
  };

  useEffect(()=>{
   loadProduct()
  }, [])


  return (
    <>
      <Navbar />
 
      <div>
        <img src ="https://www.edesk.com/wp-content/uploads/2019/12/profitable-ecommerce-ideas-768x367.png" className='front-img'/>
      </div>

      <h1 className='text-center'>Trending deals</h1>
      <div className='product-flex'>
        {
          products?.map((product, index)=>{

            const {name, discription, brand, price, image} = product;

           return <Products 
            key={index}
            name={name} 
            discription={discription} 
            price={price} 
            image={image}
           />

          })
        }
      </div>
      
    </>
  )
}

export default Home
