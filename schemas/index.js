import * as z from 'zod'

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, {
        message: 'Password is required'
    })
})

export const RegisterSchema = z.object({
    name: z.string().min(1, {
        message: 'Name is required'
    }),
    email: z.string().email(),
    password: z.string().min(6, {
        message: 'Minimum 6 characters required'
    })
})

export const TaskSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(1, {
        message: 'Title is required',
    }),
    description: z.string().optional(),
    status: z.enum(["TODO", "PROGRESS", "COMPLETED"]),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
    due: z.date().optional()
});