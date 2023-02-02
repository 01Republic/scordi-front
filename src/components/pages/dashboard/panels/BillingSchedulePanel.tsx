import {memo} from 'react';
import {ContentPanel, ContentPanelBody, ContentPanelMiniTitle, ContentPanelTitle} from '^layouts/ContentLayout';
import {BillingCalendarDesktop} from '../BillingCalendar.desktop';
import {BillingScheduleListPanel} from '^components/pages/dashboard/panels/BillingScheduleListPanel';

export const BillingSchedulePanel = memo(() => {
    return (
        <ContentPanel title="Billing Schedule" bodyWrap={false}>
            <div className="bs-container">
                <div className="bs-row gap-0">
                    <div className="bs-col-12 sm:bs-col px-0 border-r">
                        <ContentPanelBody>
                            <BillingCalendarDesktop />
                        </ContentPanelBody>
                    </div>

                    <div className="bs-col-12 sm:bs-col-5 px-0">
                        <BillingScheduleListPanel />
                    </div>
                </div>
            </div>
        </ContentPanel>
    );
});
