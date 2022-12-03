import {useRouter} from 'next/router';
import {MobileTopNav} from '^components/MobileTopNav';
import {SummaryListItem} from '^components/summaryListItem';
import {useEffect, useState} from 'react';
import {getDashboardSummary} from '^api/dashboard.api';
import {errorNotify} from '^utils/toast-notify';
import {DashboardSummaryDto} from '^types/dashboard.type';
import OrgMainLayout, {getOrgMainLayout} from '^layouts/org/mainLayout';

export const SummaryPageRoute = {
    pathname: '/orgs/:id/summary',
    path: (id: string) => SummaryPageRoute.pathname.replace(':id', id),
};

const SummaryPage = () => {
    const router = useRouter();
    const organizationId = Number(router.query.id);
    const [year] = useState(new Date().getFullYear());
    const [month] = useState(new Date().getMonth() + 1);
    const [summaryDto, setSummaryDto] = useState<DashboardSummaryDto | null>(null);

    useEffect(() => {
        if (!organizationId) return;

        getDashboardSummary(year, month)
            .then(({data}) => {
                setSummaryDto(data);
            })
            .catch(errorNotify);
    }, [organizationId]);

    if (!summaryDto) {
        return <></>; // not loaded
    }

    return (
        <>
            <MobileTopNav title={'상세보기'} />
            <div className={'px-[20px] py-[40px]'}>
                <p>이번달 총 비용</p>
                <h2 className={'my-[20px]'}>USD {summaryDto.total.toLocaleString()}</h2>
                <SummaryListItem
                    title={'오늘까지 결제된 금액'}
                    value={`USD ${summaryDto.didPayAmount.toLocaleString()}`}
                />
                <SummaryListItem title={'남은 결제 금액'} value={`USD ${summaryDto.willPayAmount.toLocaleString()}`} />
                <SummaryListItem
                    title={'지난달 총 결제액'}
                    value={`USD ${summaryDto.totalOnLastMonth.toLocaleString()}`}
                />
                <SummaryListItem
                    title={'연간 총 예상 비용'}
                    value={`USD ${summaryDto.totalOnThisYear.toLocaleString()}`}
                />
            </div>
        </>
    );
};

SummaryPage.getLayout = getOrgMainLayout;
export default SummaryPage;
