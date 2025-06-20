import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import '../../css/perfil.css';


export default function Dashboard() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Nome Falecido
                </h2>
            }
            dataNasc={"Data Nascimento."}
            dataMorte={"Data Morte."}
        >
            <Head title="Dashboard" />

            {/* Hero Section */}
            <section className="relative bg-gray-100 py-16">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-300 to-white opacity-50"></div>
                <div className="relative container mx-auto px-4 text-center">
                    <div className="mb-6">
                        <img
                            src="/caminho/para/imagem.jpg"  
                            className="mx-auto w-40 h-40 rounded-full object-cover border-4 border-white shadow-md bg-gray-300"
                        />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Nome do Falecido</h1>
                    <div className="mt-4 text-gray-500">
                        <span>00/00/1900</span> - <span>00/00/2000</span>
                    </div>
                    <p className="text-lg text-gray-600">Descrição ou homenagem curta</p>
                </div>
            </section>

            {/* Navigation (fake section as nav) */}
            <div className="bg-white shadow sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between">
                    <div className="font-semibold text-blue-600">Memorial Digital</div>
                    <nav className="space-x-4 text-gray-600">
                        <a href="#memorias" className="hover:underline">Memórias</a>
                        <a href="#galeria" className="hover:underline">Galeria</a>
                        <a href="#linha-tempo" className="hover:underline">Linha do Tempo</a>
                        <a href="/" className="hover:underline">Voltar</a>
                    </nav>
                </div>
            </div>

            {/* Memorial Stats */}
            <section className="bg-gray-50 py-8">
                <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    <div>
                        <h3 className="text-2xl font-bold">1</h3>
                        <p className="text-sm text-gray-600">Memórias</p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold">1</h3>
                        <p className="text-sm text-gray-600">Fotos</p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold">1</h3>
                        <p className="text-sm text-gray-600">Anos de Memórias</p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold">2 dias</h3>
                        <p className="text-sm text-gray-600">Última Memória</p>
                    </div>
                </div>
            </section>

            {/* Memories Section */}
            <section id="memorias" className="py-10">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800">Memórias Especiais</h2>
                        <p className="text-gray-500">Momentos que ficaram para sempre em nossos corações</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-lg shadow">
                            <img src="/caminho/para/imagem.jpg" alt="a" className="w-full h-48 object-cover rounded-t-lg" />
                            <div className="p-4">
                                <div className="text-sm text-gray-500">11 de junho de 2025</div>
                                <h3 className="text-lg font-semibold">a</h3>
                                <p className="text-gray-600">fsafas</p>
                                <span className="inline-block mt-2 bg-blue-100 text-blue-800 px-2 py-1 text-xs rounded">teste</span>
                                <div className="mt-3">
                                    <a href="visualizar.html?id=1" className="inline-flex items-center px-3 py-1 text-sm border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white">
                                        <i className="fas fa-eye mr-2"></i> Ver Detalhes
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section id="galeria" className="py-10 bg-gray-100">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800">Galeria de Fotos</h2>
                        <p className="text-gray-500">Uma coleção visual de momentos únicos</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div onClick={openModal} className="relative cursor-pointer">
                            <img src="/caminho/para/imagem.jpg" alt="a" className="w-full h-40 object-cover rounded shadow" />
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white text-sm font-semibold opacity-0 hover:opacity-100 transition">
                                a - 11/06/2025
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section id="linha-tempo" class="py-5">
                <div class="container mx-auto">
                    <div class="row mb-4">
                        <div class="col-12 text-center">
                            <h2 class="section-title">
                                <i class="fas fa-clock"></i> Linha do Tempo
                            </h2>
                            <p class="section-subtitle">Uma jornada através dos momentos mais importantes</p>
                        </div>
                    </div>

                    <div class="timeline-container" id="timelineContainer"><div class="timeline-item timeline-left" >
                        <div class="timeline-content">
                            <h4>a</h4>
                            <div class="timeline-date">11 de junho de 2025</div>
                            <p>fsafas</p>
                        </div>
                    </div><div class="timeline-item timeline-right">
                            <div class="timeline-content">
                                <h4>AAA</h4>
                                <div class="timeline-date">11 de junho de 2025</div>
                                <p>fsdafsad</p>
                            </div>
                        </div></div>

                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-6 mt-10">
                <div className="text-center">
                    <p className="text-sm">
                        <i className="fas fa-heart text-red-500"></i> Memorial Digital - Preservando memórias para sempre
                    </p>
                </div>
            </footer>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-5xl w-full">
                        <h2 className="text-lg font-bold mb-4">Galeria de Fotos</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {[...Array(6)].map((_, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src="/caminho/para/imagem.jpg"
                                        alt={`Foto ${index + 1}`}
                                        className="w-full h-40 object-cover rounded"
                                    />
                                    <button
                                        onClick={() => console.log('Remover imagem')}
                                        className="absolute top-0 right-0 m-1 bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-xs hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                                        title="Remover imagem"
                                    >
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={closeModal}
                            className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
