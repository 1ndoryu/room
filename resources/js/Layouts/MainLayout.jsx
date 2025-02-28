// resources/js/Layouts/MainLayout.jsx

import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Head } from '@inertiajs/react';
import { Avatar, AvatarImage, AvatarFallback } from '@/Components/ui/avatar'; // Importa los componentes Avatar


export default function MainLayout({ children }) {
    const { auth } = usePage().props;

    return (
        <>
            <Head>
                <link rel="stylesheet" href="/css/all.css" />
            </Head>
            <div className="flex flex-col min-h-screen bg-gray-100">
                <nav className="bg-white border-b border-gray-200">
                    <div className="flex min-w-full px-5 py-[7px] mx-auto gap-5" id="navbar">
                        <Link href="/" className="text-xl font-bold leading-[30px]">
                            Room 
                        </Link>

                        <div className="flex items-center w-full">
                            {auth.user ? (
                                <>
                                    <Link href="/" className="text-sm text-gray-700 hover:text-gray-900">
                                        Home
                                    </Link>
                                    <div className="relative flex items-center gap-5 ml-auto">

                                        <Button as={Link} href="/posts/create" variant="default" size="sm">
                                            Publish Room
                                        </Button>

                                        <div className="flex items-center">
                                            <Avatar>
                                                <AvatarImage src={auth.user.avatar} alt={auth.user.username} />
                                                <AvatarFallback>{auth.user.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                                            </Avatar>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Button as={Link} href="/login" variant="ghost">
                                        Iniciar sesión
                                    </Button>

                                    <Button as={Link} href="/register" variant="default">
                                        Registrarse
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </nav >
                <main className="container flex-grow px-4 py-8 mx-auto">
                    {children}
                </main>
            </div >
        </>
    );
}
