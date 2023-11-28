import {memo} from 'react';
import {FaRegCalendarCheck, FaRegCalendarMinus, FaRegCalendarTimes} from 'react-icons/fa';
import {
    TbCalendarCancel,
    TbCalendarCheck,
    TbCalendarExclamation,
    TbCalendarOff,
    TbCalendarPause,
    TbCalendarX,
} from 'react-icons/tb';
import {SummaryCard} from '^v3/V3OrgAppsPage/SummarySection/SummaryCard';

/**
 * 활성
 * 결제 실패
 * 일시정지
 * 구독취소
 * 만료됨
 */
export const SummarySection = memo(function SummarySection() {
    const activeCount = 110; // 활성
    const failedCount = 6; // 결제 실패
    const pausedCount = 7; // 일시정지
    const cancelCount = 75; // 구독취소
    const expireCount = 2; // 만료됨

    return (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-6">
            <SummaryCard
                icon={<TbCalendarCheck size={22} />}
                label="활성"
                value={activeCount}
                className="text-scordi"
            />
            <SummaryCard
                icon={<TbCalendarExclamation size={22} />}
                label="결제 실패"
                value={failedCount}
                className={failedCount ? `text-error` : 'text-gray-500'}
            />
            <SummaryCard
                icon={<TbCalendarPause size={22} />}
                label="일시정지"
                value={pausedCount}
                className="text-gray-500"
            />
            <SummaryCard
                icon={<TbCalendarX size={22} />}
                label="구독취소"
                value={cancelCount}
                className="text-gray-500"
            />
            <SummaryCard
                icon={<TbCalendarOff size={22} />}
                label="만료됨"
                value={expireCount}
                className="text-gray-500 flex md:hidden xl:flex"
            />
        </section>
    );
});
