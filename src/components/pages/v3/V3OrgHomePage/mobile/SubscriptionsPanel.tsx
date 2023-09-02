import React, {memo, useState} from 'react';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {ContentEmpty} from '^v3/V3OrgHomePage/mobile/ContentEmpty';

export const SubscriptionsPanel = memo(() => {
    const [subscriptions, setSubscriptions] = useState([]);
    const length = subscriptions.length;

    return (
        <MobileSection.Item>
            <MobileSection.Padding>
                <MobileSection.Heading title={length ? `${length}개의 구독중인 앱` : '이용중인 앱'}>
                    <div className="text-sm text-gray-500">
                        <div>{length ? '앱 추가' : '앱 없음'}</div>
                    </div>
                </MobileSection.Heading>

                {!length && <ContentEmpty text="등록된 앱이 없어요" subtext="눌러서 앱 추가" onClick={console.log} />}
            </MobileSection.Padding>
        </MobileSection.Item>
    );
});
