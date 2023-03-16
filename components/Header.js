import Link from 'next/link'
import React from 'react'

export default function Header() {
    return (
        <div>
            <header>
                <nav className='flex items-center h-12 justify-between shadow-md px-4'>
                    <Link href="/">
                        <h1 className='font-bold text-2xl'>Zehras collection</h1>
                    </Link>
                    <div className='flex'>
                        <Link href='/cart'><h2 className='mr-4'>Cart</h2></Link>
                        <Link href='/login'><h2>Login</h2></Link>
                    </div>
                </nav>
            </header>
        </div>
    )
}
