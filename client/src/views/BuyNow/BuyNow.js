import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./BuyNow.css";

function BuyNow() {

    const { _id } = useParams();
    const [product, setProduct] = useState({})

    const loadProduct = async () => {
        const response = await axios.get(`/find-one-product/${_id}`);

        setProduct(response?.data?.data);
    }

    useEffect(() => {
        loadProduct();
    })

    return (
        <div>
            <Navbar/>
            <div className='specific-product-container'>
                <div>
                    <img src={product.image} className='img-product' />
                </div>
                <div>
                    <p className='product-name'>{product.name}</p>
                    <p className='product-discription'>{product.discription}</p>
                    <p className='product-brand'><span className='brand-text'>Brand:</span> {product.brand}</p>
                    <p className='product-price'><span className='price-text'>Rs. ₹</span> {product.price}</p>
                </div>
            </div>

        </div>
    )
}
// export default BuyNow



  


export default BuyNow
