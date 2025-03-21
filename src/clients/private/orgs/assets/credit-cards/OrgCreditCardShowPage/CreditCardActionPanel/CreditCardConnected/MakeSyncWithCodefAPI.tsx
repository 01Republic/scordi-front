import React, {memo, useState} from 'react';
import Tippy from '@tippyjs/react';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {dateIsEqual, startOfDay, yyyy_mm_dd_hh_mm} from '^utils/dateTime';
import {useCodefCardSync} from '^models/CodefCard/hooks/useCodefCardSync';
import {confirm2} from '^components/util/dialog';
import {toast} from 'react-hot-toast';
import {useCurrentCreditCardSync} from '^clients/private/orgs/assets/credit-cards/OrgCreditCardShowPage/atom';
import {Check, RotateCw} from 'lucide-react';

export const MakeSyncWithCodefAPI = memo(() => {
    const [isHover, setIsHover] = useState(false);
    const {startSync, isSyncRunning, currentCodefCard} = useCurrentCreditCardSync();

    if (!currentCodefCard) return <></>;

    const {syncedEndDate} = currentCodefCard;

    const onClick = () => {
        setIsHover(false);
        startSync();
    };

    // (최신 상태인지 체크) 만약 이 카드의 싱크 범위가 어제 날짜에 도달했다면
    if (syncedEndDate && dateIsEqual(startOfDay(syncedEndDate), startOfDay())) {
        // 성공테마의 / 체크 아이콘으로 / 반투명하며 / 선택불가능한 / 정사각 버튼으로 표현
        return (
            <Tippy visible={isHover} content="Up to date">
                <div onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
                    <div className="btn btn-square bg-green-100 text-green-500 border border-green-300 pointer-events-none cursor-not-allowed">
                        <Check fontSize={20} />
                    </div>
                </div>
            </Tippy>
        );
    }

    // 그게 아니면 : 최신 상태가 아니라면

    // 실행중이 아닌경우
    if (!isSyncRunning) {
        return (
            <Tippy visible={isHover} content="Sync now">
                <div onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
                    <div className="btn btn-square border-gray-300" onClick={onClick}>
                        <RotateCw fontSize={20} />
                    </div>
                </div>
            </Tippy>
        );
    } else {
        // 실행중인 경우
        return (
            <div className="btn btn-square border-gray-300 pointer-events-none">
                <RotateCw fontSize={20} className="animate-spin" />
            </div>
        );
    }
});
MakeSyncWithCodefAPI.displayName = 'MakeSyncWithCodefAPI';
