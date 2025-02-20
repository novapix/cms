import { PageProps as InertiaPageProps } from '@inertiajs/core';

export interface FlashMessage {
    message?: string;
    type?: 'success' | 'error' | 'warning';
}
export interface PageProps extends InertiaPageProps {
    flash: FlashMessage | null;
    images: {
        id: number;
        url: string;
        title: string;
    }[];
    messages?: {
        success?: string;
        error?: string;
    };
}
