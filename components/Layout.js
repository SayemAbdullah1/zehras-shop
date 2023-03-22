import { Store } from '@/utilities/store';
import Head from 'next/head'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import Footer from './Footer';
import { ToastContainer } from 'react-toastify'
import Header from './Header';
import 'react-toastify/dist/ReactToastify.css';
import { useSession } from 'next-auth/react';

function Layout({ children, title }) {
    const { status, data: session } = useSession();
    const { state, dispatch } = useContext(Store)
    const { cart } = state;
    const [cartItemsCount, setCartItemsCount] = useState(0)
    useEffect(() => {
        setCartItemsCount(cart.cartItems.reduce((a, b) => a + b.quantity, 0))
    }, [cart.cartItems])
 
    return (
        <>
            <Head>
                <title>{title ? title + ' - Zehra' : 'Zehras collection'}</title>
                <meta name='description' content='E-commerce website'></meta>
            </Head>
            <ToastContainer position='bottom-center' limit={1}></ToastContainer>
            <div className='flex min-h-screen flex-col justify-between'>

                {/* Header */}
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

                            {
                                status === 'loading' ? (
                                    'Loading'
                                ) :
                                    session?.user ? (session.user.name
                                    ) :
                                        (
                                            <Link href='/login'>
                                                <h2 >Login</h2>
                                            </Link>
                                        )
                            }

                        </div>
                    </nav>
                </header>

                <main className='container m-auto mt-4 px-4'>
                    {children}
                </main>

                <Footer></Footer>
            </div>
        </>
    )
}

export default Layout;