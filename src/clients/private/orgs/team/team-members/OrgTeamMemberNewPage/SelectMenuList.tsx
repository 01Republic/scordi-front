import React, {memo} from 'react';
import {components, MenuListProps} from 'react-select';
import {Option} from '^components/util/react-select';
import {CgSpinner} from 'react-icons/cg';

interface SelectMenuListProps extends MenuListProps<Option, false> {}

export const SelectMenuList = memo((props: SelectMenuListProps) => {
    const {children, selectProps} = props;
    const {isLoading} = selectProps;

    return (
        <components.MenuList {...props}>
            <div>
                <div className="px-[8px] text-12 text-gray-500">
                    <div className="py-1.5 px-2 flex items-center justify-between">
                        <div>선택 또는 생성</div>
                        <div>
                            {isLoading && (
                                <div className="animate-spin">
                                    <CgSpinner fontSize={12} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div>{children}</div>
            </div>
        </components.MenuList>
    );
});
SelectMenuList.displayName = 'SelectMenuList';
