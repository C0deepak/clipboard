'use server'

import { getUserByEmail, signIn } from "../auth"
import { LoginSchema } from "../schemas"
import { AuthError } from "next-auth"

export const login = async (values) => {
    const validatedFields = LoginSchema.safeParse(values)
    if (!validatedFields.success) {
        return { error: 'Invalid fields!' }
    }

    const { email, password } = validatedFields.data
    const existingUser = await getUserByEmail(email)
    if (!existingUser || !existingUser.email) {
        return { error: 'Email does not exist!' }
    }

    try {
        const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
        })

        if (result?.error) {
            return { error: result.error }
        }
        return { success: 'Logged in successfully!' }
    } catch (error) {
        console.log(error)
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CallbackRouteError":
                    return { error: 'Invalid credentials!' }
                default:
                    return { error: 'Something went wrong!' }
            }
        }

        throw error
    }
}