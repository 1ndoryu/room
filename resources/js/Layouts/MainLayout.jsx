import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Head } from '@inertiajs/react';
import { Avatar, AvatarImage, AvatarFallback } from '@/Components/ui/avatar';

function AuthNavbar({ user }) {
    return (
        <div className="flex items-center justify-end w-full gap-5">
            <Link href="/" className="text-sm text-gray-700 hover:text-gray-900">
                Home
            </Link>
            <Button as={Link} href="/posts/create" variant="default" size="sm">
                Post a Room
            </Button>
            <div className="flex items-center">
                <Avatar>
                    <AvatarImage src={user.avatar} alt={user.username} />
                    <AvatarFallback>{user.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
            </div>
        </div>
    );
}

function GuestNavbar() {
    return (
        <div className="flex items-center justify-end w-full gap-5">
            <Button as={Link} href="/login" variant="ghost">
                Log in
            </Button>
            <Button as={Link} href="/register" variant="default">
                Register
            </Button>
        </div>
    );
}


export default function MainLayout({ children }) {
    const { auth } = usePage().props;

    const containerClasses = auth.user
        ? "flex flex-col min-h-screen"
        : "flex flex-col min-h-screen";

    return (
        <>
            <Head>
                <link rel="stylesheet" href="/css/all.css" />
            </Head>
            <div className={containerClasses}>
                <nav className="bg-white border-b border-gray-200">
                    <div className="container flex items-center justify-between px-4 py-2 mx-auto">
                        <Link href="/" className="text-xl font-bold">
                            Room
                        </Link>

                        {auth.user ? <AuthNavbar user={auth.user} /> : <GuestNavbar />}
                    </div>
                </nav>

                <main className="container flex-grow px-4 py-8 mx-auto">
                    {children}
                </main>
            </div>
        </>
    );
}