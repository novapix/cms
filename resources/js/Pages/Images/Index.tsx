import { usePage, router } from "@inertiajs/react";
import { PageProps } from "@/types/inertia";
import DeleteButton from "@/Components/DeleteButton";
import { Button } from "@/components/ui/button";
import Flasher from "@/Components/Flash";

const ImagesIndex = () => {
    const { images, flash } = usePage<PageProps>().props;
    const handleDelete = (imageId: number) => {
        router.delete(`/api/images/${imageId}`, {
            preserveScroll: true,
            onSuccess: () => {
                console.log("Image deleted successfully!");
            },
            onError: (errors) => {
                console.error("Error deleting image:", errors);
            },
        });
    };


    return (
        <div>
            <Flasher flash={flash} />
            <h1 className="text-2xl font-bold mb-4">Image Gallery</h1>
            <Button onClick={() => window.location.assign("images/create")}>
                Add Images
            </Button>
            <div className="grid grid-cols-3 gap-4 mt-4">
                {images.map((image) => (
                    <div key={image.id} className="border p-2">
                        <img
                            src={image.url}
                            alt={image.title}
                            className="w-full h-40 object-cover rounded"
                        />
                        <p className="mt-2 text-center">{image.title}</p>
                        <DeleteButton imageId={image.id} onDelete={handleDelete} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImagesIndex;
