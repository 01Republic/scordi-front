import {memo} from 'react';
import {atom} from 'recoil';
import {useModal} from '^v3/share/modals/useModal';
import Image from 'next/image';

export const isOpenNewInvoiceAccountModalAtom = atom({
    key: 'isOpenNewInvoiceAccountModalAtom',
    default: false,
});

export const NewInvoiceAccountModal = memo(() => {
    const {Modal} = useModal({isShowAtom: isOpenNewInvoiceAccountModalAtom});

    return (
        <Modal className="py-12">
            <div className="flex items-center justify-center gap-3 mb-10">
                <Image src="/logo-transparent.png" alt="Scordi logo" width={48} height={48} />
                <span className="text-4xl font-bold">scordi</span>
            </div>
            <h3 className="font-bold text-center text-2xl">청구 메일 계정 추가하기</h3>
            <p className="py-4 text-center text-lg">
                여러 메일 계정 등록도 가능해요 <br />
                구글 로그인으로 클릭 한 번에 등록해보세요
            </p>
            <div className="modal-action justify-center">
                <a href="#" className="btn btn-lg btn-ghost bg-base-100 border-base-200 shadow normal-case gap-4">
                    <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-6 h-6" alt="" />
                    <span>구글 계정으로 로그인</span>
                </a>
            </div>
        </Modal>
    );
});
