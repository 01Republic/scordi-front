import React, {memo} from 'react';
import Calendar from 'react-calendar';
import {OrgHomeRoute} from '^pages/orgs/[id]/home';
import {useRouter} from 'next/router';
import {useCalendar} from '^hooks/useCalendar';
import {MobileSection} from '^components/v2/MobileSection';

export const BillingCalendar = memo(() => {
    const router = useRouter();
    const organizationId = Number(router.query.id);
    const {year, month, calendarData} = useCalendar();

    if (!calendarData) return <></>;

    return (
        <MobileSection className="mb-3">
            <Calendar
                locale={'ko-KR'}
                calendarType={'US'}
                value={new Date()}
                activeStartDate={new Date(year, month - 1, 1)}
                formatDay={(locale, date) => date.getDate().toString()}
                tileContent={({date}) => {
                    // const thisDay = intlDateLong(date);
                    const payDay = calendarData?.find((item) => new Date(item.date).getDate() === date.getDate());
                    return !!payDay ? (
                        <div>
                            <p className="money-text active">
                                <span className="symbol">$</span>
                                <span className="amount">{payDay.amount.toLocaleString()}</span>
                            </p>
                        </div>
                    ) : (
                        <p className={'money-text--wrapper text-transparent'}>&nbsp;</p>
                    );
                }}
                next2Label={null}
                prev2Label={null}
                showNeighboringMonth={false}
                onActiveStartDateChange={({activeStartDate}) => {
                    router.replace(
                        `${OrgHomeRoute.path(organizationId)}?y=${activeStartDate.getFullYear()}&m=${
                            activeStartDate.getMonth() + 1
                        }`,
                    );
                }}
            />
        </MobileSection>
    );
});
