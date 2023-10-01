import React, {memo} from 'react';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {InvoiceAccountAddingAlertBanner} from '^v3/V3OrgHomePage/InvoiceAccountAddingAlert';
import {MobileInfoList} from '^v3/share/MobileInfoList';
import {MonthHandler} from './SummaryHeader/MonthHandler';
import {MonthlyTotal} from './SummaryHeader/MonthlyTotal';
import {CalendarOpenButton} from './SummaryHeader/CalendarOpenButton';
import {MonthlyPaidAmount} from './SummaryHeader/MonthlyPaidAmount';
import {MonthlyRemainAmount} from './SummaryHeader/MonthlyRemainAmount';

export const SummaryHeaderPanel = memo(() => {
    return (
        <MobileSection.Item>
            <InvoiceAccountAddingAlertBanner />

            <MobileSection.Padding>
                <div className="w-full h-[40px]" />
                <MonthHandler />

                <div className="flex justify-between items-center mb-6">
                    <MonthlyTotal />
                    <CalendarOpenButton />
                </div>

                <MobileInfoList>
                    <MonthlyPaidAmount />
                    <MonthlyRemainAmount />
                </MobileInfoList>
            </MobileSection.Padding>
        </MobileSection.Item>
    );
});
