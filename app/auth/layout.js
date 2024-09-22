import { ClipboardList } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const AuthLayout = ({ children }) => {
    return (
        <div className='relative py-8 px-4 md:py-0 md:px-16 bg-cover bg-center bg-[url("https://images.unsplash.com/photo-1498335886522-0fd80bb1d263?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")]'>
            <Link href='/' className='absolute top-4 left-4 md:top-16 md:left-16'>
                <ClipboardList size={36} />
            </Link>
            {children}
        </div>
    )
}

export default AuthLayout