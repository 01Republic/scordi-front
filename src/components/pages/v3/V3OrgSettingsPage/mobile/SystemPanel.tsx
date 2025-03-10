import React, {memo} from 'react';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {MobileInfoListItem} from '../../share/MobileInfoList/Item';
import {MobileInfoList} from '../../share/MobileInfoList';
import {useToast} from '^hooks/useToast';
import {useCurrentUser} from '^models/User/hook';
import {ChevronRight} from 'lucide-react';

export const SystemPanel = memo(() => {
    const {toast} = useToast();
    const {logout} = useCurrentUser();

    return (
        <MobileSection.Item>
            <MobileSection.Padding>
                <h1 className="text-lg">시스템 및 고객지원</h1>

                <MobileInfoList>
                    <MobileInfoListItem label="자주 묻는 질문" onClick={() => toast.info('준비중입니다.')}>
                        <ChevronRight size={28} />
                    </MobileInfoListItem>
                    <MobileInfoListItem label="1:1 문의" onClick={() => toast.info('준비중입니다.')}>
                        <ChevronRight size={28} />
                    </MobileInfoListItem>
                    <MobileInfoListItem label="로그아웃" onClick={() => logout()}>
                        <ChevronRight size={28} />
                    </MobileInfoListItem>
                </MobileInfoList>
            </MobileSection.Padding>
        </MobileSection.Item>
    );
});
