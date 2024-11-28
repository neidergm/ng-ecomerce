'use client'

import { SessionProvider, SessionProviderProps } from 'next-auth/react'
import React from 'react'

type Props = {
    children: React.ReactNode,
} & SessionProviderProps

export const UserSessionProvider = ({ children, ...props }: Props) => {
    return (
        <SessionProvider {...props}>{children}</SessionProvider>
    )
}
