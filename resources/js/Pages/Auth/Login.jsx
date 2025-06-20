import GuestLayout from '@/Layouts/GuestLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import Checkbox from '@/Components/Checkbox';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Login" />

            {/* Login Section */}
            <section className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="container mx-auto max-w-4xl shadow-lg rounded-lg overflow-hidden bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-2">

                        {/* Left Image Section */}
                        <div className="hidden md:block bg-cover bg-center">
                            <img src="/storage/logo.png" alt="sla" />
                            {/* Aqui você pode colocar uma imagem de fundo  style={{ backgroundImage: "url('https://source.unsplash.com/800x1200/?technology,office,login')" }}*/ }
                        </div>

                        {/* Right Form Section */}
                        <div className="p-8">
                            <h2 className="text-2xl font-bold mb-6 text-center">Logar na conta</h2>

                            {status && (
                                <div className="mb-4 text-sm font-medium text-green-600">
                                    {status}
                                </div>
                            )}

                            <form onSubmit={submit}>
                                {/* Email */}
                                <div className="mb-4">
                                    <InputLabel htmlFor="email" value="Email" />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        autoComplete="username"
                                        isFocused={true}
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                    <InputError message={errors.email} className="mt-2" />
                                </div>

                                {/* Password */}
                                <div className="mb-4">
                                    <InputLabel htmlFor="password" value="Senha" />
                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full"
                                        autoComplete="current-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                    />
                                    <InputError message={errors.password} className="mt-2" />
                                </div>

                                {/* Remember Me */}
                                <div className="mb-4 flex items-center">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                    />
                                    <span className="ms-2 text-sm text-gray-600">Lembre-se de mim</span>
                                </div>

                                {/* Submit Button */}
                                <div className="flex items-center justify-between">
                                    {canResetPassword && (
                                        <Link
                                            href={route('password.request')}
                                            className="text-sm text-blue-600 hover:underline"
                                        >
                                            Esqueceu sua senha?
                                        </Link>
                                    )}

                                    <PrimaryButton className="ms-4" disabled={processing}>
                                        Login
                                    </PrimaryButton>
                                </div>
                            </form>

                            {/* Footer Links */}
                            <div className="mt-6 text-center text-sm text-gray-600">
                                <p>Não tem uma conta? <a href="/register" className="text-blue-600 hover:underline">Registre-se</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
