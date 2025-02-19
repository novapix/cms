import { usePage } from '@inertiajs/react';
import { PageProps } from '@/types/inertia';

const ImagesIndex = () => {
    const { images } = usePage<PageProps>().props;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Image Gallery</h1>
            <div className="grid grid-cols-3 gap-4 mt-4">
                {images.map((image) => (
                    <div key={image.id} className="border p-2">
                        <img src={image.url} alt={image.title} className="w-full h-40 object-cover rounded" />
                        <p className="mt-2 text-center">{image.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImagesIndex;
