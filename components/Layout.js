
import Head from 'next/head'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import Footer from './Footer';
import { ToastContainer } from 'react-toastify'
import Header from './Header';
import 'react-toastify/dist/ReactToastify.css';
import { signOut, useSession } from 'next-auth/react';
import { Menu } from '@headlessui/react';
import DropdownLink from './DropdownLink';
import Cookies from 'js-cookie';
import { Store } from '@/utilities/Storage';
import Slider from './Home/Slider';



function Layout({ children, title }) {
    const { status, data: session } = useSession();
    const { state, dispatch } = useContext(Store)
    const { cart } = state;
    const [cartItemsCount, setCartItemsCount] = useState(0)
    useEffect(() => {
        setCartItemsCount(cart.cartItems.reduce((a, b) => a + b.quantity, 0))
    }, [cart.cartItems])
 
    const handleLogout = ()=>{
        Cookies.remove('cart')
        dispatch({ type: 'CART_RESET'})
        signOut({callbackUrl: '/login'})
    }

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
                                    session?.user ? (
                                        <Menu as='div' className='relative inline-block'>
                                            <Menu.Button className='text-blue-600'>
                                            {session.user.name}
                                            </Menu.Button>
                                            <Menu.Items className='absolute bg-white right-0 w-56 origin-top-right shadow-lg'>
                                                <Menu.Item>
                                                    <DropdownLink className='dropdown-link' href='/profile'>
                                                        Profile
                                                    </DropdownLink>
                                                </Menu.Item>
                                                <Menu.Item>
                                                    <DropdownLink className='dropdown-link' href='/order'>
                                                        Order History
                                                    </DropdownLink>
                                                </Menu.Item>
                                                <Menu.Item>
                                                    <a className='dropdown-link' href='#' onClick={handleLogout}>
                                                        Logout
                                                    </a>
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Menu>
                                    ) :
                                        (
                                            <Link href='/login'>
                                                Login
                                            </Link>
                                        )
                            }

                        </div>
                    </nav>
                </header>
                {/* <Slider></Slider> */}

                <main className='container m-auto mt-4 px-4'>
                    {children}
                </main>

                <Footer></Footer>
            </div>
        </>
    )
}

export default Layout;