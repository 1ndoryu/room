// resources/js/Pages/Home.jsx
import React from 'react';
import { Head, usePage } from '@inertiajs/react';

function Home() {
    const { rooms, appUrl } = usePage().props;
    console.log('Props en Home.jsx:', { rooms, appUrl });

    return (
        <>
            <Head title="Home" />
            <div className="flex flex-col items-center justify-center min-h-[80vh]">
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

            {/* Sección de habitaciones */}
            <div className="mt-10">
                <h2 className="mb-4 text-2xl font-semibold">Featured Rooms</h2>
                <div className="grid grid-cols-1 card-wrapper gap-7 my-7 md:grid-cols-2 lg:gap-10 lg:my-10">
                    {rooms?.map(room => {
                        // --- Comprobaciones de seguridad ---
                        const hasUser = room.attributes?.user?.data;
                        const user = hasUser ? room.attributes.user.data : null;

                        const hasImages = room.attributes?.images?.data && Array.isArray(room.attributes.images.data) && room.attributes.images.data.length > 0;
                        const firstImageUrl = hasImages
                            ? `${appUrl}${room.attributes.images.data[0].attributes?.url}`
                            : null;

                        return (
                            <div key={room.id} className="relative transition duration-200 transform bg-white border border-gray-200 rounded-lg cursor-pointer ">
                                <div className="flex">
                                    <div className="relative w-[300px] bg-slate-100" style={{ borderRadius: '5px 0px 0px', overflow: 'hidden' }}>
                                        <div className="relative" style={{ paddingBottom: '100%' }}>
                                            {firstImageUrl && (
                                                <img
                                                    alt={room.attributes?.address || 'Room Image'} // <- Corrección aquí
                                                    src={firstImageUrl}
                                                    className="absolute inset-0 object-cover w-full h-full"
                                                />
                                            )}
                                        </div>
                                    </div>

                                    <div className="text-wrapper py-3 px-5 relative h-full flex flex-col justify-start items-start gap-0.5 w-full">
                                        <div className="flex items-center space-x-1">
                                            <p className="text-base truncate max-w-[170px] md:text-lg text-gray-600 font-medium">
                                                {hasUser ? (user.attributes.name || user.attributes.username || 'Unknown User') : 'Unknown User'}
                                            </p>
                                        </div>

                                        <div className="flex items-start gap-1 pb-4 -ml-1 text-xs text-gray-500 location lg:text-sm">
                                            <p className="w-40 p-[3px] text-xs truncate sm:w-80 md:w-40 lg:w-80">
                                                {room.attributes?.address || 'No address provided'} {/* <- Corrección aquí */}
                                            </p>
                                        </div>

                                        {/* ... (resto del código) ... */}

                                        <div className="flex">
                                            <div className="flex flex-col lg:flex-row items-start gap-1.5 lg:gap-0 text-xs lg:text-sm text-gray-600 font-medium lg:pb-2 w-full w-max">
                                                <p className="flex w-full gap-1 lg:w-auto lg:pr-6 xl:pr-10 lg:flex-col">
                                                    <span className="flex items-center space-x-1 text-sm font-medium lg:order-2 whitespace-nowrap">
                                                        <span>₹{room.attributes?.rent || '0'}</span>
                                                        <span className="text-xs font-light text-gray-500 lg:hidden">Rent</span>
                                                    </span>
                                                    <span className="hidden text-xs font-light text-gray-500 lg:block">Rent</span>
                                                </p>
                                            </div>
                                            <div className="flex flex-col lg:flex-row items-start gap-1.5 lg:gap-0 text-xs lg:text-sm text-gray-600 font-medium lg:pb-2 w-max">
                                                <p className="flex w-full gap-1 lg:w-auto lg:pr-6 xl:pr-10 lg:flex-col">
                                                    <span className="flex items-center space-x-1 text-sm font-medium lg:order-2 whitespace-nowrap">
                                                        <span>{room.attributes?.preferred_gender || 'Not specified'}</span>
                                                        <span className="text-xs font-light text-gray-500 lg:hidden">Preferred Gender</span>
                                                    </span>
                                                    <span className="hidden text-xs font-light text-gray-500 lg:block">Preferred Gender</span>
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-2 text-[13px] leaning-[13px] gray-700 text-s">
                                            <p>{room.attributes?.description || 'No description'}</p>
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