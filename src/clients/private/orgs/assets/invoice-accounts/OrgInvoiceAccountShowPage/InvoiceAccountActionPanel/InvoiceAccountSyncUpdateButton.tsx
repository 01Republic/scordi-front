import React, {memo, useState} from 'react';
import {useRecoilState} from 'recoil';
import Tippy from '@tippyjs/react';
import {PiLightningFill} from 'react-icons/pi';
import {IoMdRefresh} from '^components/react-icons';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {invoiceAccountIsValidTokenAtom, useCurrentInvoiceAccountSync} from '../atom';
import {startSyncWithCheckValidToken} from './ReconnectModal';
import {FaCheck} from 'react-icons/fa6';

interface InvoiceAccountSyncUpdateButtonProps {
    invoiceAccount: InvoiceAccountDto;
}

export const InvoiceAccountSyncUpdateButton = memo((props: InvoiceAccountSyncUpdateButtonProps) => {
    const [isHover, setIsHover] = useState(false);
    const {startSync, isSyncRunning, currentInvoiceAccount} = useCurrentInvoiceAccountSync();
    const [isValidToken, setIsValidToken] = useRecoilState(invoiceAccountIsValidTokenAtom);

    if (!currentInvoiceAccount) return <></>;

    // const onReSync = () => {};

    const onClick = () => {
        setIsHover(false);
        startSyncWithCheckValidToken(currentInvoiceAccount, () => startSync());
    };

    // {/*<CheckValidToken invoiceAccount={invoiceAccount} />*/}
    // (토큰 유효성 체크) 만약 이 계정의 토큰이 유효하다면
    // if (isValidToken) {
    //     // 성공테마의 / 체크 아이콘으로 / 반투명하며 / 선택불가능한 / 정사각 버튼으로 표현
    //     return (
    //         <Tippy visible={isHover} content="Up to date">
    //             <div onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
    //                 <div className="btn btn-square bg-green-100 text-green-500 border border-green-300 pointer-events-none cursor-not-allowed">
    //                     <FaCheck fontSize={20} />
    //                 </div>
    //             </div>
    //         </Tippy>
    //     );
    // }

    // 실행중이 아닌경우
    if (!isSyncRunning) {
        return (
            <Tippy visible={isHover} content="Sync now">
                <div onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
                    <div className="btn btn-square border-gray-300" onClick={() => onClick()}>
                        <IoMdRefresh fontSize={20} />
                    </div>
                </div>
            </Tippy>
        );
    } else {
        // 실행중인 경우
        return (
            <div className="btn btn-square border-gray-300 pointer-events-none">
                <IoMdRefresh fontSize={20} className="animate-spin" />
            </div>
        );
    }
});
