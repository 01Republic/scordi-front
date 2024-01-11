import {memo} from 'react';
import {Dropdown} from '^v3/share/Dropdown';
import {IoIosMore} from 'react-icons/io';
import {MoreDropdownListItem} from '^v3/share/table/columns/SelectColumn/OptionItem/MoreDropdown/ListItem';
import {FaRegTrashAlt, FaSync} from 'react-icons/fa';

// settings connect 페이지에서만 사용되는
// more dropdown component.

interface MoreDropdownProps {
    onSync: () => void;
    onDelete: () => void;
    className?: string;
}

export const MoreDropdown = memo((props: MoreDropdownProps) => {
    const {onSync, onDelete, className} = props;

    return (
        <Dropdown
            Trigger={() => (
                <div>
                    <button className={`btn btn-xs btn-ghost btn-square !border-none hover:bg-gray-200 ${className}`}>
                        <IoIosMore size={16} />
                    </button>
                </div>
            )}
        >
            <ul className="p-2 text-sm shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                <MoreDropdownListItem onClick={onSync}>
                    <div className="flex items-center gap-3 w-full">
                        <FaSync size={12} />
                        <p>동기화</p>
                    </div>
                </MoreDropdownListItem>
                <MoreDropdownListItem onClick={onDelete}>
                    <div className="flex items-center gap-3 w-full">
                        <FaRegTrashAlt />
                        <p>삭제</p>
                    </div>
                </MoreDropdownListItem>
            </ul>
        </Dropdown>
    );
});
