import { PageProps as InertiaPageProps } from '@inertiajs/core';

export interface PageProps extends InertiaPageProps {
    images: {
        id: number;
        url: string;
        title: string;
    }[];
}
