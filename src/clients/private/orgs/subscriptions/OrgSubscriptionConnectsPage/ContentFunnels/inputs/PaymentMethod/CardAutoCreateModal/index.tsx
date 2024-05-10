import {memo} from 'react';

interface CardAutoCreateModalProps {
    isOpened: boolean;
    onClose: () => any;
}

export const CardAutoCreateModal = memo((props: CardAutoCreateModalProps) => {
    const {isOpened, onClose} = props;

    return <></>;
});
CardAutoCreateModal.displayName = 'CardAutoCreateModal';
