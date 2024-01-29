import {memo, useEffect} from 'react';
import {TbCalendarCheck, TbCalendarExclamation, TbCalendarOff, TbCalendarPause, TbCalendarX} from 'react-icons/tb';
import {SummaryCard} from '^v3/V3OrgAppsPage/SummarySection/SummaryCard';
import {SubscriptionManager} from '^models/Subscription/manager';
import {useSubscriptionMenuSummary} from '^models/Subscription/hook';
import {useDashBoardSubscriptionSummary, useSubscriptionMenuSummaryV2} from '^models/SubscsriptionSummary/hook';
import {useRecoilState, useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {subscriptionSummaryApi} from '^models/SubscsriptionSummary/api';
import {subscriptionListSummaryAtom} from '^models/SubscsriptionSummary/atom';

/**
 * 활성
 * 결제 실패
 * 일시정지
 * 구독취소
 * 만료됨
 */
export const SummarySectionV2 = memo(function SummarySection() {
    const {resultAtom, isLoadingAtom} = subscriptionListSummaryAtom;
    const [result, setResult] = useRecoilState(resultAtom);
    const [isLoading, setIsLoading] = useRecoilState(isLoadingAtom);
    const organizationId = useRecoilValue(orgIdParamState);

    useEffect(() => {
        if (!organizationId || isNaN(organizationId)) return;

        setIsLoading(true);
        subscriptionSummaryApi
            .index({organizationId})
            .then((res) => {
                setResult(res.data);
                console.log('res.data', res.data);
            })
            .finally(() => setIsLoading(false));
    }, [organizationId]);

    const {free, paying, active, canceled, expired, failed, paused, pending, total, none} = result;

    if (typeof free === 'undefined') return <></>;

    return (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-10">
            <SummaryCard
                isLoading={isLoading}
                icon={<TbCalendarCheck size={22} />}
                label="활성"
                value={active}
                className="text-scordi"
            />
            <SummaryCard
                isLoading={isLoading}
                icon={<TbCalendarExclamation size={22} />}
                label="결제 실패"
                value={failed}
                className={failed ? `text-error` : 'text-gray-500'}
            />
            <SummaryCard
                isLoading={isLoading}
                icon={<TbCalendarPause size={22} />}
                label="일시정지"
                value={paused}
                className="text-gray-500"
            />
            <SummaryCard
                isLoading={isLoading}
                icon={<TbCalendarX size={22} />}
                label="구독취소"
                value={canceled}
                className="text-gray-500"
            />
            <SummaryCard
                isLoading={isLoading}
                icon={<TbCalendarOff size={22} />}
                label="만료됨"
                value={expired}
                className="text-gray-500 flex md:hidden xl:flex"
            />
        </section>
    );
});
