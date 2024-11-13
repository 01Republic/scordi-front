import {WithChildren} from '^types/global.type';

export interface BackdropOption {
    opacity?: number;
    hidden?: boolean;
    className?: string;
}

export interface ModalLayoutProps extends WithChildren {
    open: boolean;
    onClose: () => void;
    backdrop?: BackdropOption;
    size?: 'sm' | 'md' | 'lg' | 'screen-sm' | 'screen-md' | 'screen-lg';
    modalClassName?: string;
}

export interface ModalProps {
    isOpened: boolean;
    onClose: () => void;
}
