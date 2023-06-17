import React, {memo} from 'react';
import {BsEnvelopePlus} from '^components/react-icons';
import {useSetRecoilState} from 'recoil';
import {isOpenNewInvoiceAccountModalAtom} from '../../NewInvoiceAccountModal';
import {useTranslation} from 'next-i18next';

export const AddNewAccountItem = memo(() => {
    const setModalShow = useSetRecoilState(isOpenNewInvoiceAccountModalAtom);
    const {t} = useTranslation('org-home');

    return (
        <li>
            <a
                className="items-center gap-4 px-6 bg-base-100 active:bg-scordi-light-100 text-gray-700 hover:text-scordi"
                onClick={() => setModalShow(true)}
            >
                <BsEnvelopePlus className="w-7" />
                <span className="">{t('invoiceAccountAddingPanel.addAnotherAccount')}</span>
            </a>
        </li>
    );
});
