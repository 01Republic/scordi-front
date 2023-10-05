import React, {memo} from 'react';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {MobileInfoListItem} from '../../share/MobileInfoList/Item';
import {MobileInfoList} from '../../share/MobileInfoList';
import {useRouter} from 'next/router';
import {Icon} from '^components/Icon';

export const InformationPanel = memo(() => {
    const router = useRouter();

    return (
        <MobileSection.Item>
            <MobileSection.Padding>
                <h1 className="text-lg">안내 및 정보</h1>

                <MobileInfoList>
                    <MobileInfoListItem
                        label="알림설정"
                        onClick={() => {
                            router.push('/');
                        }}
                    >
                        <Icon.ChevronRight />
                    </MobileInfoListItem>
                    <MobileInfoListItem
                        label="이용약관"
                        onClick={() => {
                            router.push('/');
                        }}
                    >
                        <Icon.ChevronRight />
                    </MobileInfoListItem>
                    <MobileInfoListItem
                        label="버전정보"
                        onClick={() => {
                            router.push('/');
                        }}
                    >
                        1.0.0
                    </MobileInfoListItem>
                </MobileInfoList>
            </MobileSection.Padding>
        </MobileSection.Item>
    );
});
