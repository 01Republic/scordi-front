import React, {memo} from 'react';
import {Search} from 'lucide-react';

interface SearchVendorCompanyInputProps {
    onSearch: (keyword?: string) => any;
}

export const SearchVendorCompanyInput = memo(function SearchVendorCompanyInput(props: SearchVendorCompanyInputProps) {
    const {onSearch} = props;

    return (
        <div>
            <label className="relative">
                <div className="absolute bottom-0 left-0 w-6 h-[48px] z-[1] flex items-center justify-center">
                    <Search className="text-gray-300" />
                </div>
                <input
                    className="input input-underline w-full pl-8"
                    onChange={(e) => onSearch(e.target.value)}
                    placeholder="파트너사 이름을 입력해주세요."
                />
                <span />
            </label>
        </div>
    );
});
