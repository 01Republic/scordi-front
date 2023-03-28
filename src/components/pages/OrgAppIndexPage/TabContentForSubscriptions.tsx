import React, {memo} from 'react';
import {ContentPanel} from '^layouts/ContentLayout';
import {ApplicationListDesktop} from '^components/pages/OrgAppIndexPage/ApplicationList.desktop';

export const TabContentForSubscriptions = memo(() => {
    return (
        <div className="bs-container">
            <div className="bs-row gap-8">
                {/* Left Col */}
                <div className="bs-col-12 sm:bs-col px-0">
                    <ContentPanel bodyWrap={false}>
                        <ApplicationListDesktop />
                    </ContentPanel>
                </div>

                {/* Right Col */}
                {/*<div className="bs-col-12 sm:bs-col-4 px-0">*/}
                {/*    <ContentPanel />*/}
                {/*    <ContentPanel />*/}
                {/*</div>*/}
            </div>
        </div>
    );
});
