export interface Reader {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    memberShipId: string;
    isActive: boolean;
    borrowedBooks?: string[];
}

export type AlertType = 'success' | 'error';

export interface AlertProps {
    type: AlertType;
    message: string;
    onClose: () => void;
}
