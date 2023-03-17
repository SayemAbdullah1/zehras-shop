import Layout from '@/components/Layout';
import { Store } from '@/utilities/store'
import Image from 'next/image';
import { XCircleIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import React, { useContext } from 'react'

export default function CartScreen() {
    const {state, dispatch} = useContext(Store)
    const {
        cart: {cartItems},
    } = state;

    const removeItemHandler = (item) =>{
        dispatch({type: 'CART_REMOVE_ITEM', payload: item})
    }
  return (
    <Layout title="Shopping cart">
        <h1 className='mb-4 text-xl'>Shopping cart</h1>
        {
            cartItems.length === 0 ?
            (
                <div>
                    cart is empty. <Link href='/'>Go to home</Link>
                </div>
            ) :
            (
                <div className='grid md:grid-cols-4 md:gap-5'>
                    <div className='overflow-x-auto md:col-span-3'>
                        <table className='min-w-full'>
                            <thead className='border-b'>
                                <tr>
                                    <th className='px-5'>Item</th>
                                    <th className='p-5 text-right'>Quantity</th>
                                    <th className='p-5 text-right'>Price</th>
                                    <th className='p-5'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cartItems.map((item)=>(
                                <tr key={item.slug} className='border-b'>
                                    <td>
                                        <Link href={`product/${item.slug}`}>
                                        <h3 className='flex items-center'>
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                width={50}
                                                height={50}
                                            ></Image>
                                            &nbsp;
                                            {item.name}
                                        </h3>
                                        </Link>
                                    </td>
                                    <td className='p-5 text-right'>{item.quantity}</td>
                                    <td className='p-5 text-right'>${item.price}</td>
                                    <td className='p-5 text-center'>
                                        <button onClick={()=> removeItemHandler(item)}>
                                            <XCircleIcon className='h-5 w-5'></XCircleIcon>
                                        </button>    
                                    </td>
                                </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>

                </div>
            )

        }
    </Layout>
  )
}