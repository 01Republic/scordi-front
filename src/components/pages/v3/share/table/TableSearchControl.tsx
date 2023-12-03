import {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {AiOutlineSearch} from '@react-icons/all-files/ai/AiOutlineSearch';

interface TableSearchControlProps extends WithChildren {
    totalItemCount: number;
    onSearch: (keyword: string) => any;
}

export const TableSearchControl = memo((props: TableSearchControlProps) => {
    const {totalItemCount, onSearch} = props;

    return (
        <div className="flex justify-between items-center">
            <div>
                <p className="text-16 font-semibold">
                    <span>전체</span>
                    <span className="ml-2 text-scordi">{totalItemCount}</span>
                </p>
            </div>

            <div className="relative">
                <label className="text-gray-400 absolute top-0 bottom-0 left-1.5 h-full w-6 flex items-center justify-center">
                    <AiOutlineSearch />
                </label>
                <input
                    type="text"
                    className="input input-bordered pl-8"
                    placeholder="검색"
                    onChange={(e) => onSearch(e.target.value)}
                />
            </div>
        </div>
    );
});
