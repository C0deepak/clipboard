'use client'

import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { logout } from '../../actions/logout'
import { useAuth } from '@/context/AuthProvider'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { ClipboardList, LogIn, User } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

const Navbar = () => {
    const { isAuthenticated, loggedOut } = useAuth()
    const { toast } = useToast()

    const signout = () => {
        toast({
            title: "Success",
            variant: "success",
            description: 'Logout successfully!',
        })
        logout()
        loggedOut()
    }

    return (
        <div className='fixed top-0 left-0 w-full h-16 flex items-center justify-between bg-background px-4 md:px-16 z-50 border-b'>
            <Link href='/'><ClipboardList size={24} /></Link>
            <div className="flex gap-8">
                {isAuthenticated ? (
                    <DropdownMenu className='w-80'>
                        <DropdownMenuTrigger className='outline-none'>
                            <Button className='rounded-full' size='icon'><User size={18} /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <Link href='/tasks'><DropdownMenuItem>Manage Tasks</DropdownMenuItem></Link>
                            <DropdownMenuItem onClick={signout}>Sign Out</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <Link href='/auth/login'><Button>Sign In <LogIn className="ml-2 h-4 w-4" /></Button></Link>
                )}
            </div>
        </div>
    )
}

export default Navbar