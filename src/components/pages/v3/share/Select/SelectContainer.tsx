import {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {BiChevronDown} from '@react-icons/all-files/bi/BiChevronDown';

export interface SelectContainerProps extends WithChildren {
    currentVal: string;
    isNotSelected: boolean;
    widthClass?: string;
}

export const SelectContainer = memo((props: SelectContainerProps) => {
    const {isNotSelected, currentVal, widthClass = 'w-52', children} = props;

    return (
        <div className="dropdown">
            <label tabIndex={0} className={`btn btn !bg-base-100 items-center justify-between ${widthClass}`}>
                <span className={`text-sm normal-case ${isNotSelected ? 'text-gray-300' : 'text-gray-700'}`}>
                    {currentVal}
                </span>
                <BiChevronDown />
            </label>
            <ul
                tabIndex={0}
                className={`dropdown-content menu menu-compact p-2 rounded-lg shadow-lg bg-base-100 ${widthClass}`}
            >
                {children}
            </ul>
        </div>
    );
});
