import React, {memo} from 'react';
import {MobileSection} from '^v3/share/sections/MobileSection';

export const BillingHistoryListPanel = memo(() => {
    return (
        <MobileSection.Item>
            <MobileSection.Padding>
                <div>Summary</div>
                <div>BillingHistory List</div>
            </MobileSection.Padding>
        </MobileSection.Item>
    );
});
