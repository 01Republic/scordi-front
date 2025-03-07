import React, {memo} from 'react';
import {newInvoiceAccountModal} from '^v3/share/modals/NewInvoiceAccountModal/atom';
import {useTranslation} from 'next-i18next';
import {useModal} from '^v3/share/modals/useModal';
import {MailPlus} from 'lucide-react';

export const AddNewAccountItem = memo(() => {
    const {open} = useModal(newInvoiceAccountModal);
    const {t} = useTranslation('org-home');

    return (
        <li>
            <a
                className="items-center gap-4 px-6 bg-base-100 active:bg-scordi-light-100 text-gray-700 hover:text-scordi"
                onClick={open}
            >
                <MailPlus className="w-7" />
                <span className="">{t('invoiceAccountAddingPanel.addAnotherAccount')}</span>
            </a>
        </li>
    );
});
