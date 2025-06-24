import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useState, useEffect } from 'react';
import ImageUploader from '../Components/ImageUploader'; 

export default function MemorialForm({memorial, familia}) {
    const isEditing = !!memorial; // Verifica se está em modo de edição

    const { data, setData, post, put, processing, errors, reset } = useForm({
        nm_falecido: memorial?.nm_falecido || '',
        date_nascimento: memorial?.dt_nascimento || '',
        date_falecimento: memorial?.dt_falecimento || '',
        description: memorial?.ds_historia || '',
        cd_familia: memorial?.cd_familia || '',
        images: [], 
    });

    const [previews, setPreviews] = useState([]); 

    // Sincroniza as imagens do ImageUploader com o estado do useForm
    const handleImageChange = (newPreviews) => {
        setPreviews(newPreviews); 
        setData('images', newPreviews); 
    };

    const submit = (e) => {
        e.preventDefault();
        if (isEditing) {
            put(route('memorial.update', memorial.cd_memorial), {
                onSuccess: () => {
                    reset();
                    setPreviews([]);
                },
            });
        } else {
            post(route('memorial.store'), {
                onSuccess: () => {
                    reset();
                    setPreviews([]);
                },
            });
        }
    };

    return (
        <AuthenticatedLayout
        >
            <Head title="Adicionar Memória" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold mb-4">
                                <i className="fas fa-plus-circle mr-2"></i> Criar Memorial
                            </h3>
                            <form onSubmit={submit}>
                                <input type="hidden" id="memorialId" />

                                <div>
                                    <InputLabel htmlFor="nm_falecido" value="Nome do Falecido *" />
                                    <TextInput
                                        id="nm_falecido"
                                        name="nm_falecido"
                                        value={data.nm_falecido}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('nm_falecido', e.target.value)}
                                        required
                                        placeholder="Digite um título para sua memória"
                                    />
                                    <InputError message={errors.nm_falecido} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="date_nascimento" value="Data de Nascimento *" />
                                    <TextInput
                                        id="date_nascimento"
                                        type="date"
                                        name="date_nascimento"
                                        value={data.date_nascimento}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('date_nascimento', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.date_nascimento} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="date_falecimento" value="Data de Falecimento *" />
                                    <TextInput
                                        id="date_falecimento"
                                        type="date"
                                        name="date_falecimento"
                                        value={data.date_falecimento}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('date_falecimento', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.date_falecimento} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="cd_familia" value="Selecione a Família *" />
                                    <select
                                        id="cd_familia"
                                        name="cd_familia"
                                        value={data.cd_familia}
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        onChange={(e) => setData('cd_familia', e.target.value)}
                                        required
                                    >
                                        <option value="" disabled>
                                            Selecione a Família
                                        </option>
                                        {familia.map((value, index) => (
                                            <option key={value.cd_familia} value={value.cd_familia || value.nm_familia}>
                                                {value.nm_familia}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError message={errors.cd_familia} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="description" value="Descrição *" />
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={data.description}
                                        className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        rows="6"
                                        onChange={(e) => setData('description', e.target.value)}
                                        required
                                        placeholder="Conte sobre esta memória especial..."
                                    ></textarea>
                                    <InputError message={errors.description} className="mt-2" />
                                </div>

                                {/* ImageUploader integrado */}
                                <div className="mt-4">
                                    <ImageUploader
                                        title="Foto do Memorial"
                                        onImagesChange={handleImageChange} // Passa a função para atualizar imagens
                                        previews={previews} // Passa os previews para o componente
                                    />
                                    <InputError message={errors.images} className="mt-2" />
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
                                        <i className="fas fa-save mr-1"></i> Salvar Memorial
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