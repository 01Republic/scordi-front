import {memo} from 'react';
import {SummaryCard} from '^v3/V3OrgAppsPage/SummarySection/SummaryCard';
import {useSubscriptionMenuSummaryV2} from '^models/SubscsriptionSummary/hook';
import {Calendar, CalendarCheck, CalendarOff, CalendarX} from 'lucide-react';

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
                icon={<CalendarCheck size={22} />}
                label="활성"
                value={active}
                className="text-scordi"
            />
            <SummaryCard
                isLoading={isLoading}
                icon={<Calendar size={22} />}
                label="결제 실패"
                value={failed}
                className={failed ? `text-error` : 'text-gray-500'}
            />
            <SummaryCard
                isLoading={isLoading}
                icon={<Calendar size={22} />}
                label="일시정지"
                value={paused}
                className="text-gray-500"
            />
            <SummaryCard
                isLoading={isLoading}
                icon={<CalendarX size={22} />}
                label="구독취소"
                value={canceled}
                className="text-gray-500"
            />
            <SummaryCard
                isLoading={isLoading}
                icon={<CalendarOff size={22} />}
                label="만료됨"
                value={expired}
                className="text-gray-500 flex md:hidden xl:flex"
            />
        </section>
    );
});
