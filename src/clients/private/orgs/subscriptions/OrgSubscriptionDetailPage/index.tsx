import {useOrgIdParam} from '^atoms/common';
import {ShowPage} from '^clients/private/_components/rest-pages/ShowPage';
import {MainTabButtons} from '^clients/private/_layouts/_shared/MainTabButton';
import {OrgSubscriptionListPageRoute} from '^pages/orgs/[id]/subscriptions';
import {useTranslation} from 'next-i18next';
import {memo, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {subscriptionSubjectAtom} from './atom';
import {SubscriptionActionPanel} from './SubscriptionActionPanel';
import {SubscriptionInfoTab} from './SubscriptionInfoTab';
import {SubscriptionMemberTab} from './SubscriptionMemberTab';
import {SubscriptionPaymentTab} from './SubscriptionPaymentTab';
import {SubscriptionProfilePanel} from './SubscriptionProfilePanel';

export const OrgSubscriptionDetailPage = memo(() => {
    const {t} = useTranslation('subscription');
    const orgId = useOrgIdParam();
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const subscription = useRecoilValue(subscriptionSubjectAtom);

    return (
        <ShowPage
            breadcrumb={[
                t('list.breadcrumb') as string,
                {
                    text: t('list.breadcrumbActive') as string,
                    active: false,
                    href: OrgSubscriptionListPageRoute.path(orgId),
                },
                {text: subscription?.product.name() || '', active: true},
            ]}
        >
            <header className="flex items-center justify-between pt-8 pb-4">
                <div className="flex-auto">
                    {subscription && <SubscriptionProfilePanel subscription={subscription} />}
                </div>
                <SubscriptionActionPanel />
            </header>

            <main className="pt-4">
                <div className="flex items-center justify-between border-b border-gray-300">
                    <MainTabButtons
                        borderless
                        activeTabIndex={activeTabIndex}
                        setActiveTabIndex={setActiveTabIndex}
                        tabs={[t('detail.tabs.info'), t('detail.tabs.payment'), t('detail.tabs.member')]}
                    />
                </div>

                {activeTabIndex == 0 && <SubscriptionInfoTab />}
                {activeTabIndex == 1 && <SubscriptionPaymentTab />}
                {activeTabIndex == 2 && <SubscriptionMemberTab />}
            </main>
        </ShowPage>
    );
});
