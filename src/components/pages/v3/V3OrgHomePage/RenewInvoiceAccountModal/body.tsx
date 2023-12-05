import React, {memo} from 'react';
import {GoogleComplianceDisclosureTag} from '^components/GoogleCompliance';
import {googleAuthForGmail} from '^api/tasting.api';
import {useTranslation} from 'next-i18next';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {selectedInvoiceAccountAtom} from '^v3/V3OrgHomePage/InvoiceAccountAddingButton/InvoiceAppListPanel';
import {renewInvoiceAccountAtom} from '^v3/V3OrgHomePage/RenewInvoiceAccountModal/atom';
import {orgIdParamState} from '^atoms/common';
import {V3OrgHomePageRoute} from '^pages/v3/orgs/[orgId]';

export const RenewInvoiceAccountModalBody = memo(() => {
    const {t} = useTranslation('org-home');
    const orgId = useRecoilValue(orgIdParamState);
    const selectedInvoiceAccount = useRecoilValue(selectedInvoiceAccountAtom);
    const onRenew = useSetRecoilState(renewInvoiceAccountAtom);

    if (!selectedInvoiceAccount) return <></>;

    return (
        <>
            <h3 className="font-bold text-2xl">{t('renewInvoiceAccountModal.title')}</h3>
            <p
                className="py-4 text-lg"
                dangerouslySetInnerHTML={{
                    __html: t('renewInvoiceAccountModal.description', {email: selectedInvoiceAccount.email}),
                }}
            />
            <GoogleComplianceDisclosureTag feature={'gmail'} />
            <div className="modal-action justify-center pb-4">
                <a
                    className="btn btn-lg btn-block btn-ghost bg-base-100 border-base-200 shadow normal-case gap-4"
                    onClick={() => {
                        onRenew(selectedInvoiceAccount);
                        googleAuthForGmail(V3OrgHomePageRoute.path(orgId));
                    }}
                >
                    <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-6 h-6" alt="" />
                    <span>{t('renewInvoiceAccountModal.googleLoginText')}</span>
                </a>
            </div>
        </>
    );
});
