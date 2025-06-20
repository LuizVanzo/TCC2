import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import '../../css/perfil.css';
import { format, parseISO, differenceInYears, differenceInDays } from 'date-fns';

export default function Dashboard({ memorial, memoria, membrosFamilia }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImages, setModalImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null); // Estado para a imagem em fullscreen

    const openModal = (images) => {
        setModalImages(images);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalImages([]);
    };

    return (
        <>
            <Head title="Memorial" />

            {/* Hero Section */}
            <section className="relative bg-gray-100 py-16">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-300 to-white opacity-50"></div>
                <div className="relative container mx-auto px-4 text-center">
                    <div className="mb-6">
                        <img
                            src={memorial.ft_memorial}
                            className="mx-auto w-60 h-60 rounded-full object-cover border-4 border-white shadow-md bg-gray-300"
                        />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">{memorial.nm_falecido}</h1>
                    <div className="mt-4 text-gray-500">
                        <span>{format(parseISO(memorial.dt_nascimento), 'dd/MM/yyyy')}</span> - <span>{format(parseISO(memorial.dt_falecimento), 'dd/MM/yyyy')}</span>
                    </div>
                    <p className="text-lg text-gray-600">{memorial.ds_historia}</p>
                </div>
            </section>

            {/* Navigation */}
            <div className="bg-white shadow sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between">
                    <div className="font-semibold text-blue-600">Memorial Digital</div>
                    <nav className="space-x-4 text-gray-600">
                        <a href="#memorias" className="hover:underline">Memórias</a>
                        <a href="#galeria" className="hover:underline">Galeria</a>
                        <a href="#familia" className="hover:underline">Família</a>
                        <a href="#linha-tempo" className="hover:underline">Linha do Tempo</a>
                        <a href="/dashboard" className="hover:underline">Voltar</a>
                    </nav>
                </div>
            </div>

            {/* Memorial Stats */}
            <section className="bg-gray-50 py-8">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div>
                            <h3 className="text-2xl font-bold">{memoria.length}</h3>
                            <p className="text-sm text-gray-600">Memórias</p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold">
                                {memoria.reduce((total, item) => {
                                    try {
                                        return total + JSON.parse(item.ft_memoria).length;
                                    } catch (e) {
                                        console.error("Erro ao parsear ft_memoria:", e);
                                        return total;
                                    }
                                }, 0)}
                            </h3>
                            <p className="text-sm text-gray-600">Fotos</p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold">
                                {memoria[0] ? differenceInYears(new Date(), parseISO(memoria[0].dt_memoria)) : 0}
                            </h3>
                            <p className="text-sm text-gray-600">Anos de Memórias</p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold">
                                {memoria[memoria.length - 1] ? `${differenceInDays(new Date(), parseISO(memoria[memoria.length - 1].dt_memoria))} dias` : '0 dias'}
                            </h3>
                            <p className="text-sm text-gray-600">Última Memória</p>
                        </div>
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

                    {memoria.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {memoria.map((item) => (
                                <div className="bg-white rounded-lg shadow" key={item.cd_memoria}>
                                    <img
                                        src={JSON.parse(item.ft_memoria)[0]}
                                        alt={item.nm_memoria}
                                        className="w-full h-48 object-cover rounded-t-lg"
                                    />
                                    <div className="p-4">
                                        <div className="text-sm text-gray-500">
                                            {format(parseISO(item.dt_memoria), 'dd/MM/yyyy')}
                                        </div>
                                        <h3 className="text-lg font-semibold">{item.nm_memoria}</h3>
                                        <p className="text-gray-600">{item.ds_memoria}</p>
                                        {/*
                            <div className="mt-3">
                                <a
                                    href={`visualizar.html?id=${item.cd_memoria}`}
                                    className="inline-flex items-center px-3 py-1 text-sm border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white"
                                >
                                    <i className="fas fa-eye mr-2"></i> Ver Detalhes
                                </a>
                            </div>
                            */}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-gray-500">
                            <p>Nenhuma memória registrada no momento.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Gallery Section */}
            <section id="galeria" className="py-10 bg-gray-100">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800">Galeria de Fotos</h2>
                        <p className="text-gray-500">Uma coleção visual de momentos únicos</p>
                    </div>

                    {memoria.length > 0 && memoria.some(item => JSON.parse(item.ft_memoria).length > 0) ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {memoria.map((item) => {
                                const images = JSON.parse(item.ft_memoria);
                                return images.length > 0 ? (
                                    <div
                                        key={item.cd_memoria}
                                        onClick={() => openModal(images)}
                                        className="relative cursor-pointer"
                                    >
                                        <img
                                            src={images[0]}
                                            alt={item.nm_memoria}
                                            className="w-full h-40 object-cover rounded shadow"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white text-sm font-semibold opacity-0 hover:opacity-100 transition">
                                            {item.nm_memoria} - {format(parseISO(item.dt_memoria), 'dd/MM/yyyy')}
                                        </div>
                                    </div>
                                ) : null;
                            })}
                        </div>
                    ) : (
                        <div className="text-center text-gray-500">
                            <p>Nenhuma foto disponível no momento.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Membros Familia */}
            <section id='familia' className="py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Membros da Família {membrosFamilia.length > 0 ? ( membrosFamilia[0].nm_familia) : ("")}</h2>
                        <h4 className="text-gray-600">{membrosFamilia.length > 0 ? ("“" + membrosFamilia[0].ds_familia + "”") : ("")}</h4>
                        <p className="text-gray-600">Clique em um membro para ver seu Memorial</p>
                    </div>

                    {membrosFamilia.length > 0 ? ( 
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {membrosFamilia.map((membro) => ( 
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden" key={membro.cd_memorial}>
                            <img
                                src={membro.ft_memorial}
                                alt={membro.nm_falecido}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{membro.nm_falecido}</h3>
                                <div className="text-sm text-gray-500 mb-3">
                                    {format(parseISO(membro.dt_nascimento), 'dd/MM/yyyy')} - {format(parseISO(membro.dt_falecimento), 'dd/MM/yyyy')}
                                </div>
                                <p className="text-gray-600 mb-4 line-clamp-3">{membro.ds_historia.length > 30 ? (membro.ds_historia.slice(0, 30) + "...") : (membro.ds_historia)}</p>
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex space-x-4">
                                        {/*
                                        <span className="text-gray-500">
                                            <i className="fas fa-heart mr-1"></i>2 memórias
                                        </span>
                                        <span className="text-gray-500">
                                            <i className="fas fa-camera mr-1"></i>1 fotos
                                        </span>
                                        */}
                                    </div>
                                    <Link href={membro.ds_link} className="text-blue-600 font-medium">Ver memorial →</Link>
                                </div>
                            </div>
                        </div>
                        ))} 
                    </div>
                    ) : ( 
                    <div className="text-center text-gray-600">
                        <p>Nenhum membro registrado no momento.</p>
                    </div>
                    )}
                </div>
            </section>

            {/* Timeline Section */}
            <section id="linha-tempo" className="py-5 bg-gray-100">
                <div className="container mx-auto">
                    <div className="row mb-4">
                        <div className="col-12 text-center">
                            <h2 className="section-title">
                                <i className="fas fa-clock"></i> Linha do Tempo
                            </h2>
                            <p className="section-subtitle">Uma jornada através dos momentos mais importantes</p>
                        </div>
                    </div>

                    {memoria.length > 0 ? (
                        <div className="timeline-container" id="timelineContainer">
                            {memoria.map((item, index) => (
                                <div
                                    key={item.cd_memoria}
                                    className={`timeline-item ${index % 2 === 0 ? 'timeline-left' : 'timeline-right'}`}
                                >
                                    <div className="timeline-content">
                                        <h4>{item.nm_memoria || 'Sem título'}</h4>
                                        <div className="timeline-date">{format(parseISO(item.dt_memoria), 'dd/MM/yyyy') || 'Sem data'}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-gray-500">
                            <p>Nenhuma memória registrada na linha do tempo.</p>
                        </div>
                    )}
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

            {/* Modal de Galeria */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-5xl w-full">
                        <h2 className="text-xl font-bold mb-4">Galeria de Fotos</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {modalImages.map((image, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={image}
                                        alt={`Foto ${index + 1}`}
                                        className="w-full h-40 object-cover rounded cursor-pointer"
                                        onClick={() => setSelectedImage(image)}
                                    />
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

            {/* Modal de Imagem em Tela Cheia */}
            {selectedImage && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-20">
                    <img
                        src={selectedImage}
                        alt="Imagem Ampliada"
                        className="max-w-full max-h-full object-contain"
                    />
                    <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-4 right-4 text-white text-2xl"
                    >
                        ✖
                    </button>
                </div>
            )}
        </>
    );
}
