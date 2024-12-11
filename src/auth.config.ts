import NextAuth, { NextAuthConfig } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { z } from 'zod'
import bcryptjs from 'bcryptjs'
import prisma from "./lib/prisma"

// const protectedRoutes = [
//     '/checkout',
//     '/dashboard',
//     '/profile',
//     '/settings',
// ]

export const authConfig: NextAuthConfig = {
    pages: {
        signIn: '/auth/login',
        newUser: '/auth/new-account',
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {

                const parsedCredentials = z.object({
                    email: z.string().email(),
                    password: z.string().min(6),
                }).safeParse(credentials)

                if (!parsedCredentials.success) return null

                const { email, password } = parsedCredentials.data

                const user = await prisma.user.findUnique({ where: { email: email.toLocaleLowerCase() } })

                if (!user) return null
                if (!bcryptjs.compareSync(password, user.password)) return null

                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { password: _, ...rest } = user

                // console.log(rest)

                return rest
            },
        })
    ],
    callbacks: {

        authorized({ auth, request: { nextUrl } }) {
            // console.log("START ==========")
            // console.log({ auth})
            // console.log("END ==========")
            
            const isLoggedIn = !!auth?.user;

            if(nextUrl.pathname.startsWith('/profile')){
                if (isLoggedIn) return true;
                return false; 
            }

            // const isLoggedIn = !!auth?.user;
            // const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            // if (isOnDashboard) {
            //     if (isLoggedIn) return true;
            //     return false; // Redirect unauthenticated users to login page
            // } else if (isLoggedIn) {
            //     return Response.redirect(new URL('/dashboard', nextUrl));
            // }
            return true;
        },

        async jwt({ token, user }) {
            if (user) token.data = user
            return token
        },

        async session({ session, token}) {
            session.user = token.data as typeof session.user;
            // console.log({ user, session, token, trigger })

            return session
        },

    }
}

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig)