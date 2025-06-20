import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useState, useEffect } from 'react';
import '../../../css/welcome.css';
import ImageUploader from '../../Components/ImageUploader'; 

export default function MemoriaForm({memorial, memoria}) {
    const isEditing = !!memoria; // Verifica se está em modo de edição

    const { data, setData, post, put, processing, errors, reset } = useForm({
        nm_memoria: memoria?.nm_memoria || '',
        ds_memoria: memoria?.ds_memoria || '',
        dt_memoria: memoria?.dt_memoria || '',
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
            put(route('memoria.update', memorial.cd_memoria), {
                onSuccess: () => {
                    reset();
                    setPreviews([]);
                },
            });
        } else {
            post(route('memoria.store', memorial.cd_memorial), {
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
                    Criar Memoria
                </h2>
            }
        >
            <Head title="Adicionar Memória" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold mb-4">
                                <i className="fas fa-plus-circle mr-2"></i> Criar Memoria
                            </h3>
                            <form onSubmit={submit}>
                                <input type="hidden" id="memoriaId" />

                                <div>
                                    <InputLabel htmlFor="nm_memoria" value="Nome da Memoria*" />
                                    <TextInput
                                        id="nm_memoria"
                                        name="nm_memoria"
                                        value={data.nm_memoria}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('nm_memoria', e.target.value)}
                                        required
                                        placeholder="Digite um título para sua memória"
                                    />
                                    <InputError message={errors.nm_memoria} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="dt_memoria" value="Data da Memoria*" />
                                    <TextInput
                                        id="dt_memoria"
                                        type="date"
                                        name="dt_memoria"
                                        value={data.dt_memoria}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('dt_memoria', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.dt_memoria} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="ds_memoria" value="Descrição *" />
                                    <textarea
                                        id="ds_memoria"
                                        name="ds_memoria"
                                        value={data.ds_memoria}
                                        className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        rows="6"
                                        onChange={(e) => setData('ds_memoria', e.target.value)}
                                        required
                                        placeholder="Conte sobre esta memória especial..."
                                    ></textarea>
                                    <InputError message={errors.ds_memoria} className="mt-2" />
                                </div>

                                {/* ImageUploader integrado */}
                                <div className="mt-4">
                                    <ImageUploader
                                        title="Fotos do Memoria"
                                        multiple={true}
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
                                        <i className="fas fa-save mr-1"></i> Salvar Memória
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