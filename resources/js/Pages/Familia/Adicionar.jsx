import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useState, useEffect } from 'react';
import '../../../css/welcome.css';

export default function FamiliaForm({familia}) {
    const isEditing = !!familia; // Verifica se está em modo de edição

    const { data, setData, post, put, processing, errors, reset } = useForm({
        nm_familia: familia?.nm_familia || '',
        ds_familia: familia?.ds_familia || '',
    });

    const [previews, setPreviews] = useState([]); 


    const submit = (e) => {
        e.preventDefault();

         if (isEditing) {
            put(route('familia.update', familia.cd_familia), {
                onSuccess: () => {
                    reset();
                    setPreviews([]);
                },
            });
        } else {
            post(route('familia.store'), {
                onSuccess: () => {
                    reset();
                    setPreviews([]);
                },
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Criar Família
                </h2>
            }
        >
            <Head title="Criar Família" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold mb-4">
                                <i className="fas fa-plus-circle mr-2"></i> Criar Família
                            </h3>
                            <form onSubmit={submit}>
                                <input type="hidden" id="familiaId" />

                                <div>
                                    <InputLabel htmlFor="nm_familia" value="Nome da família*" />
                                    <TextInput
                                        id="nm_familia"
                                        name="nm_familia"
                                        value={data.nm_familia}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('nm_familia', e.target.value)}
                                        required
                                        placeholder="Digite o nome da família"
                                    />
                                    <InputError message={errors.nm_familia} className="mt-2" />
                                </div>


                                <div className="mt-4">
                                    <InputLabel htmlFor="ds_familia" value="Breve texto da família" />
                                    <textarea
                                        id="ds_familia"
                                        name="ds_familia"
                                        value={data.ds_familia}
                                        className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        rows="6"
                                        onChange={(e) => setData('ds_familia', e.target.value)}
                                        placeholder="Conte sobre esta família..."
                                    ></textarea>
                                    <InputError message={errors.ds_familia} className="mt-2" />
                                </div>

                                <div className="flex justify-end gap-2 mt-6">
                                    <Link
                                        href="/dashboard"
                                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                                        as="button"
                                    >
                                        <i className="fas fa-times mr-1"></i> Cancelar
                                    </Link>
                                    <PrimaryButton
                                        type="submit"
                                        className="ms-4"
                                        disabled={processing}
                                    >
                                        <i className="fas fa-save mr-1"></i> Salvar Família
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}