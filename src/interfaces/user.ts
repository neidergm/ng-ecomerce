export interface User {
    id: string
    name: string
    email: string
    emailVerified?: boolean | null
    password: string
    role: string
    image?: string | null
    createdAt: Date
    updatedAt: Date
}