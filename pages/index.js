import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Layout from '@/components/Layout'
import ProductItem from '@/components/productItem'
import data from '@/utilities/data'
import Product from '@/models/Products'
import db from '@/utilities/db'

const inter = Inter({ subsets: ['latin'] })

export default function Home({products}) {
  return (
    
      <Layout title="Home page">
        <div className='grid gap-12 grid-cols-2 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 w-full mx-auto'>
          {products.map((product) =>
            <ProductItem product={product} key={product.slug}></ProductItem>
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