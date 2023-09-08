import {memo} from 'react';
import {atom} from 'recoil';
import {useModal} from '^v3/share/modals/useModal';
import Image from 'next/image';
import {useTranslation} from 'next-i18next';
import {googleAuthForGmail} from '^api/tasting.api';
import {GoogleComplianceDisclosureTag} from '^components/GoogleCompliance';

export const isOpenNewInvoiceAccountModalAtom = atom({
    key: 'isOpenNewInvoiceAccountModalAtom',
    default: false,
});

export const NewInvoiceAccountModal = memo(() => {
    const {Modal} = useModal({isShowAtom: isOpenNewInvoiceAccountModalAtom});
    const {t} = useTranslation('org-home');

    return (
        <Modal className="py-12">
            <div className="flex items-center justify-center gap-3 mb-10">
                <Image src="/logo-transparent.png" alt="Scordi logo" width={48} height={48} />
                <span className="text-4xl font-bold">scordi</span>
            </div>
            <h3 className="font-bold text-center text-2xl">{t('newInvoiceAccountModal.title')}</h3>
            <p
                className="py-4 text-center text-lg"
                dangerouslySetInnerHTML={{__html: t('newInvoiceAccountModal.description')}}
            />
            <div className="modal-action justify-center pb-4">
                <a
                    className="btn btn-lg btn-ghost bg-base-100 border-base-200 shadow normal-case gap-4"
                    onClick={() => googleAuthForGmail()}
                >
                    <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-6 h-6" alt="" />
                    <span>{t('newInvoiceAccountModal.googleLoginText')}</span>
                </a>
            </div>
            <GoogleComplianceDisclosureTag />
        </Modal>
    );
});
