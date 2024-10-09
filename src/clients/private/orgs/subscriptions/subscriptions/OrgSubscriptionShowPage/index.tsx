import React, {memo, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {ShowPage} from '^clients/private/_components/rest-pages/ShowPage';
import {MainTabButtons} from '^clients/private/_layouts/_shared/MainTabButton';

export const OrgSubscriptionShowPage = memo(function OrgSubscriptionShowPage() {
    const orgId = useRecoilValue(orgIdParamState);
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    return (
        <ShowPage>
            <header className="flex items-center justify-between pt-8 pb-4">
                <div className="flex-auto"></div>
            </header>

            <main className="pt-4">
                <div className="flex items-center justify-between border-b border-gray-300">
                    <MainTabButtons
                        borderless
                        activeTabIndex={activeTabIndex}
                        setActiveTabIndex={setActiveTabIndex}
                        tabs={['정보', '결제', '멤버']}
                    />

                    {/* right side */}
                    <div>
                        <div></div>
                    </div>
                </div>
            </main>
        </ShowPage>
    );
});
