import React, {memo} from 'react';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {MobileInfoListItem} from '../../share/MobileInfoList/Item';
import {MobileInfoList} from '../../share/MobileInfoList';
import {useToast} from '^hooks/useToast';
import {ChevronRight} from 'lucide-react';

export const InformationPanel = memo(() => {
    const {toast} = useToast();

    return (
        <MobileSection.Item>
            <MobileSection.Padding>
                <h1 className="text-lg">안내 및 정보</h1>

                <MobileInfoList>
                    <MobileInfoListItem label="알림설정" onClick={() => toast.info('준비중입니다.')}>
                        <ChevronRight size={28} />
                    </MobileInfoListItem>
                    <MobileInfoListItem label="이용약관" onClick={() => toast.info('준비중입니다.')}>
                        <ChevronRight size={28} />
                    </MobileInfoListItem>
                    <MobileInfoListItem label="버전정보">1.0.0</MobileInfoListItem>
                </MobileInfoList>
            </MobileSection.Padding>
        </MobileSection.Item>
    );
});
