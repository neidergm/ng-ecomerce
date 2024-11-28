'use server'

import { signOut } from "@/auth.config"

export async function logout() {

    return signOut()
}