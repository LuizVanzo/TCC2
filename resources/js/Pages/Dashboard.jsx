import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import axios from 'axios';

export default function Dashboard({ memorial, familia, qrCodeUrl }) {
    const [qrUrls, setQrUrls] = useState({}); // State for storing QR codes by memorial
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
    const [currentQrUrl, setCurrentQrUrl] = useState(null); // State for current QR code URL

    const generateQr = async (ds_link, cd_memorial) => {
        try {
            const response = await axios.post('/perfil/gerar-qr', { ds_link });
            const qrUrl = response.data.qrCodeUrl || null;
            
            setQrUrls((prev) => ({
                ...prev,
                [cd_memorial]: qrUrl,
            }));
            setCurrentQrUrl(qrUrl); // Set current QR code URL
            setIsModalOpen(true); // Open modal
        } catch (error) {
            console.error('Errors:', error.response?.data?.errors || error.message);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentQrUrl(null);
    };

    const downloadQr = () => {
        if (currentQrUrl) {
            const link = document.createElement('a');
            link.href = currentQrUrl;
            link.download = 'qr-code.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <AuthenticatedLayout
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex justify-end items-center mb-8">
                        <Link
                            href="/familia/criar"
                            className="bg-blue-500 text-white mr-4 px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                            + Adicionar Família
                        </Link>
                        <Link
                            href="/memorial/criar"
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                            + Criar Memorial
                        </Link>
                    </div>

                    <h1 className="text-2xl font-bold">Meus Memoriais</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-5">
                        <div className="bg-white shadow-md rounded-lg overflow-hidden">
                            <div className="relative h-40 bg-gray-300 flex items-center justify-center">
                                <span>FOTO MEMORIAL</span>
                                <button
                                    className="absolute top-2 right-2 bg-blue-500 text-white rounded-full h-10 w-10 flex items-center justify-center hover:bg-blue-600 focus:outline-none"
                                    title="Adicionar Memória"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div className="p-4">
                                <h2 className="text-lg font-semibold mb-2">Nome Falecido 1</h2>
                                <div className="flex gap-2">
                                    <Link
                                        href="/memorial/5"
                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                        as="button"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 inline mr-1"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                            <path
                                                fillRule="evenodd"
                                                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Visualizar
                                    </Link>
                                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 inline mr-1"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                        </svg>
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => generateQr('sla', 'static-1')}
                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 inline mr-1"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h1v1H5zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm2 2v-1h1v1H5zM13 3a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1V4a1 1 0 011-1h3zm-1 2v1h-1V5h1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        QR Code
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Dynamic cards */}
                        {memorial.map((item) => (
                            <div key={item.cd_memorial} className="bg-white shadow-md rounded-lg overflow-hidden">
                                <div className="relative h-40 bg-gray-300 flex items-center justify-center">
                                    <img src={item.ft_memorial} alt="Foto Memorial" className="w-full h-full object-cover" />
                                    <Link
                                        href={`/memorial/${item.cd_memorial}/memoria/criar`}
                                        className="absolute top-2 right-2 bg-blue-500 text-white rounded-full h-10 w-10 flex items-center justify-center hover:bg-blue-600 focus:outline-none"
                                        title="Adicionar Memória"
                                        as="button"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </Link>
                                </div>
                                <div className="p-4">
                                    <h2 className="text-lg font-semibold mb-2">{item.nm_falecido}</h2>
                                    <div className="flex gap-2">
                                        <Link
                                            href={item.ds_link}
                                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                            as="button"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 inline mr-1"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                <path
                                                    fillRule="evenodd"
                                                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            Visualizar
                                        </Link>
                                        <Link
                                            href={`/memorial/${item.cd_memorial}/editar`}
                                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                            as="button"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 inline mr-1"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                            </svg>
                                            Editar
                                        </Link>
                                        <button
                                            onClick={() => generateQr(item.ds_link, item.cd_memorial)}
                                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 inline mr-1"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h1v1H5zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm2 2v-1h1v1H5zM13 3a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1V4a1 1 0 011-1h3zm-1 2v1h-1V5h1z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            QR Code
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Modal for QR Code */}
                    {isModalOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                                <h2 className="text-lg font-semibold mb-4">QR Code</h2>
                                {currentQrUrl && (
                                    <div className="flex flex-col items-center">
                                        <img src={currentQrUrl} alt="QR Code" className="mb-4" />
                                        <button
                                            onClick={downloadQr}
                                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                                        >
                                            Baixar QR Code
                                        </button>
                                    </div>
                                )}
                                <button
                                    onClick={closeModal}
                                    className="mt-4 text-gray-500 hover:text-gray-700"
                                >
                                    Fechar
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Familia */}
                    <h1 className="text-2xl font-bold mt-10">Família</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-5">
                        {familia.map((membro) => (
                            <div key={membro.cd_familia} className="bg-white shadow-md rounded-lg overflow-hidden">
                                <div className="p-4">
                                    <h2 className="text-lg font-semibold mb-2">{membro.nm_familia}</h2>
                                    <div className="flex gap-2">
                                        <Link
                                            href={`/familia/${membro.cd_familia}/editar`}
                                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                            as="button"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 inline mr-1"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                            </svg>
                                            Editar
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}