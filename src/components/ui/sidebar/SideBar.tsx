'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
// import { logout } from '@/actions'
import { useUIStore } from '@/store'
import clsx from 'clsx'
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline
} from 'react-icons/io5'
// import { logout } from '@/actions'

export function SideBar() {

  const session = useSession()
  const { data } = session
  const isAuthenticated = !!data?.user;

  console.log(session)

  const isAdmin = data?.user?.role === 'admin'

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
            {isAuthenticated && <>
              <li className='p-3 hover:bg-gray-200 rounded-md transition-all'>
                <Link href="/profile" onClick={closeSideMenu}>
                  <IoPersonOutline className='inline-block mr-2' />
                  Profile
                </Link>
              </li>
              <li className='p-3 hover:bg-gray-200 rounded-md transition-all'>
                <Link href="/orders" onClick={closeSideMenu}>
                  <IoTicketOutline className='inline-block mr-2' />
                  My Orders
                </Link>
              </li>
              <li className='p-3 hover:bg-gray-200 rounded-md transition-all'>
                <button onClick={() => {
                  // logout()
                  signOut()
                  closeSideMenu()
                }}>
                  <IoLogOutOutline className='inline-block mr-2' />
                  Logout
                </button>
              </li>
            </>
            }
            {!isAuthenticated && <li className='p-3 hover:bg-gray-200 rounded-md transition-all'>
              <Link href="/auth/login" onClick={closeSideMenu}>
                <IoLogInOutline className='inline-block mr-2' />
                Login
              </Link>
            </li>}
          </ul>
        </div>

        {
          isAdmin && (<>
            <div>
              <hr />
            </div>
            <div className='mt-5 mb-5'>
              <ul>
                <li className='p-3 hover:bg-gray-200 rounded-md transition-all'>
                  <Link href="/admin/products" onClick={closeSideMenu}>
                    <IoShirtOutline className='inline-block mr-2' />
                    Products
                  </Link>
                </li>
                <li className='p-3 hover:bg-gray-200 rounded-md transition-all'>
                  <Link href="/admin/orders" onClick={closeSideMenu}>
                    <IoTicketOutline className='inline-block mr-2' />
                    All Orders
                  </Link>
                </li>
                <li className='p-3 hover:bg-gray-200 rounded-md transition-all'>
                  <Link href="/admin/users" onClick={closeSideMenu}>
                    <IoPeopleOutline className='inline-block mr-2' />
                    Users
                  </Link>
                </li>
              </ul>
            </div>
          </>)
        }



      </nav>
    </div >
  )
}
