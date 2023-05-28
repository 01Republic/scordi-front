import {InputHTMLAttributes, memo} from 'react';
import {AiOutlineSearch} from '@react-icons/all-files/ai/AiOutlineSearch';

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
    onSearch: (keyword: string) => any;
}

export const SearchInput = memo((props: SearchInputProps) => {
    const {onSearch, ...attr} = props;

    return (
        <div className="relative">
            <label className="text-gray-400 absolute top-0 bottom-0 left-1.5 h-full w-6 flex items-center justify-center">
                <AiOutlineSearch />
            </label>
            <input
                type="text"
                className="input input-bordered pl-8"
                placeholder="검색"
                onKeyUp={(e) => onSearch(e.target.value)}
                {...attr}
            />
        </div>
    );
});
