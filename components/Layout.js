import { Store } from '@/utilities/store';
import Head from 'next/head'
import Link from 'next/link'
import React, { useContext } from 'react'
import Footer from './Footer';
import Header from './Header';

function Layout({ children, title }) {

 
    return (
        <>
            <Head>
                <title>{title ? title + ' - Zehra' : 'Zehras collection'}</title>
                <meta name='description' content='E-commerce website'></meta>
            </Head>
            <div className='flex min-h-screen flex-col justify-between'>
                <Header></Header>

                <main className='container m-auto mt-4 px-4'>
                    {children}
                </main>

                <Footer></Footer>
            </div>
        </>
    )
}

export default Layout;