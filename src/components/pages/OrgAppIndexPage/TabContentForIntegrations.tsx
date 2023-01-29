import React, {memo} from 'react';
import {ContentPanel} from '^layouts/ContentLayout';
import {PrototypeSearchPanel} from './PrototypeSearchPanel';

export const TabContentForIntegrations = memo(() => {
    return (
        <div className="bs-container">
            <div className="bs-row gap-8">
                {/* Left Col */}
                <div className="bs-col-12 sm:bs-col px-0">
                    <PrototypeSearchPanel />
                </div>

                {/* Right Col */}
                <div className="bs-col-12 sm:bs-col-4 px-0">
                    <ContentPanel />
                    <ContentPanel title={'직접추가'} />
                </div>
            </div>
        </div>
    );
});
