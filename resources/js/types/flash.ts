export type FlashType = 'success' | 'error' | 'warning';

export interface flash {
    type: FlashType;
    message: string;
}
