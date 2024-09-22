'use client'
import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import Link from 'next/link';
import { buttonVariants } from '../ui/button';

const CardWrapper = (
    { children, headerLabel, headerDescription, backButtonLabel, backButtonHref }) => {
    return (
        <Card className='w-full md:w-96'>
            <CardHeader>
                <CardTitle>{headerLabel}</CardTitle>
                <CardDescription>{headerDescription}</CardDescription>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            <CardFooter>
                <Link href={backButtonHref} className={`${buttonVariants({ variant: "link", size: 'sm' })} flex items-center`}>{backButtonLabel}</Link>
            </CardFooter>
        </Card>
    )
}

export default CardWrapper