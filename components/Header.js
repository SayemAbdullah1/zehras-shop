import { Store } from '@/utilities/store';
import Link from 'next/link'
import React, { useContext } from 'react'

export default function Header() {

    const { state, dispatch } = useContext(Store)
    const { cart } = state;
    return (
        <div>
            <header>
                <nav className='flex items-center h-12 justify-between shadow-md px-4'>
                    <Link href="/">
                        <h1 className='font-bold text-2xl'>Zehras collection</h1>
                    </Link>
                    <div className='flex'>
                        <Link href='/cart'><h2 className='mr-4'>Cart
                        {cart.cartItems.length > 0 && (
                            <span className='ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white'>
                                {cart.cartItems.reduce((a, b) => a + b.quantity, 0)}
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
