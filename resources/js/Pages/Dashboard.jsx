import React from 'react';
import { usePage } from '@inertiajs/react';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Dashboard" />

            <div className="container mx-auto py-8">
                <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Bienvenido, {auth.user.username}</h2>
                    <p className="mb-2">Email: {auth.user.email}</p>
                    <p className="mb-2">ID: {auth.user.id}</p>

                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-2">Tu cuenta</h3>
                        <p>Aquí puedes ver y gestionar tu información personal</p>
                    </div>
                </div>
            </div>
        </>
    );
}