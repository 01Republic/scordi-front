import React, {memo} from 'react';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {MobileInfoListItem} from '../../share/MobileInfoList/Item';
import {MobileInfoList} from '../../share/MobileInfoList';
import {useRouter} from 'next/router';
import {Icon} from '^components/Icon';

export const SystemPanel = memo(() => {
    const router = useRouter();

    return (
        <MobileSection.Item>
            <MobileSection.Padding>
                <h1 className="text-lg">시스템 및 고객지원</h1>

                <MobileInfoList>
                    <MobileInfoListItem
                        label="자주 묻는 질문"
                        onClick={() => {
                            router.push('/');
                        }}
                    >
                        <Icon.ChevronRight />
                    </MobileInfoListItem>
                    <MobileInfoListItem
                        label="1:1 문의"
                        onClick={() => {
                            router.push('/');
                        }}
                    >
                        <Icon.ChevronRight />
                    </MobileInfoListItem>
                </MobileInfoList>
            </MobileSection.Padding>
        </MobileSection.Item>
    );
});
