import React, {memo} from 'react';
import {GoogleComplianceDisclosureTag} from '^components/GoogleCompliance';
import {googleAuthForGmail} from '^api/tasting.api';
import {useTranslation} from 'next-i18next';

export const NewInvoiceAccountModalBody = memo(() => {
    const {t} = useTranslation('org-home');

    return (
        <>
            <h3 className="font-bold text-2xl">{t('newInvoiceAccountModal.title')}</h3>
            <p className="py-4 text-lg" dangerouslySetInnerHTML={{__html: t('newInvoiceAccountModal.description')}} />
            <GoogleComplianceDisclosureTag />
            <div className="modal-action justify-center pb-4">
                <a
                    className="btn btn-lg btn-block btn-ghost bg-base-100 border-base-200 shadow normal-case gap-4"
                    onClick={() => googleAuthForGmail()}
                >
                    <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-6 h-6" alt="" />
                    <span>{t('newInvoiceAccountModal.googleLoginText')}</span>
                </a>
            </div>
        </>
    );
});
