import {MobileTopNav, MobileViewContainer} from '^components/MobileTopNav';
import {SummaryListItem} from '^components/summaryListItem';
import Image from 'next/image';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {errorNotify} from '^utils/toast-notify';
import {SubscriptionDto} from 'src/models/Subscription/types';
import {intlDateLong} from '^utils/dateTime';
import {getOrgMainLayout} from '^layouts/org/mainLayout';
import OrgMobileLayout from '^layouts/org/mobileLayout';
import {useCurrentUser} from '^models/User/hook';
import {subscriptionApi} from '^models/Subscription/api';
import {appBillingHistoryApi} from '^models/BillingHistory/api';
import {BillingHistoryDto} from '^models/BillingHistory/type';

export const BillingHistoriesPageRoute = {
    pathname: '/orgs/:id/apps/:appId/billingHistories',
    path: (id: string, appId: string) => BillingHistoriesPageRoute.pathname.replace(':id', id).replace(':appId', appId),
};

export default function BillingHistoriesPage() {
    const router = useRouter();
    const appId = Number(router.query.appId);
    const [billingHistory, setBillingHistory] = useState<BillingHistoryDto[]>([]);
    const [subInfo, setSubInfo] = useState<SubscriptionDto | undefined>(undefined);

    const {currentUser} = useCurrentUser();
    const locale = currentUser?.locale || 'ko';

    useEffect(() => {
        if (isNaN(appId)) return;
        subscriptionApi
            .show(appId)
            .then((res) => setSubInfo(res.data))
            .catch((err) => errorNotify(err));
        appBillingHistoryApi
            .index(appId)
            .then((res) => setBillingHistory(res.data.items))
            .catch((err) => errorNotify(err));
    }, [appId]);

    if (!subInfo) return;

    const productName = locale === 'ko' ? subInfo.product.nameKo : subInfo.product.nameEn;
    return (
        <OrgMobileLayout>
            <MobileTopNav title={'구독 정보'} />
            <MobileViewContainer>
                <Image src={subInfo.product.image} alt={productName} width={80} height={80} />
                <h2 className={'my-[20px]'}>{productName}</h2>
                <p>구독시작일 : {subInfo.registeredAt ? intlDateLong(subInfo.registeredAt) : ''}</p>
                <h2 className={'mt-[40px]'}>구독 내역</h2>
                {billingHistory.length === 0 && (
                    <div className={'text-center py-10'}>
                        <p>구독 내역이 없습니다</p>
                    </div>
                )}
                {billingHistory.map((item, index) => (
                    <SummaryListItem
                        key={index}
                        title={intlDateLong(item.paidAt!)}
                        value={item.payAmount ? `USD ${item.payAmount.amount}` : '-'}
                    />
                ))}
            </MobileViewContainer>
        </OrgMobileLayout>
    );
}
