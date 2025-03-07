import React, {memo} from 'react';
import {Dropdown} from '^v3/share/Dropdown';
import {MoreDropdownListItem} from '^v3/share/table/columns/SelectColumn/OptionItem/MoreDropdown/ListItem';
import {ReactComponentLike} from 'prop-types';
import {Placement} from '@popperjs/core';
import {Loader, MoreHorizontal, RotateCw, X} from 'lucide-react';

// settings connect 페이지에서만 사용되는
// more dropdown component.

interface MoreDropdownProps {
    onSync: (action: {hide: () => any}) => void;
    onDelete?: () => void;
    isSyncLoading?: boolean;
    isDisConnectLoading?: boolean;
    className?: string;
    Trigger?: () => JSX.Element;
    Profile?: ReactComponentLike;
    placement?: Placement;
}

export const MoreDropdown = memo((props: MoreDropdownProps) => {
    const {onSync, onDelete, placement, isSyncLoading, isDisConnectLoading, className, Trigger, Profile} = props;

    return (
        <Dropdown
            placement={placement}
            Trigger={
                Trigger ||
                (() => (
                    <div>
                        <button
                            className={`btn btn-xs btn-ghost btn-square !border-none hover:bg-gray-200 ${className}`}
                        >
                            <MoreHorizontal size={16} />
                        </button>
                    </div>
                ))
            }
            Content={(action) => {
                return (
                    <ul className="p-2 text-sm shadow-xl menu dropdown-content z-[1] bg-base-100 rounded-box">
                        {Profile && <Profile />}

                        <MoreDropdownListItem onClick={() => onSync(action)}>
                            <div className={`${isSyncLoading && 'btn-disabled'} flex items-center gap-3 w-full`}>
                                {isSyncLoading ? <Loader size={20} className="animate-spin" /> : <RotateCw size={12} />}
                                <p>동기화</p>
                            </div>
                        </MoreDropdownListItem>

                        {onDelete && (
                            <MoreDropdownListItem
                                onClick={() => {
                                    action.hide();
                                    onDelete();
                                }}
                            >
                                <div
                                    className={`${
                                        isDisConnectLoading && 'btn-disabled'
                                    } flex items-center gap-3 w-full`}
                                >
                                    {isDisConnectLoading ? <Loader size={20} className="animate-spin" /> : <X />}
                                    <p>연동 해제하기</p>
                                </div>
                            </MoreDropdownListItem>
                        )}
                    </ul>
                );
            }}
        />
    );
});
