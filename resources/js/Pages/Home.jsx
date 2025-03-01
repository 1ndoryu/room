// resources/js/Pages/Home.jsx
import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';

function Home() {
    const { rooms, appUrl, auth } = usePage().props;

    return (
        <>
            <Head title="Home" />

            {/* Sección de inicio - False auth */}
            {!auth.user ? (
                <div className="flex flex-col items-center justify-center min-h-[70vh]">
                    <div className="text-center">
                        <div className="inline-block px-4 py-2 mb-4 text-blue-600 bg-blue-100 rounded-lg">
                            Find Your Next Roommate!
                        </div>
                        <h1 className="text-6xl font-bold leading-tight text-[--black]">
                            The Perfect Roommate.
                            <br />
                            No Hassle.
                        </h1>
                        <p className="mt-4 text-[--grey]">
                            Discover amazing rooms and roommates.
                            <br />
                            Your new home awaits!
                        </p>
                    </div>
                    <div className="w-full max-w-md mt-8">
                        <form className="flex items-center">
                            <input
                                type="text"
                                placeholder="Search for places..."
                                className="w-full px-4 py-3 bg-white rounded-[200px] focus:outline-none focus:ring-2 focus:ring-gray-600"
                            />
                        </form>
                    </div>
                </div>
            ) : null}

            {/* Sección para usuarios autenticados */}
            {auth.user && (
                <div className="flex flex-col items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <h1 className="text-6xl font-bold leading-tight text-[--black]">
                            Welcome Back! {/* Puedes personalizar el mensaje */}
                        </h1>
                        <p className="mt-3 text-[--grey]">
                            Find your perfect roommate or list your room.
                        </p>
                    </div>
                    <div className="w-full max-w-md mt-8">
                        {/* Botones */}
                        <div className="flex justify-center space-x-4">
                            <Button asChild variant="secondary" size="lg">
                                <a href="/rooms/create" >Post Room</a>
                            </Button>
                            <Button asChild variant="secondary" size="lg">
                                <a href="" >Post My Profile</a>
                            </Button>
                        </div>
                    </div>
                </div>
            )}



            {/* Sección de habitaciones */}
            <div className="mt-10">
                <h2 className="mb-4 text-2xl font-semibold">Featured Rooms</h2>
                <div className="grid grid-cols-1 card-wrapper gap-7 my-7 md:grid-cols-2 lg:gap-10 lg:my-10">
                    {rooms?.map(room => {
                        const user = room.user;
                        const firstImageUrl = room.images?.[0]?.url ? `${appUrl}${room.images[0].url}` : null;

                        return (
                            <div key={room.id} className="relative transition duration-200 transform bg-white border border-gray-200 rounded-lg cursor-pointer ">
                                <div className="flex">
                                    <div className="relative w-[300px] bg-slate-100" style={{ borderRadius: '5px 0px 0px', overflow: 'hidden' }}>
                                        <div className="relative" style={{ paddingBottom: '100%' }}>
                                            {firstImageUrl && (
                                                <img
                                                    alt={room.address || 'Room Image'}
                                                    src={firstImageUrl}
                                                    className="absolute inset-0 object-cover w-full h-full"
                                                />
                                            )}
                                        </div>
                                    </div>

                                    <div className="text-wrapper py-3 px-5 relative h-full flex flex-col justify-start items-start gap-0.5 w-full">
                                        <div className="flex items-center space-x-1">
                                            <p className="text-base truncate max-w-[170px] md:text-lg text-gray-600 font-medium">
                                                {user ? (user.name || user.username || 'Unknown User') : 'Unknown User'}
                                            </p>
                                        </div>

                                        <div className="flex items-start gap-1 pb-4 -ml-1 text-xs text-gray-500 location lg:text-sm">
                                            <p className="w-40 p-[3px] text-xs truncate sm:w-80 md:w-40 lg:w-80">
                                                {room.address || 'No address provided'}
                                            </p>
                                        </div>

                                        <div className="flex">
                                            <div className="flex flex-col lg:flex-row items-start gap-1.5 lg:gap-0 text-xs lg:text-sm text-gray-600 font-medium lg:pb-2 w-full w-max">
                                                <p className="flex w-full gap-1 lg:w-auto lg:pr-6 xl:pr-10 lg:flex-col">
                                                    <span className="flex items-center space-x-1 text-sm font-medium lg:order-2 whitespace-nowrap">
                                                        <span>₹{room.rent || '0'}</span>
                                                        <span className="text-xs font-light text-gray-500 lg:hidden">Rent</span>
                                                    </span>
                                                    <span className="hidden text-xs font-light text-gray-500 lg:block">Rent</span>
                                                </p>
                                            </div>
                                            <div className="flex flex-col lg:flex-row items-start gap-1.5 lg:gap-0 text-xs lg:text-sm text-gray-600 font-medium lg:pb-2 w-max">
                                                <p className="flex w-full gap-1 lg:w-auto lg:pr-6 xl:pr-10 lg:flex-col">
                                                    <span className="flex items-center space-x-1 text-sm font-medium lg:order-2 whitespace-nowrap">
                                                        <span>{room.preferred_gender || 'Not specified'}</span>
                                                        <span className="text-xs font-light text-gray-500 lg:hidden">Preferred Gender</span>
                                                    </span>
                                                    <span className="hidden text-xs font-light text-gray-500 lg:block">Preferred Gender</span>
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-2 text-[13px] leaning-[13px] gray-700 text-s">
                                            <p>{room.description || 'No description'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default Home;