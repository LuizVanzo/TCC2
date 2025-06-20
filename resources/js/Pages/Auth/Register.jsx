import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import CPFInput from '@/Components/CPFInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register({ className = '', ...props }) {
    const { data, setData, post, processing, errors, reset, setError } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        cpf: '',
    });

    const handleCPFChange = ({ value, rawValue, isValid, error }) => {
        setData('cpf', value);
        setError('cpf', isValid ? '' : error);
    };

    const submit = (e) => {
        e.preventDefault();

        const rawCPF = data.cpf.replace(/[^\d]/g, '');
        if (rawCPF.length !== 11) {
            setError('cpf', 'O CPF deve ter 11 dígitos.');
            return;
        }

        post(route('register'), {
            data: { ...data, cpf: rawCPF },
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Registar-se" />

            <section className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="container mx-auto max-w-4xl shadow-lg rounded-lg overflow-hidden bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {/* Left Image Section */}
                        <div className="hidden md:block bg-cover bg-center">
                            <img
                                src="/storage/logo.png"
                                alt="Logo"
                                className="w-full h-full object-cover"
                                style={{ minHeight: '100%' }}
                            />
                        </div>

                        {/* Right Form Section */}
                        <div className="p-8 flex flex-col justify-center">
                            <form onSubmit={submit} className={className} {...props}>
                                <div>
                                    <InputLabel htmlFor="name" value="Nome" />
                                    <TextInput
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        autoComplete="name"
                                        placeholder="Nome"
                                        isFocused={true}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <CPFInput
                                    value={data.cpf}
                                    onChange={handleCPFChange}
                                    error={errors.cpf}
                                    className="mt-4"
                                />

                                <div className="mt-4">
                                    <InputLabel htmlFor="email" value="Email" />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        autoComplete="username"
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.email} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="password" value="Senha" />
                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        placeholder="Senha"
                                        value={data.password}
                                        className="mt-1 block w-full"
                                        autoComplete="new-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.password} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="password_confirmation" value="Confirmar Senha" />
                                    <TextInput
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        placeholder="Confirmar Senha"
                                        value={data.password_confirmation}
                                        className="mt-1 block w-full"
                                        autoComplete="new-password"
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.password_confirmation} className="mt-2" />
                                </div>

                                <div className="mt-6 flex items-center justify-end">
                                    <Link
                                        href={route('login')}
                                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Já tem uma conta?
                                    </Link>
                                    <PrimaryButton className="ms-4" disabled={processing}>
                                        Registrar-se
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}