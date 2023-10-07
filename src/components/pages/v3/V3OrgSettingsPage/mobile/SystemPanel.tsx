import React, {memo} from 'react';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {MobileInfoListItem} from '../../share/MobileInfoList/Item';
import {MobileInfoList} from '../../share/MobileInfoList';
import {BiChevronRight} from 'react-icons/bi';
import {toast} from 'react-toastify';

export const SystemPanel = memo(() => {
    return (
        <MobileSection.Item>
            <MobileSection.Padding>
                <h1 className="text-lg">시스템 및 고객지원</h1>

                <MobileInfoList>
                    <MobileInfoListItem label="자주 묻는 질문" onClick={() => toast.info('준비 중입니다.')}>
                        <BiChevronRight size={28} />
                    </MobileInfoListItem>
                    <MobileInfoListItem label="1:1 문의" onClick={() => toast.info('준비 중입니다.')}>
                        <BiChevronRight size={28} />
                    </MobileInfoListItem>
                </MobileInfoList>
            </MobileSection.Padding>
        </MobileSection.Item>
    );
});
