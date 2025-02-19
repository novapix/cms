import { useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DeleteButtonProps {
    imageId: number;
    onDelete: (imageId: number) => void; // Callback to handle deletion
}

export default function DeleteButton({ imageId, onDelete }: DeleteButtonProps) {
    const [open, setOpen] = useState(false);

    const handleConfirmDelete = () => {
        onDelete(imageId);
        setOpen(false);
    };

    return (
        <div>
            {/* Main Delete Confirmation Dialog */}
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger asChild>
                    <button className="bg-red-500 text-white px-4 py-2 rounded">
                        Delete
                    </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the image.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setOpen(false)}>
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirmDelete}>
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
