import { useState, useEffect } from "react";
import { FlashMessage } from "@/types/inertia";

interface FlasherProps {
    flash: FlashMessage | null;
}

const Flasher = ({ flash }: FlasherProps) => {
    const { message, type = 'success' } = flash || {};
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setVisible(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [message]);

    if (!message || !visible) return null;

    const bgClasses = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        warning: 'bg-yellow-500',
    };

    const bgColor = bgClasses[type] || bgClasses.success;

    return (
        <div
            className={`fixed top-4 left-1/2 transform -translate-x-1/2 p-4 rounded shadow-md text-white ${bgColor}`}
        >
            {message}
            <button
                onClick={() => setVisible(false)}
                className="ml-4 text-white font-bold"
            >
                ✖
            </button>
        </div>
    );
};

export default Flasher;
