import {memo} from 'react';
import {WithChildren} from '^types/global.type';

interface BottomUpModalProps extends WithChildren {
    modalId?: string;
    size?: 'lg' | 'md' | 'sm' | 'xl' | '2xl' | '3xl';
    isShow: boolean;
    onClose: () => any;
    wrapperClassName?: string;
    className?: string;
}

export const BottomUpModal = memo((props: BottomUpModalProps) => {
    const {modalId, size, wrapperClassName = '', className = '', isShow, onClose, children} = props;

    return (
        <div
            data-modal-id={modalId}
            className={`modal modal-bottom ${wrapperClassName} ${isShow ? 'modal-open' : ''}`}
            onClick={() => onClose()}
        >
            <div
                className={`modal-box cursor-default ${size ? `max-w-${size}` : ''} ${className}`}
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                }}
            >
                {children}
            </div>
        </div>
    );
});
BottomUpModal.displayName = 'BottomUpModal';
