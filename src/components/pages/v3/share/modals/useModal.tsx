import {RecoilState, useRecoilState} from 'recoil';
import React, {memo, useEffect} from 'react';
import {WithChildren} from '^types/global.type';
import {IoClose} from '@react-icons/all-files/io5/IoClose';

interface UseModalOption {
    isShowAtom: RecoilState<boolean>;
    allowBodyScroll?: boolean;
}

interface ModalProps extends WithChildren {
    className?: string;
}

export const useModal = (option: UseModalOption) => {
    const {isShowAtom, allowBodyScroll = false} = option;
    const [isShow, setIsShow] = useRecoilState(isShowAtom);

    useEffect(() => {
        if (!allowBodyScroll) {
            const noScrollClass = 'modal-opened';
            isShow ? document.body.classList.add(noScrollClass) : document.body.classList.remove(noScrollClass);
        }
    }, [isShow]);

    const open = () => setIsShow(true);
    const close = () => setIsShow(false);
    const prevent = (e: any) => {
        e.stopPropagation();
        e.preventDefault();
    };

    return {
        isShow,
        setIsShow,
        open,
        close,
        prevent,
        Modal: memo(({children, className = ''}: ModalProps) => (
            <div className={`modal cursor-pointer ${isShow ? 'modal-open' : ''}`} onClick={close}>
                <div className={`modal-box cursor-default ${className}`} onClick={prevent}>
                    {children}
                </div>
            </div>
        )),
        CloseButton: memo(() => (
            <button onClick={close} className="btn btn-link p-0 text-gray-500 hover:text-gray-900">
                <IoClose size={26} />
            </button>
        )),
    };
};
