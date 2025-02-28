// resources/js/Pages/Auth/Register.jsx
import React from 'react';
import { useForm } from '@inertiajs/react';
import { RegisterForm } from '@/Components/RegisterForm'; // Asegúrate de la ruta

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
        email: '',
        password: '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post('/register', {
            onSuccess: () => reset('password'), //Limpia la contraseña despues del registro
        });
    }

    return (
        <RegisterForm errors={errors} processing={processing} setData={setData} data={data} submit={handleSubmit} />
    );
}