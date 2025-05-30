import {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {Search} from 'lucide-react';

interface TableSearchControlProps extends WithChildren {
    totalItemCount: number;
    onSearch: (keyword: string) => any;
    size?: 'sm' | 'md' | 'lg';
    placeholder?: string;
}

export const TableSearchControl = memo((props: TableSearchControlProps) => {
    const {totalItemCount, onSearch, size = 'md', placeholder = '검색', children} = props;

    return (
        <div className="flex justify-between items-center">
            <div>
                <p className="text-16 font-semibold">
                    <span>전체</span>
                    <span className="ml-2 text-scordi">{totalItemCount}</span>
                </p>
            </div>

            {children}

            <div className="relative">
                <label className="text-gray-400 absolute top-0 bottom-0 left-1.5 h-full w-6 flex items-center justify-center">
                    <Search />
                </label>
                <input
                    type="text"
                    className={`input input-${size} input-bordered pl-8`}
                    placeholder={placeholder}
                    onChange={(e) => onSearch(e.target.value)}
                />
            </div>
        </div>
    );
});
