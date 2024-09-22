'use client'

import React, { useTransition } from 'react'
import CardWrapper from './CardWrapper'
import { Button } from '../ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { LoginSchema } from '@/schemas'
import { useToast } from '@/hooks/use-toast'
import { login } from '@/actions/login'
import { useAuth } from '@/context/AuthProvider'

const LoginForm = () => {
    const [isPending, startTransition] = useTransition()
    const { toast } = useToast()
    const { loggedIn } = useAuth()

    const form = useForm({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: ''
        },
    })

    const loginHandler = (values) => {
        startTransition(() => {
            login(values)
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
                        loggedIn()
                        if (window.location.pathname !== '/profile') {
                            window.location.href = '/';
                        } else {
                            window.location.reload();
                        }
                    }
                })
        })
    }

    return (
        <div className='flex items-center justify-center min-h-screen w-full'>
            <CardWrapper
                headerLabel="Welcome Back!"
                headerDescription="Please enter your login credential to access your account. "
                backButtonHref="/auth/register"
                backButtonLabel="Don't have an account?"
            >
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(loginHandler)}
                        className='space-y-12'
                    >
                        <div className='space-y-4'>
                            <FormField
                                control={form.control}
                                name='email'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder='Your mail'
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
                                                placeholder='Enter your password here'
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
                            Login
                        </Button>
                    </form>
                </Form>
            </CardWrapper>
        </div>
    )
}

export default LoginForm