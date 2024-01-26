import React, {memo} from 'react';
import {Dropdown} from '^v3/share/Dropdown';
import {IoMdMore} from 'react-icons/io';
import {MoreDropdownListItem} from '^v3/share/table/columns/SelectColumn/OptionItem/MoreDropdown/ListItem';
import {FaRegTrashAlt, FaSync, FaTimes} from 'react-icons/fa';

import {AiOutlineDisconnect} from 'react-icons/ai';
import {CgSpinner} from 'react-icons/cg';

// settings connect 페이지에서만 사용되는
// more dropdown component.

interface MoreDropdownProps {
    onSync: () => void;
    onDelete: () => void;
    isSyncLoading?: boolean;
    isDisConnectLoading?: boolean;
    className?: string;
}

export const MoreDropdown = memo((props: MoreDropdownProps) => {
    const {onSync, onDelete, isSyncLoading, isDisConnectLoading, className} = props;

    return (
        <Dropdown
            Trigger={() => (
                <div>
                    <button className={`btn btn-xs btn-ghost btn-square !border-none hover:bg-gray-200 ${className}`}>
                        <IoMdMore size={16} />
                    </button>
                </div>
            )}
        >
            <ul className="p-2 text-sm shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                <MoreDropdownListItem onClick={onSync}>
                    <div className={`${isSyncLoading && 'btn-disabled'} flex items-center gap-3 w-full`}>
                        {isSyncLoading ? <CgSpinner size={20} className="animate-spin" /> : <FaSync size={12} />}
                        <p>동기화</p>
                    </div>
                </MoreDropdownListItem>
                <MoreDropdownListItem onClick={onDelete}>
                    <div className={`${isDisConnectLoading && 'btn-disabled'} flex items-center gap-3 w-full`}>
                        {isDisConnectLoading ? <CgSpinner size={20} className="animate-spin" /> : <FaTimes />}
                        <p>연동 해제하기</p>
                    </div>
                </MoreDropdownListItem>
            </ul>
        </Dropdown>
    );
});
