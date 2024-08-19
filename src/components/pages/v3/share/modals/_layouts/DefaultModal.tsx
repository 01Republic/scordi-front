import React, {memo} from 'react';
import {WithChildren} from '^types/global.type';

import {AnimationLayout} from '^components/modal/ModalAnimationLayout';

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
        // 기존 daisyUI로 구현한 모달에 headlessui로 만든 Modal Layout 감싸기
        <AnimationLayout open={isShow} onClose={onClose}>
            <div
                data-modal-id={modalId}
                className={`
                    modal 
                    
                    cursor-pointer 
                    ${wrapperClassName} ${isShow ? 'modal-open' : ''}
                    `}
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
        </AnimationLayout>
    );
});
DefaultModal.displayName = 'DefaultModal';
