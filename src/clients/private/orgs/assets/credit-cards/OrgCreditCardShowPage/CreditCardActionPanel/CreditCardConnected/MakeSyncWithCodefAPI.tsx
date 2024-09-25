import React, {memo, useState} from 'react';
import {IoMdRefresh} from '^components/react-icons';
import Tippy from '@tippyjs/react';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {dateIsEqual, startOfDay, yyyy_mm_dd_hh_mm} from '^utils/dateTime';
import {FaCheck} from 'react-icons/fa6';
import {useCodefCardSync} from '^models/CodefCard/hooks/useCodefCardSync';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {confirm2} from '^components/util/dialog';
import {toast} from 'react-hot-toast';

interface MakeSyncWithCodefAPIProps {
    codefCard: CodefCardDto;
    onStart?: () => any;
    onFinish?: () => any;
}

export const MakeSyncWithCodefAPI = memo((props: MakeSyncWithCodefAPIProps) => {
    const orgId = useRecoilValue(orgIdParamState);
    const {codefCard, onStart, onFinish} = props;
    const [isHover, setIsHover] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const {syncCard} = useCodefCardSync();

    const startSync = () => {
        setIsRunning(true);
        setIsHover(false);
        confirm2('카드 동기화를 시작합니다', '약 3~4분 정도가 예상되는 작업이에요.\n지금 실행할까요?')
            .then((r) => {
                if (!r.isConfirmed) throw new Error('카드 동기화를 취소했습니다');
            })
            .then(() => onStart && onStart())
            .then(() => syncCard(orgId, codefCard))
            .then(() => finishSync())
            .catch((e) => console.log(e.message))
            .finally(() => setIsRunning(false));
    };

    const finishSync = () => {
        setIsRunning(false);
        onFinish && onFinish();
    };

    // (최신 상태인지 체크) 만약 이 카드의 싱크 범위가 어제 날짜에 도달했다면
    if (codefCard.syncedEndDate && dateIsEqual(startOfDay(codefCard.syncedEndDate), startOfDay())) {
        // 성공테마의 / 체크 아이콘으로 / 반투명하며 / 선택불가능한 / 정사각 버튼으로 표현
        return (
            <Tippy visible={isHover} content="Up to date">
                <div onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
                    <div className="btn btn-square bg-green-100 text-green-500 border border-green-300 pointer-events-none cursor-not-allowed">
                        <FaCheck fontSize={20} />
                    </div>
                </div>
            </Tippy>
        );
    }

    // 그게 아니면 : 최신 상태가 아니라면

    // 실행중이 아닌경우
    if (!isRunning) {
        return (
            <Tippy visible={isHover} content="Sync now">
                <div onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
                    <div className="btn btn-square border-gray-300" onClick={() => startSync()}>
                        <IoMdRefresh fontSize={20} />
                    </div>
                </div>
            </Tippy>
        );
    } else {
        // 실행중인 경우
        return (
            <div className="btn btn-square border-gray-300">
                <IoMdRefresh fontSize={20} className="animate-spin" />
            </div>
        );
    }
});
MakeSyncWithCodefAPI.displayName = 'MakeSyncWithCodefAPI';
