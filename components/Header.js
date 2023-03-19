import { Store } from '@/utilities/store';
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'

export default function Header() {

    const { state, dispatch } = useContext(Store)
    const { cart } = state;
    const [cartItemsCount, setCartItemsCount] = useState(0)
    useEffect(()=>{
        setCartItemsCount(cart.cartItems.reduce((a, b) => a + b.quantity, 0)) 
    } ,[cart.cartItems])
    return (
        <div>
            <header>
                <nav className='flex items-center h-12 justify-between shadow-md px-4'>
                    <Link href="/">
                        <h1 className='font-bold text-2xl'>Zehras collection</h1>
                    </Link>
                    <div className='flex'>
                        <Link href='/cart'><h2 className='mr-4'>Cart
                            {cartItemsCount > 0 && (
                            <span className='ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white'>
                                    {cartItemsCount}
                            </span>
                        )}
                        </h2></Link>
                        <Link href='/login'><h2>Login</h2></Link>
                    </div>
                </nav>
            </header>
        </div>
    )
}
