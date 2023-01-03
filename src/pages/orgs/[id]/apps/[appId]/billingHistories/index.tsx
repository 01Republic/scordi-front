import {MobileTopNav, MobileViewContainer} from '^components/MobileTopNav';
import {SummaryListItem} from '^components/summaryListItem';
import Image from 'next/image';
import {useEffect, useState} from 'react';
import {getAppsBillingHistory} from '^api/billing.api';
import {useRouter} from 'next/router';
import {errorNotify} from '^utils/toast-notify';
import {BillingHistoryDto} from '^types/billing.type';
import {ApplicationDto} from '^types/application.type';
import {getApplication} from '^api/application.api';
import {intlDateLong} from '^utils/dateTime';
import {getOrgMainLayout} from '^layouts/org/mainLayout';

export const BillingHistoriesPageRoute = {
    pathname: '/orgs/:id/apps/:appId/billingHistories',
    path: (id: string, appId: string) => BillingHistoriesPageRoute.pathname.replace(':id', id).replace(':appId', appId),
};

export default function BillingHistoriesPage() {
    const router = useRouter();
    const appId = Number(router.query.appId);
    const [billingHistory, setBillingHistory] = useState<BillingHistoryDto[]>([]);
    const [appInfo, setAppInfo] = useState<ApplicationDto | undefined>(undefined);

    useEffect(() => {
        if (isNaN(appId)) return;
        getApplication(appId)
            .then((res) => setAppInfo(res.data))
            .catch((err) => errorNotify(err));
        getAppsBillingHistory(appId)
            .then((res) => setBillingHistory(res.data.items))
            .catch((err) => errorNotify(err));
    }, [appId]);

    if (!appInfo) return;
    return (
        <>
            <MobileTopNav title={'구독 정보'} />
            <MobileViewContainer>
                <Image src={appInfo.prototype.image} width={80} height={80} />
                <h2 className={'my-[20px]'}>{appInfo.prototype.name}</h2>
                <p>구독시작일 : {intlDateLong(appInfo.registeredAt)}</p>
                <h2 className={'mt-[40px]'}>구독 내역</h2>
                {billingHistory.length === 0 && (
                    <div className={'text-center py-10'}>
                        <p>구독 내역이 없습니다</p>
                    </div>
                )}
                {billingHistory.map((item, index) => (
                    <SummaryListItem key={index} title={intlDateLong(item.paidAt)} value={`USD ${item.paidAmount}`} />
                ))}
            </MobileViewContainer>
        </>
    );
}

BillingHistoriesPage.getLayout = getOrgMainLayout;
