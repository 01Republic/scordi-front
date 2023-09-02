import React, {memo} from 'react';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {ContentEmpty} from '^v3/V3OrgHomePage/mobile/ContentEmpty';

export const SubscriptionsPanel = memo(() => {
    return (
        <MobileSection.Item>
            <MobileSection.Padding>
                <MobileSection.Heading title="이용중인 앱">
                    <div className="text-sm text-gray-500">
                        <div>앱 없음</div>
                    </div>
                </MobileSection.Heading>

                <ContentEmpty text="등록된 앱이 없어요" subtext="눌러서 앱 추가" onClick={console.log} />
            </MobileSection.Padding>
        </MobileSection.Item>
    );
});
