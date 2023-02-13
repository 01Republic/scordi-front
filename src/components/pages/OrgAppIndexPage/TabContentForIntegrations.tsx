import React, {memo} from 'react';
import {ContentPanel} from '^layouts/ContentLayout';
import {PrototypeSearchPanel} from './PrototypeSearchPanel';
import {PrototypeAddFormPanel} from '^components/pages/OrgAppIndexPage/PrototypeAddFormPanel';

export const TabContentForIntegrations = memo(() => {
    return (
        <div className="bs-container">
            <div className="bs-row gap-8">
                {/* Left Col */}
                <div className="bs-col-12 sm:bs-col px-0">
                    <PrototypeSearchPanel />
                </div>

                {/* Right Col */}
                <div className="bs-col-12 sm:bs-col-4 px-0 hidden">
                    <ContentPanel />
                    <PrototypeAddFormPanel />
                </div>
            </div>
        </div>
    );
});
