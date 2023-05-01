import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Layout from '@/components/Layout'
import ProductItem from '@/components/productItem'
import data from '@/utilities/data'
import Product from '@/models/Products'
import db from '@/utilities/db'
import axios from 'axios'
import { useContext } from 'react'
import { toast } from 'react-toastify'
import { Store } from '@/utilities/Storage'

const inter = Inter({ subsets: ['latin'] })

export default function Home({products}) {
  const {state, dispatch} = useContext(Store)
  const {cart} = state;
  const handleAddToCart = async (product) => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug)
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error('Sorry! product is not in stock')
      
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
toast.success('Product added to the cart')
  };

  return (
    
      <Layout title="Home page">
        <div className='grid gap-12 grid-cols-2 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 w-full mx-auto'>
          {products.map((product) =>
            <ProductItem 
            product={product} 
            key={product.slug}
            handleAddToCart={handleAddToCart}
            ></ProductItem>
          )}
        </div>
      </Layout>

  )
}


export async function getServerSideProps(){
  await db.connect()
  const products = await Product.find().lean();
  return {
    props:{
      products: products.map(db.converDocToObj),
    }
  }
}