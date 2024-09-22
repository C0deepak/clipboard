'use server'

import bcrypt from 'bcryptjs'
import { db } from '../lib/db'
import { RegisterSchema } from "../schemas"

export const register = async (values) => {
    const validatedFields = RegisterSchema.safeParse(values)
    if (!validatedFields.success) {
        return { error: 'Invalid fields!' }
    }

    const { name, email, password } = validatedFields.data
    const existingUser = await db.user.findUnique({
        where: {
            email
        }
    })
    if (existingUser) {
        return { error: 'Email already exists!' }
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })

    return { success: 'User created successfully!' }
}