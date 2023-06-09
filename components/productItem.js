import Link from 'next/link';
import React from 'react';

const ProductItem = ({ product, handleAddToCart }) => {
    return (
        <div className='card'>
            <Link href={`/product/${product.slug}`}>
                <img
                    src={product.image}
                    alt={product.name}
                    className="rounded shadow h-72 w-full"
                />

            </Link>
            <div className='flex flex-col items-center p-5'>
                <Link href={`/product/${product.slug}`}>

                    <h2 className='text-lg'>{product.name}</h2>
                </Link>
                <p className='mb-2'>{product.brand}</p>
                <p>${product.price}</p>
                <button className='primary-button' type='button' onClick={()=>handleAddToCart(product)}>
                    Add to cart
                </button>
            </div>
        </div>
    );
};

export default ProductItem;