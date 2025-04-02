import React, {memo} from 'react';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {yyyy_mm_dd} from '^utils/dateTime';
import {atom, useRecoilState} from 'recoil';
import Swal from 'sweetalert2';
import {swalHTML} from '^components/util/dialog';
import {invoiceAccountApi} from '^models/InvoiceAccount/api';
import {Sparkles} from 'lucide-react';

interface InvoiceAccountReconnectModalProps {
    invoiceAccount: InvoiceAccountDto;
}

export const InvoiceAccountReconnectModal = memo((props: InvoiceAccountReconnectModalProps) => {
    const {invoiceAccount} = props;
    const {googleTokenData} = invoiceAccount;

    const isConnectedBefore = !invoiceAccount.isManuallyCreated && googleTokenData;

    return (
        <div className="text-left px-6 py-10 flex flex-col min-h-[250px]">
            {isConnectedBefore ? (
                <>
                    <p className="text-14 text-scordi font-semibold">
                        {yyyy_mm_dd(invoiceAccount.syncedEndDate || googleTokenData.expireAt)} 이후의 데이터가 없어요
                    </p>
                    <p className="text-2xl font-semibold mb-2">재로그인이 필요한 청구서 메일이에요.</p>
                    <p className="text-16 font-semibold">
                        아래 버튼을 클릭해 같은 청구서 메일 계정으로 로그인해주세요.
                    </p>
                </>
            ) : (
                <>
                    <p className="text-14 text-scordi font-semibold">API 연결하기</p>
                    <div className="text-2xl font-semibold mb-2 flex items-center gap-1.5">
                        <img
                            draggable={false}
                            alt="Gmail Icon"
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/800px-Gmail_icon_%282020%29.svg.png"
                            width={24}
                        />
                        <span>Gmail 계정 인증을 시작합니다</span>
                    </div>

                    <div className="py-4 mb-2">
                        <code className="btn btn-xs bg-pink-100 text-pink-600 mb-2 -ml-0.5 font-semibold">
                            꼭 확인해주세요
                        </code>
                        <p className="text-16 font-semibold">
                            이어지는 창에서{' '}
                            <span className="font-bold underline underline-offset-4 text-17">API 조회를 위한 권한</span>
                            은 <br />
                            <span className="font-bold underline underline-offset-4 text-17">모두 승인</span>해주세요
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
                    <span>계정 확인하기</span>
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
