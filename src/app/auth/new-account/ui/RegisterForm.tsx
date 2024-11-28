import { login, registerUser } from '@/actions';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type FormInputs = {
    name: string;
    email: string;
    password: string;
}

export const RegisterForm = () => {

    const [error, setError] = useState<string>();
    const { register, handleSubmit } = useForm<FormInputs>();

    const onSubmit = async (data: FormInputs) => {
        console.log(data);
        
        if(error) setError(undefined);

        const resp = await registerUser(data);

        console.log(resp)
        if (!resp.ok) {
            return setError(resp.message);
        }

        await login(data.email, data.password);

        window.location.replace("/");
    }

    return (
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>

            <label htmlFor="name">Nombre completo</label>
            <input
                autoFocus
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                type="text"
                {...(register('name', { required: true }))}
            />


            <label htmlFor="email">Correo electrónico</label>
            <input
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                type="email"
                {...(register('email', { required: true, pattern: /^\S+@\S+$/i }))}
            />

            <label htmlFor="password">Contraseña</label>
            <input
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                type="password"
                {...(register('password', { required: true, minLength: 6 }))}
            />

            <div>
                {error && <p className="text-red-500">{error}</p>}
            </div>

            <button
                type='submit'
                className="btn-primary">
                Crear cuenta
            </button>


            {/* divisor l ine */}
            <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-500"></div>
                <div className="px-2 text-gray-800">O</div>
                <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link
                href="/auth/login"
                className="btn-secondary text-center">
                Ingresar
            </Link>

        </form >
    )
}
