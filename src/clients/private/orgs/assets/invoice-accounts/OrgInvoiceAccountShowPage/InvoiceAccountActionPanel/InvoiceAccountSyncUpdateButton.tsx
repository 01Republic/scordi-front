import React, {memo} from 'react';
import {useRecoilState} from 'recoil';
import Tippy from '@tippyjs/react';
import {PiLightningFill} from 'react-icons/pi';
import {IoMdRefresh} from '^components/react-icons';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {invoiceAccountIsValidTokenAtom, useCurrentInvoiceAccountSync} from '../atom';
import {startSyncWithCheckValidToken} from './ReconnectModal';

interface InvoiceAccountSyncUpdateButtonProps {
    invoiceAccount: InvoiceAccountDto;
}

export const InvoiceAccountSyncUpdateButton = memo((props: InvoiceAccountSyncUpdateButtonProps) => {
    const {invoiceAccount} = props;
    const {startSync, isSyncRunning} = useCurrentInvoiceAccountSync();
    const [isValidToken, setIsValidToken] = useRecoilState(invoiceAccountIsValidTokenAtom);

    // const onReSync = () => {};

    const onClick = () => {
        startSyncWithCheckValidToken(invoiceAccount, () => startSync());
    };

    return (
        <div className="flex items-center gap-4">
            {/*<CheckValidToken invoiceAccount={invoiceAccount} />*/}
            {!isValidToken ? (
                <>
                    {/* 이상하게도 isValidToken 을 setState 하려고 하면 무한루프 에러가 나서 아래 코드를 보여 줄 수 없음. */}
                    {/*<div className="text-right">*/}
                    {/*    <p className="text-14 text-orange-500 font-semibold">계정 인증의 유효기간이 지났어요</p>*/}
                    {/*    <p className="text-12 text-gray-400">*/}
                    {/*        ({yyyy_mm_dd(invoiceAccount.googleTokenData!.expireAt)} 이후 데이터를 가져오지 못했어요)*/}
                    {/*    </p>*/}
                    {/*</div>*/}

                    {/*<button*/}
                    {/*    className="btn btn-scordi gap-2"*/}
                    {/*    onClick={() => {*/}
                    {/*        const button = document.querySelector('#invoice-email-token-refresh-button') as HTMLElement;*/}
                    {/*        button?.click();*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    <BsStars />*/}
                    {/*    <span>다시 연결하기</span>*/}
                    {/*</button>*/}
                </>
            ) : (
                <>
                    <div
                        className={`flex items-center gap-1 border ${
                            isSyncRunning ? 'border-warning text-warning' : 'border-success text-success'
                        } text-14 px-2.5 py-1 rounded-full`}
                    >
                        <PiLightningFill fontSize={12} />
                        {isSyncRunning ? (
                            <div className="font-semibold text-left">Connecting...</div>
                        ) : (
                            <div className="font-semibold text-left">Connected</div>
                        )}
                    </div>

                    {isSyncRunning ? (
                        <div className="btn btn-square border-gray-300 pointer-events-none">
                            <IoMdRefresh fontSize={20} className="animate-spin" />
                        </div>
                    ) : (
                        <Tippy content="Sync now">
                            <div className="btn btn-square border-gray-300" onClick={() => onClick()}>
                                <IoMdRefresh fontSize={20} />
                            </div>
                        </Tippy>
                    )}
                </>
            )}
        </div>
    );
});
