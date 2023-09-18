import React, {memo} from 'react';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {useCurrentApp} from '^v3/V3OrgAppShowPage/atom';
import {PrototypeAvatar} from '^components/pages/LandingPages/TastingPage/TastingItemDetailModal/PrototypeAvatar';
import {useBillingHistoriesV3} from '^hooks/useBillingHistories';
import {currencyFormat, getCurrencySymbol} from '^api/tasting.api/gmail/agent/parse-email-price';
import {useRecoilValue} from 'recoil';
import {displayCurrencyAtom} from '^components/pages/LandingPages/TastingPage/pageAtoms';
import {BillingHistoryManager} from '^models/BillingHistory';

export const InformationPanel = memo(() => {
    const displayCurrency = useRecoilValue(displayCurrencyAtom);
    const {currentApp, isLoading, getBillingType} = useCurrentApp();
    const {result} = useBillingHistoriesV3();

    const billingType = getBillingType();
    const BillingHistory = BillingHistoryManager.init(result.items).validateToListing();
    const totalPrice = BillingHistory.paymentOnly().latestIssue().getTotalPrice(displayCurrency);

    // 정기결제금액
    // 결제주기
    // 카테고리
    // 현재 플랜
    // 마지막 결제일
    // 다음 결제 예정일
    // 다음 결제 예정 금액
    // 해외결제 여부
    // 해외결제 원래표기 및 적용환율

    return (
        <MobileSection.Item>
            <MobileSection.Padding>
                <div className="w-full h-[40px]" />
                {isLoading ? (
                    <p className="text-center">loading ...</p>
                ) : (
                    <div>
                        {currentApp && <PrototypeAvatar proto={currentApp.product} />}
                        <div>
                            <p className="text-3xl font-bold mb-12">
                                <small className="mr-1">{getCurrencySymbol(totalPrice.currency)}</small>
                                <span>{currencyFormat(totalPrice.amount || 0, displayCurrency)}</span>

                                <span className="ml-2 text-lg font-normal text-gray-500">/ {billingType}</span>
                            </p>
                        </div>
                    </div>
                )}
            </MobileSection.Padding>
        </MobileSection.Item>
    );
});
