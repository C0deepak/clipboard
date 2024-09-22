'use client'

import React, { useTransition } from 'react'
import { RegisterSchema } from '../../schemas'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import CardWrapper from './CardWrapper'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { register } from '../../actions/register'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'

const RegisterForm = () => {
    const [isPending, startTransition] = useTransition()
    const { toast } = useToast()
    const router = useRouter()

    const form = useForm({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: '',
            email: '',
            password: ''
        },
    })

    const registerHandler = (values) => {
        startTransition(() => {
            register(values)
                .then((data) => {
                    if (data?.error) {
                        toast({
                            title: "Error",
                            variant: "error",
                            description: data.error,
                        })
                    }
                    if (data?.success) {
                        toast({
                            title: "Success",
                            variant: "success",
                            description: data.success,
                        })
                        router.push('/auth/login')
                    }
                })
        })
    }

    return (
        <div className='flex items-center justify-center min-h-screen w-full'>
            <CardWrapper
                headerLabel="Create an account"
                headerDescription="Welcome to Clipboard! We're excited to have you join us."
                backButtonHref="/auth/login"
                backButtonLabel="Already have an account?"
            >
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(registerHandler)}
                        className='space-y-12'
                    >
                        <div className='space-y-4'>

                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder='Your name'
                                                type='text'
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='email'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder='Your email'
                                                type='email'
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='password'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder='Password must be strong'
                                                type='password'
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button
                            type='submit'
                            className='w-full'
                            disabled={isPending}
                        >
                            Register
                        </Button>
                    </form>
                </Form>
            </CardWrapper>
        </div >
    )
}

export default RegisterForm