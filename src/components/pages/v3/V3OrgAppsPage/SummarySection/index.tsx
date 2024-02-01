import {memo} from 'react';
import {TbCalendarCheck, TbCalendarExclamation, TbCalendarOff, TbCalendarPause, TbCalendarX} from 'react-icons/tb';
import {SummaryCard} from '^v3/V3OrgAppsPage/SummarySection/SummaryCard';
import {useSubscriptionMenuSummaryV2} from '^models/SubscsriptionSummary/hook';

/**
 * 활성
 * 결제 실패
 * 일시정지
 * 구독취소
 * 만료됨
 */
export const SummarySection = memo(function SummarySection() {
    const {isLoading, result} = useSubscriptionMenuSummaryV2();

    const {active, failed, paused, canceled, expired} = result;

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
