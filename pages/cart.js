import Layout from '@/components/Layout';
import { Store } from '@/utilities/store'
import Image from 'next/image';
import { XCircleIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import React, { useContext } from 'react'
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

function CartScreen() {
    const router = useRouter();
    const {state, dispatch} = useContext(Store)
    const {
        cart: {cartItems},
    } = state;

    const removeItemHandler = (item) =>{
        dispatch({type: 'CART_REMOVE_ITEM', payload: item})

    }

    const handleUpdateValue = (item, qty) =>{
        const quantity = Number(qty);
        dispatch({type: 'CART_ADD_ITEM', payload:{...item, quantity}})
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
                    <div className='overflow-x-auto md:col-span-3 shadow-md'>
                        <table className='min-w-full'>
                            <thead className='border-b'>
                                <tr>
                                    <th className='px-5'>Item</th>
                                    <th className='p-5 text-right'>Quantity</th>
                                    <th className='p-5 text-right'>Price</th>
                                    <th className='p-5'>Action</th>
                                </tr>
                            </thead>
                            <tbody className='shadow-md'>
                                {
                                    cartItems.map((item)=>(
                                        <tr key={item.slug} className=''>
                                            <td className='border-b'>
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
                                    <td className='p-5 text-right'>
                                        <select value={item.quantity} onChange={(e)=> handleUpdateValue(item, e.target.value)}>
                                                    {[...Array(item.countInStock).keys()].map((x) => (
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    ))}
                                        </select>
                                    </td>
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
                    <div className='pb-3 shadow-md p-5'>
                        <ul>
                            <li>
                                <div className='pb-3 text-xl'>Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}) : $
                                    {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                                </div>
                                <button onClick={()=> router.push('login?redirect=/shipping')} className='primary-button w-full mt-4'>Checkout</button>
                            </li>
                        </ul>
                    </div>
                </div>
            )

        }
    </Layout>
  )
}
export default dynamic(()=> Promise.resolve(CartScreen), {ssr:false})