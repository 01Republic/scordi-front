import React, {memo} from 'react';
import {MobileInfoListItem} from '^v3/share/MobileInfoList/Item';
import {SourceAccount} from './SourceAccount';
import {FiChevronRight} from '^components/react-icons';

export const ListItemForSourceAccount = memo(function ListItemForSourceAccount() {
    return (
        <MobileInfoListItem label="청구메일주소">
            <div className="flex items-center gap-2 cursor-pointer text-gray-500 hover:text-gray-700 transition-all">
                <SourceAccount />
                <FiChevronRight className="text-black" />
            </div>
        </MobileInfoListItem>
    );
});
