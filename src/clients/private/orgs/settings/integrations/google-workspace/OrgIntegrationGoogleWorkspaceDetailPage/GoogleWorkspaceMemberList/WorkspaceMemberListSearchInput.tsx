import {memo} from 'react';
import {Search} from 'lucide-react';

interface WorkspaceMemberListSearchInputProps {
    onChange: (keyword: string) => any;
}

export const WorkspaceMemberListSearchInput = memo((props: WorkspaceMemberListSearchInputProps) => {
    const {onChange} = props;

    return (
        <div className="relative block">
            <input
                type="text"
                className="input input-sm input-bordered pl-[30px]"
                placeholder="검색어를 입력하세요"
                onChange={(e) => onChange(e.target.value.trim())}
            />
            <span className="absolute left-0 top-0 bottom-0 p-2 text-gray-400 hover:text-gray-600 transition-all">
                <Search />
            </span>
        </div>
    );
});
WorkspaceMemberListSearchInput.displayName = 'WorkspaceMemberListSearchInput';
