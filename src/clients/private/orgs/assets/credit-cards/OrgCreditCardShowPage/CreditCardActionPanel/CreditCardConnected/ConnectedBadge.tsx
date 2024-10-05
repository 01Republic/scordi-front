import React, {memo} from 'react';
import Tippy from '@tippyjs/react';
import {useCodefCardsOfCreditCardShow} from '^models/CodefCard/hook';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {yyyy_mm_dd} from '^utils/dateTime';
import {FaBoltLightning, FaPlay} from 'react-icons/fa6';
import {IoWarning} from 'react-icons/io5';
import {PiLightningFill, PiLightningSlash} from 'react-icons/pi';
import {RiAlarmWarningFill} from 'react-icons/ri';
import {LuTimer} from 'react-icons/lu';
import {IoMdRefresh, RiErrorWarningFill} from '^components/react-icons';
import {MakeSyncWithCodefAPI} from './MakeSyncWithCodefAPI';

export const ConnectedBadgeType1 = memo(() => {
    return (
        <div className="flex items-center h-10 px-3 border rounded-full border-green-500 text-green-500">
            <span className="text-48 pb-1.5">&bull;</span>
            {/*<BsFillLightningChargeFill fontSize={14} />*/}
            <span className="px-1 font-semibold">Connected</span>
        </div>
    );
});

export const ConnectedBadgeType2 = memo(() => {
    const {result, isLoading, reload} = useCodefCardsOfCreditCardShow();
    const codefCard: CodefCardDto | undefined = result.items[0];

    if (codefCard) {
        return (
            <div
                className={`btn !bg-transparent btn-outline gap-2 normal-case ${
                    isLoading ? 'opacity-50' : ''
                } !text-success !border-success`}
            >
                <PiLightningFill fontSize={16} />
                <div className="flex flex-col gap-0.5">
                    <div className="font-semibold text-left">API Connected</div>
                    <div className="text-12 flex items-center gap-1 font-[400]">
                        {/*<LuTimer />*/}
                        <span>Last:</span>
                        <span>{yyyy_mm_dd(codefCard.createdAt)}</span>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div
                className={`btn no-selectable pointer-events-none gap-2 normal-case border-gray-300 text-gray-400 hover:text-gray-500 ${
                    isLoading ? 'opacity-50' : ''
                }`}
            >
                <PiLightningSlash fontSize={16} />
                <div className="flex items-center font-semibold text-left whitespace-nowrap">No API connected</div>
            </div>
        );
    }
});

export const ConnectedBadgeType3 = memo(() => {
    const {result, isLoading, reload} = useCodefCardsOfCreditCardShow();
    const codefCard: CodefCardDto | undefined = result.items[0];

    return (
        <div className="mr-2 text-right no-selectable pointer-events-none">
            {codefCard ? (
                <div className={`normal-case ${isLoading ? 'opacity-50' : ''}`}>
                    <div className="inline-flex items-center justify-end !text-success border !border-success text-14 gap-1 px-1.5 mb-1 rounded-full">
                        <PiLightningFill fontSize={12} />
                        <div className="font-semibold text-left">API Connected</div>
                    </div>
                    <div className="text-12 flex items-center justify-end gap-1 font-[400] text-gray-400">
                        <LuTimer />
                        <span>최근 동기화:</span>
                        <span>{codefCard.syncedEndDate ? yyyy_mm_dd(codefCard.syncedEndDate) : '-'}</span>
                    </div>
                </div>
            ) : (
                <div className={`normal-case ${isLoading ? 'opacity-50' : ''}`}>
                    {/*  text-gray-400 border border-gray-300 */}
                    <div className="inline-flex items-center justify-end bg-gray-100 text-gray-400 border border-gray-300 text-14 gap-1 px-1.5 mb-1 rounded-full">
                        <PiLightningSlash fontSize={12} />
                        <div className="font-semibold text-left">No API Connected</div>
                    </div>
                    <div className="text-12 flex items-center justify-end gap-1 font-[400] text-yellow-600">
                        <RiAlarmWarningFill fontSize={14} className="relative top-[-1px]" />
                        <span>API를 연결하면 결제내역을 불러와요!</span>
                    </div>
                </div>
            )}
        </div>
    );
});
