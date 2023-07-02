import React, {memo} from 'react';
import {atom, useRecoilValue} from 'recoil';
import {useModal} from '^v3/share/modals/useModal';
import {draftAccountAtom} from '../pageAtoms';
import {InvoiceAppItem} from './InvoiceAppItem';
import {useTranslation} from 'next-i18next';

export const isShowInvoiceAppsModalState = atom<boolean>({
    key: 'isShowInvoiceAppsModalState',
    default: false,
});

export const InvoiceAppsModal = memo(() => {
    const {Modal, close} = useModal({isShowAtom: isShowInvoiceAppsModalState});
    const draftAccount = useRecoilValue(draftAccountAtom);
    const invoiceApps = draftAccount?.invoiceApps || [];
    const {t} = useTranslation('common');
    const {t: t2} = useTranslation('publicTasting');

    return (
        <Modal>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="font-bold text-lg">
                        {t('count_of_name', {
                            count: invoiceApps.length,
                            name: t('subscribing_service'),
                        })}
                    </h3>
                    <p>{t2('this_is_detected_subscriptions_from_emails')}</p>
                </div>
            </div>
            <div>
                <ul className="w-full py-0">
                    {invoiceApps.length ? (
                        <>
                            {invoiceApps.map((invoiceApp, i) => (
                                <InvoiceAppItem key={i} invoiceApp={invoiceApp} />
                            ))}
                        </>
                    ) : (
                        <li></li>
                    )}
                </ul>
            </div>
            <div className="modal-action justify-center bg-white">
                {/*<button className="btn btn-block btn-scordi normal-case">Save</button>*/}
                <button className="btn btn-block normal-case" onClick={close}>
                    Close
                </button>
            </div>
        </Modal>
    );
});
