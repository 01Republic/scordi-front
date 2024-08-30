import React, {memo} from 'react';
import {WithChildren} from '^types/global.type';

interface DefaultModalProps extends WithChildren {
    modalId: string;
    isShow: boolean;
    onClose: () => any;
    wrapperClassName?: string;
    className?: string;
}

export const DefaultModal = memo((props: DefaultModalProps) => {
    const {modalId, isShow, onClose, wrapperClassName, className, children} = props;

    return (
        <div
            data-modal-id={modalId}
            className={`modal cursor-pointer ${wrapperClassName} ${isShow ? 'modal-open' : ''}`}
            onClick={onClose}
        >
            <div
                className={`modal-box cursor-default ${className}`}
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
DefaultModal.displayName = 'DefaultModal';
