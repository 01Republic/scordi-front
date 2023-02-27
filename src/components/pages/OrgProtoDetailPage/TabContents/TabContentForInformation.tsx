import {memo} from 'react';
import {InfoPanel} from './information/InfoPanel';
import {ConnectPanel} from './information/ConnectPanel';
import {DisConnectPanel} from './information/DisConnectPanel';

export const TabContentForInformation = memo(() => {
    return (
        <div className="bs-container">
            <div className="bs-row gap-8">
                {/* Left Col */}
                <div className="bs-col-12 sm:bs-col px-0">
                    <InfoPanel />
                </div>

                {/* Right Col */}
                <div className="bs-col-12 sm:bs-col-5 px-0">
                    <ConnectPanel />
                    <DisConnectPanel />
                </div>
            </div>
        </div>
    );
});
