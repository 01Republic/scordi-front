import React, {memo} from 'react';
import {FaSearch} from 'react-icons/fa';

interface SearchVendorManagerInputProps {
    onSearch: (keyword?: string) => any;
}

export const SearchVendorManagerInput = memo(function SearchVendorManagerInput(props: SearchVendorManagerInputProps) {
    const {onSearch} = props;

    return (
        <div>
            <label className="relative">
                <div className="absolute bottom-0 left-0 w-6 h-[48px] z-[1] flex items-center justify-center">
                    <FaSearch className="text-gray-300" />
                </div>
                <input
                    className="input input-underline w-full pl-8"
                    onChange={(e) => onSearch(e.target.value)}
                    placeholder="이름으로 찾거나 추가하기"
                />
                <span />
            </label>
        </div>
    );
});
