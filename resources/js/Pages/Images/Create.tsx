import React from "react";
import { useForm } from '@inertiajs/react';

interface ImageFormData {
    name: string;
    url: string;
    alt_text: string;
    width: number;
    height: number;
    priority: number;
    image: File | null;
}
const ImageCreate = () => {
    // @ts-ignore
    const { data, setData, post } = useForm<ImageFormData>({
        name: '',
        url: '',
        alt_text: '',
        width: 0,
        height: 0,
        priority: 0,
        image: null,
    });
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // if(!data.name){
        //     alert("Title Missing");
        //     return;
        // }
        // if(!data.image && !data.url){
        //     console.log(data.image)
        //     alert("Image Missing");
        //     return;
        // }
        post("/api/images");
    }
    return (
        <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-semibold text-center mb-6">Create New Image</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                </div>

                <div>
                    <label htmlFor="url" className="block text-sm font-medium text-gray-700">URL</label>
                    <input
                        id="url"
                        type="text"
                        name="url"
                        value={data.url}
                        onChange={(e) => setData('url', e.target.value)}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                </div>

                <div>
                    <label htmlFor="alt_text" className="block text-sm font-medium text-gray-700">Alt Text</label>
                    <input
                        id="alt_text"
                        type="text"
                        name="alt_text"
                        value={data.alt_text}
                        onChange={(e) => setData('alt_text', e.target.value)}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                </div>

                <div>
                    <label htmlFor="width" className="block text-sm font-medium text-gray-700">Width</label>
                    <input
                        id="width"
                        type="number"
                        name="width"
                        value={data.width}
                        onChange={(e) => setData('width', parseInt(e.target.value))}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                </div>

                <div>
                    <label htmlFor="height" className="block text-sm font-medium text-gray-700">Height</label>
                    <input
                        id="height"
                        type="number"
                        name="height"
                        value={data.height}
                        onChange={(e) => setData('height', parseInt(e.target.value))}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                </div>

                <div>
                    <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority</label>
                    <input
                        id="priority"
                        type="number"
                        name="priority"
                        value={data.priority}
                        onChange={(e) => setData('priority', parseInt(e.target.value))}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
                    <input
                        id="image"
                        type="file"
                        name="image"
                        onChange={(e) => setData('image', e.target.files ? e.target.files[0] : null)}
                        accept=".jpg,.jpeg,.png,.gif,.svg"
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                </div>


                <div className="text-center">
                    <button
                        type="submit"
                        className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
                    >
                        Create Image
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ImageCreate;
