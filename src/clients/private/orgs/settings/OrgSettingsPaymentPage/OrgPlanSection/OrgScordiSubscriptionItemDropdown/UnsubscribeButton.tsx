import React, {memo, useState} from 'react';
import {toast} from 'react-hot-toast';
import {ScordiSubscriptionDto} from '^models/_scordi/ScordiSubscription/type';
import {scordiSubscriptionApi} from '^models/_scordi/ScordiSubscription/api';
import {alert2, confirm2} from '^components/util/dialog';
import {MoreDropdown} from '^clients/private/_components/MoreDropdown';
import {dayBefore, yyyy_mm_dd} from '^utils/dateTime';
import {errorToast} from '^api/api';
import {ChannelTalk_Url} from '^config/constants';

interface UnsubscribeButtonProps {
    scordiSubscription: ScordiSubscriptionDto;
    onSuccess?: () => any;
}

export const UnsubscribeButton = memo((props: UnsubscribeButtonProps) => {
    const {scordiSubscription, onSuccess} = props;
    const [isLoading, setIsLoading] = useState(false);
    const orgId = scordiSubscription.organizationId;
    const nextDate = scordiSubscription.getNextDate();

    const onClick = async () => {
        // 노트. 1) 해지하려는 구독이, "해지" 가능한 플랜인 것인지 검사해야 함. 그리고 만약 해지 불가능한 플랜이면 다른 얼럿을 띄워줘야 함.
        if (!nextDate) return alert2('이 플랜은 해제 할 수 없어요.');

        const {isConfirmed} = await confirm2(
            '이 구독을 정말 해지할까요?',
            <div className="bg-red-50 px-4 py-3 rounded-lg">
                <h4 className="text-16 mb-2">안심하세요 👋</h4>

                <div className="text-14">
                    <div>1) 지금 해지해도 남은 구독 기간 동안 사용할 수 있어요.</div>
                    <div className="text-center py-6 font-semibold">
                        {yyyy_mm_dd(dayBefore(1, nextDate), '. ')} 까지
                    </div>
                    <div>2) 다음 결제일 부터 결제가 갱신되지 않아요.</div>
                </div>
            </div>,
            undefined,
            {confirmButtonText: '해지하기', cancelButtonText: '돌아가기'},
        );

        if (!isConfirmed) return;

        setIsLoading(true);
        scordiSubscriptionApi
            .unsubscribe(orgId, scordiSubscription.id)
            .then(() => toast.success('해지 했어요'))
            .then(() => onSuccess && onSuccess())
            .catch(errorToast)
            .finally(() => setIsLoading(false));
    };

    const onClickPreRelease = async () => {
        const {isConfirmed} = await confirm2(
            '문의 채널로 연결합니다',
            <div className="">
                <div>잠시 공사중인 기능이에요 🚧</div>
                <div>문의 채널에서 진행을 도와드리고 있어요</div>
            </div>,
            undefined,
            {confirmButtonText: '연결하기', cancelButtonText: '돌아가기'},
        );

        if (!isConfirmed) return;

        if (typeof window !== 'undefined') window.open(ChannelTalk_Url, '_blank');
    };

    return (
        <MoreDropdown.ItemButton className="!text-error bg-error/5" onClick={onClickPreRelease}>
            <span>구독 해지하기</span>
        </MoreDropdown.ItemButton>
    );
});
UnsubscribeButton.displayName = 'UnsubscribeButton';
