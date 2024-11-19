'use client'

import { useUIStore } from '@/store'
import clsx from 'clsx'
import Link from 'next/link'
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from 'react-icons/io5'

export function SideBar() {

  const isSideMenuOpen = useUIStore(s => s.isSideMenuOpen)
  const closeSideMenu = useUIStore(s => s.closeSideMenu)

  return (
    <div>
      {isSideMenuOpen && <>
        {/* Overlay */}
        < div className='fixed top-0 left-0 h-screen w-screen z-10 bg-black opacity-30'></div>
        {/* Blur */}
        <div className='fixed top-0 left-0 h-screen w-screen z-10 fade-in backdrop-filter backdrop-blur-sm' 
        onClick={closeSideMenu}
        ></div>
      </>}

      {/* Sidebar */}
      <nav
        className={clsx(
          'fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300',
          { 'translate-x-full': !isSideMenuOpen }
        )}
      >

        <IoCloseOutline className='absolute top-5 right-5 text-2xl cursor-pointer' onClick={closeSideMenu} />

        <div className='relative mt-14'>
          <IoSearchOutline className='absolute top-3 left-3 text-xl text-slate-400' />
          <input type='text' placeholder='Search' className='w-full h-10 pl-10 pr-5 border border-slate-400 rounded-md' />
        </div>

        <div className='mt-5 mb-5'>
          <ul>
            <li className='p-3 hover:bg-gray-200 rounded-md transition-all'>
              <Link href="/profile">
                <IoPersonOutline className='inline-block mr-2' />
                Profile
              </Link>
            </li>
            <li className='p-3 hover:bg-gray-200 rounded-md transition-all'>
              <Link href="/orders">
                <IoTicketOutline className='inline-block mr-2' />
                Orders
              </Link>
            </li>
            <li className='p-3 hover:bg-gray-200 rounded-md transition-all'>
              <Link href="/profile">
                <IoLogInOutline className='inline-block mr-2' />
                Login
              </Link>
            </li>
            <li className='p-3 hover:bg-gray-200 rounded-md transition-all'>
              <Link href="/profile">
                <IoLogOutOutline className='inline-block mr-2' />
                Logout
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <hr />
        </div>

        <div className='mt-5 mb-5'>
          <ul>
            <li className='p-3 hover:bg-gray-200 rounded-md transition-all'>
              <Link href="/products">
                <IoShirtOutline className='inline-block mr-2' />
                Productos
              </Link>
            </li>
            <li className='p-3 hover:bg-gray-200 rounded-md transition-all'>
              <Link href="/orders">
                <IoTicketOutline className='inline-block mr-2' />
                Orders
              </Link>
            </li>
            <li className='p-3 hover:bg-gray-200 rounded-md transition-all'>
              <Link href="/profile">
                <IoPeopleOutline className='inline-block mr-2' />
                Users
              </Link>
            </li>
          </ul>
        </div>


      </nav>
    </div >
  )
}