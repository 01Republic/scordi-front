import React, {memo} from 'react';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {MobileInfoListItem} from '../../share/MobileInfoList/Item';
import {MobileInfoList} from '../../share/MobileInfoList';

export const MembershipPanel = memo(() => {
    return (
        <MobileSection.Item>
            <MobileSection.Padding>
                <h1 className="text-lg">결제관리</h1>

                <MobileInfoList>
                    <MobileInfoListItem label="구독중인 플랜"></MobileInfoListItem>
                    <MobileInfoListItem label="청구메일"></MobileInfoListItem>
                    <MobileInfoListItem label="결제수단"></MobileInfoListItem>
                </MobileInfoList>
            </MobileSection.Padding>
        </MobileSection.Item>
    );
});
