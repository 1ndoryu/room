// resources/js/Pages/Auth/Login.jsx
import React from 'react';
import { useForm } from '@inertiajs/react';
import { LoginForm } from '@/Components/login-form';

export default function Login() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route('login.store'), {
            onSuccess: () => reset('password'),
        });
    }


    return (
        <LoginForm errors={errors} processing={processing} setData={setData} data={data} submit={handleSubmit} />
    );
}