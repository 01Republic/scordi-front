import React, {memo, useEffect, useState} from 'react';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {BillingHistoryListView} from '^v3/share/BillingHistoryListView';
import {getBillingHistories} from '^api/billing.api';
import {useRecoilValue} from 'recoil';
import {subscriptionIdParamState} from '^atoms/common';
import {AppTypeQuery} from '^v3/V3OrgAppShowPage/atom';
import {useRouter} from 'next/router';
import {BillingHistoryDto, GetBillingHistoriesParams} from '^types/billing.type';
import {Paginated} from '^types/utils/paginated.dto';
import {BillingHistorySummary} from '^v3/share/BillingHistoryListView/BillingHistorySummary';
import {useBillingHistoriesV3} from '^hooks/useBillingHistories';

export const BillingHistoryContentPanel = memo(() => {
    const {result} = useBillingHistoriesV3();

    return (
        <MobileSection.Item>
            <MobileSection.Padding>
                <BillingHistorySummary billingHistories={result.items} />
                <BillingHistoryListView billingHistories={result.items} />
            </MobileSection.Padding>
        </MobileSection.Item>
    );
});
