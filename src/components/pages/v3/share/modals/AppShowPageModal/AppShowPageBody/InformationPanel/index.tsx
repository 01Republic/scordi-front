import React, {memo} from 'react';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {useCurrentSubscription} from '^v3/V3OrgAppShowPage/atom';
import {useBillingHistoryListOfSubscription} from '^models/BillingHistory/hook';
import {yyyy_mm_dd, yyyy_mm_dd_hh_mm} from '^utils/dateTime';
import {BillingHistoryManager} from '^models/BillingHistory/manager';
import {MobileInfoList} from '^v3/share/MobileInfoList';
import {MobileInfoListItem} from '^v3/share/MobileInfoList/Item';
import {PriceHeaderV2} from './PriceHeaderV2';
import {ListItemForAccount} from './ListItemForAccount';
import {ListItemForSourceAccount} from './ListItemForSourceAccount';
import {ListItemForPaymentMethod} from './ListItemForPaymentMethod';
import {SubscriptionProfile} from '^models/Subscription/components';
import {ListItemForSubscription} from '^v3/share/modals/AppShowPageModal/AppShowPageBody/InformationPanel/ListItemForSubscription';

// 정기결제금액 *
// 결제주기 *
// TODO: 0. 무료플랜 여부
// TODO: 0. 카테고리
export const InformationPanel = memo(() => {
    const {currentSubscription, isLoading, getBillingType} = useCurrentSubscription();
    const {result, isLoading: historyLoading} = useBillingHistoryListOfSubscription();

    if (!currentSubscription || isLoading) return <InformationPanelLoading />;
    if (historyLoading) return <InformationPanelLoading />;

    const BillingHistory = BillingHistoryManager.init(result.items).validateToListing();
    const lastPaidHistory = BillingHistory.lastPaidHistory();

    // TODO: paidAt 에 문제가 있음. (1) 시간이 안나옴. (2) issuedAt 과 날짜가 다름(시간잘리는과정에서 생긴문제일듯). (3) issuedAt 보다 신뢰도가 떨어짐.
    const lastPaidAt = lastPaidHistory ? new Date(lastPaidHistory.issuedAt) : null;
    const nextPayDate = currentSubscription.getNextPayDate(lastPaidAt);
    const nextPayAmount = currentSubscription.getNextPayAmount(lastPaidHistory);

    return (
        <MobileSection.Item>
            <MobileSection.Padding>
                <div className="w-full h-[40px]" />
                <div>
                    <div className="flex items-center justify-between mb-2">
                        {currentSubscription && <SubscriptionProfile subscription={currentSubscription} />}
                    </div>
                    <div>
                        {/*<PriceHeader totalPrice={totalPrice} billingType={billingType} />*/}
                        {/*<PriceHeaderV2 totalPrice={totalPrice} billingCycleTypeText={billingCycleTypeText} />*/}
                        <PriceHeaderV2 subscription={currentSubscription} />
                    </div>
                    <MobileInfoList>
                        <ListItemForSubscription subscription={currentSubscription} />
                    </MobileInfoList>

                    <hr />

                    <MobileInfoList>
                        <ListItemForSourceAccount />
                        <ListItemForAccount />
                    </MobileInfoList>

                    <MobileInfoList>
                        {/*<MobileInfoListItem label="카테고리" />*/}
                        {/*<MobileInfoListItem label="현재 플랜" />*/}
                        <ListItemForPaymentMethod subscription={currentSubscription} />

                        {nextPayAmount && nextPayAmount.isNotDomestic() && (
                            <MobileInfoListItem
                                label="해외결제금액"
                                value={
                                    <span>
                                        {lastPaidHistory?.payAmount?.text}{' '}
                                        <span className="text-gray-500">({lastPaidHistory?.payAmount?.code})</span>
                                    </span>
                                }
                            />
                        )}

                        {lastPaidAt && (
                            <MobileInfoListItem label="마지막 결제일" value={yyyy_mm_dd_hh_mm(lastPaidAt)} />
                        )}
                        <MobileInfoListItem
                            label="다음 결제 예정일"
                            value={nextPayDate ? yyyy_mm_dd(nextPayDate) : '-'}
                        />

                        {/*TODO: 결제 예정금액 표기 오류로 주석처리*/}
                        {/*<MobileInfoListItem*/}
                        {/*    label="결제 예정 금액"*/}
                        {/*    value={*/}
                        {/*        <span>*/}
                        {/*            {nextPayAmount?.text} <span className="text-gray-500">({nextPayAmount?.code})</span>*/}
                        {/*        </span>*/}
                        {/*    }*/}
                        {/*/>*/}
                    </MobileInfoList>
                </div>
            </MobileSection.Padding>
        </MobileSection.Item>
    );
});
InformationPanel.displayName = 'InformationPanel';

const InformationPanelLoading = memo(() => {
    return (
        <MobileSection.Item>
            <MobileSection.Padding>
                <div className="w-full h-[40px]" />
                <p className="text-center">loading ...</p>
            </MobileSection.Padding>
        </MobileSection.Item>
    );
});
InformationPanelLoading.displayName = 'InformationPanelLoading';
