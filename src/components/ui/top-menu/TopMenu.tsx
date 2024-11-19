'use client'

import { titleFont } from '@/config/fonts'
import { useUIStore } from '@/store'
import Link from 'next/link'
import React from 'react'
import { IoCartOutline, IoSearchOutline } from 'react-icons/io5'

const shopName = "Teslo"

export function TopMenu() {
    
    const openSideMenu = useUIStore(s => s.openSideMenu)

    return (
        <div className='flex justify-between'>

            <div>
                <Link href='/'>
                    <span className={`${titleFont.className} font-bold`}>{shopName}</span>
                    <span> | shop</span>
                </Link>
            </div>

            {/* Center menu  */}
            <div className='hidden sm:block'>
                <Link
                    className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'
                    href='/category/men'
                >Men</Link>
                <Link
                    className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'
                    href='/category/women'
                >Women</Link>
                <Link
                    className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'
                    href='/category/kids'
                >Kids</Link>
            </div>

            <div className='flex items-center gap-1'>
                <Link href="/search">
                    <IoSearchOutline className='h-5 w-5' />
                </Link>
                <Link href="/cart">
                    <div className='relative'>
                        <span
                            className='absolute text-xs px-1 font-bold bg-red-700 rounded-full -top-2 -right-2 text-white'
                        >
                            3
                        </span>
                        <IoCartOutline className='w-5 h-5' />
                    </div>
                </Link>

                <button className='m-2 p-2 rounded-md transition-all hover:bg-gray-100' onClick={openSideMenu}>Menu</button>
            </div>

        </div>
    )
}
