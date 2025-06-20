import React, { useState, useEffect } from 'react';

const ImageUploader = ({ title, multiple = false, onImagesChange, previews }) => {
    const [localPreviews, setLocalPreviews] = useState(previews || []);

    useEffect(() => {
        setLocalPreviews(previews || []); // Sincroniza os previews recebidos
    }, [previews]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const newPreviews = [];

        if (!multiple) {
            const file = files[0];
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const updatedPreviews = [e.target.result];
                    setLocalPreviews(updatedPreviews);
                    onImagesChange(updatedPreviews); // Notifica o componente pai
                };
                reader.readAsDataURL(file);
            }
        } else {
            files.forEach((file) => {
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        newPreviews.push(e.target.result);
                        if (newPreviews.length === files.length) {
                            const updatedPreviews = [...localPreviews, ...newPreviews];
                            setLocalPreviews(updatedPreviews);
                            onImagesChange(updatedPreviews); // Notifica o componente pai
                        }
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
    };

    const removeImage = (index) => {
        const updatedPreviews = localPreviews.filter((_, i) => i !== index);
        setLocalPreviews(updatedPreviews);
        onImagesChange(updatedPreviews); // Notifica o componente pai
    };

    return (
        <div className="mb-4">
            <label htmlFor="imageInput" className="block font-medium mb-1">
                <i className="fas fa-images mr-2"></i> {title}
            </label>
            <input
                type="file"
                id="imageInput"
                accept="image/*"
                multiple={multiple}
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-sm text-gray-500 mt-1">
                {multiple ? 'Você pode selecionar múltiplas imagens.' : 'Selecione uma imagem.'}
            </p>
            <div id="imagePreviewContainer" className="mt-4">
                <div className="flex flex-wrap gap-4">
                    {localPreviews.map((preview, index) => (
                        <div key={index} className="relative w-32 h-32">
                            <img
                                src={preview}
                                alt="Preview"
                                className="object-cover w-full h-full rounded border"
                            />
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                title="Remover imagem"
                                className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-700 focus:outline-none shadow"
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ImageUploader;