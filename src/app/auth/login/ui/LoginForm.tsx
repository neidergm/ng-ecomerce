'use client'

import { authenticate } from '@/actions'
import clsx from 'clsx'
import Link from 'next/link'
import { useActionState, useEffect } from 'react'
import { IoWarningOutline } from 'react-icons/io5'

const LoginForm = () => {

    const [state, dispatch, isPending] = useActionState(authenticate, undefined);

    useEffect(() => {
        if (state === "success") {
            window.location.replace('/')
        }
    }, [state])

    return (
        <form action={dispatch} className="flex flex-col">

            <label htmlFor="email">Email</label>
            <input
                id="email"
                name="email"
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                type="email" />


            <label htmlFor="password">Password</label>
            <input
                id="password"
                name="password"
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                type="password" />

            {!isPending && state && state !== "success" &&
                <div className='flex gap-2 mb-4 items-center'>
                    <IoWarningOutline className="text-red-500" />
                    <span className="text-red-500">{state}</span>
                </div>}

            <button
                type='submit'
                className={
                    clsx("btn-primary", { "!bg-gray-500": isPending })
                }
                disabled={isPending}
            >
                Ingresar
            </button>

            {/* divisor l ine */}
            <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-500"></div>
                <div className="px-2 text-gray-800">O</div>
                <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link
                href="/auth/new-account"
                className="btn-secondary text-center">
                Crear una nueva cuenta
            </Link>

        </form>
    )
}

export default LoginForm
