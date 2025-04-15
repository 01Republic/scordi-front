import {memo} from 'react';

interface ActiveMemberFilterProps {
    defaultChecked?: boolean;
    onChange: (checked?: boolean) => any;
}

export const ActiveMemberFilter = memo((props: ActiveMemberFilterProps) => {
    const {defaultChecked, onChange} = props;

    return (
        <label className="flex items-center gap-1.5 h-8 px-2 border rounded-lg bg-white hover:bg-gray-500/10 transiation-all cursor-pointer checked:bg-black">
            <input
                type="checkbox"
                className=""
                defaultChecked={defaultChecked}
                onChange={(e) => {
                    e.target.checked ? onChange(false) : onChange(undefined);
                }}
            />
            <span className="text-12">활성 멤버만 보기</span>
        </label>
    );
});
ActiveMemberFilter.displayName = 'ActiveMemberFilter';
