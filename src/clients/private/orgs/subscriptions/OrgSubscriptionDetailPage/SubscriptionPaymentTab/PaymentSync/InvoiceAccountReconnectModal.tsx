import {swalHTML} from '^components/util/dialog';
import {invoiceAccountApi} from '^models/InvoiceAccount/api';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {yyyy_mm_dd} from '^utils/dateTime';
import {Sparkles} from 'lucide-react';
import {useTranslation} from 'next-i18next';
import {memo} from 'react';
import Swal from 'sweetalert2';

interface InvoiceAccountReconnectModalProps {
    invoiceAccount: InvoiceAccountDto;
}

export const InvoiceAccountReconnectModal = memo((props: InvoiceAccountReconnectModalProps) => {
    const {invoiceAccount} = props;
    const {googleTokenData} = invoiceAccount;
    const {t} = useTranslation('subscription');

    const isConnectedBefore = !invoiceAccount.isManuallyCreated && googleTokenData;

    return (
        <div className="text-left px-6 py-10 flex flex-col min-h-[250px]">
            {isConnectedBefore ? (
                <>
                    <p className="text-14 text-scordi font-semibold">
                        {t('detail.paymentSync.modal.afterData', {
                            date: yyyy_mm_dd(invoiceAccount.syncedEndDate || googleTokenData.expireAt),
                        })}
                    </p>
                    <p className="text-2xl font-semibold mb-2">{t('detail.paymentSync.modal.reconnectRequired')}</p>
                    <p className="text-16 font-semibold">{t('detail.paymentSync.modal.loginSameAccount')}</p>
                </>
            ) : (
                <>
                    <p className="text-14 text-scordi font-semibold">{t('detail.paymentSync.modal.apiConnect')}</p>
                    <div className="text-2xl font-semibold mb-2 flex items-center gap-1.5">
                        <img
                            draggable={false}
                            alt="Gmail Icon"
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/800px-Gmail_icon_%282020%29.svg.png"
                            width={24}
                        />
                        <span>{t('detail.paymentSync.modal.gmailAuth')}</span>
                    </div>

                    <div className="py-4 mb-2">
                        <code className="btn btn-xs bg-pink-100 text-pink-600 mb-2 -ml-0.5 font-semibold">
                            {t('detail.paymentSync.modal.checkRequired')}
                        </code>
                        <p className="text-16 font-semibold">
                            {t('detail.paymentSync.modal.grantPermission')}{' '}
                            <span className="font-bold underline underline-offset-4 text-17">
                                {t('detail.paymentSync.modal.apiPermission')}
                            </span>
                            은 <br />
                            <span className="font-bold underline underline-offset-4 text-17">
                                {t('detail.paymentSync.modal.approveAll')}
                            </span>
                            해주세요
                        </p>
                    </div>
                </>
            )}

            <div className="mt-auto text-center">
                <button
                    className="btn btn-scordi gap-2"
                    onClick={() => {
                        const button = document.querySelector('#invoice-email-token-refresh-button') as HTMLElement;
                        button?.click();
                        Swal.close();
                    }}
                >
                    <Sparkles />
                    <span>{t('detail.paymentSync.modal.confirmAccount')}</span>
                </button>
            </div>
        </div>
    );
});

export const startSyncInvoiceAccount = (invoiceAccount: InvoiceAccountDto, startSync: () => any) => {
    invoiceAccountApi.isValidToken(invoiceAccount.organizationId, invoiceAccount.id).then((res) => {
        res.data ? startSync() : swalHTML(<InvoiceAccountReconnectModal invoiceAccount={invoiceAccount} />);
    });
};
