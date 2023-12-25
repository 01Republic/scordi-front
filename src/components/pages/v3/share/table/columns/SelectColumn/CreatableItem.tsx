import {memo} from 'react';
import {WithChildren} from '^types/global.type';

interface CreateItemProps extends WithChildren {
    onClick: () => any;
}

export const CreatableItem = memo((props: CreateItemProps) => {
    const {onClick, children} = props;

    return (
        <li className="cursor-pointer flex px-[4px] group">
            <div
                onClick={onClick}
                className={`text-[12px] flex rounded-[4px] items-center pt-[2px] px-[10px] pb-0 min-h-[28px] group-hover:bg-gray-300 group-hover:bg-opacity-30`}
            >
                생성: {children}
            </div>
        </li>
    );
});
CreatableItem.displayName = 'CreateItem';
