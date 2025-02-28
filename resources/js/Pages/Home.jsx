// resources/js/Pages/Home.jsx
import React from 'react';
import MainLayout from '@/Layouts/MainLayout';

function Home(props) {
    return (
        <div className="container p-4 mx-auto">
            <h1 className="text-3xl font-bold text-gray-800">¡Hola, Mundo!</h1>
            <p className="mt-2 text-gray-600">Wandorius papus</p>
        </div>
    );
}

export default Home;