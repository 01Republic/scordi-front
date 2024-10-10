import {WithChildren} from '^types/global.type';
import {memo} from 'react';

interface TeamStatCardProps extends WithChildren {
    Icon: () => JSX.Element;
    count: string;
    title: string;
}

export const TeamStatCard = memo((props: TeamStatCardProps) => {
    const {count, title, Icon} = props;

    return (
        <div className="flex items-center justify-between border rounded-lg text-sm bg-white h-15 py-2 px-3">
            <div className="flex flex-col gap-[2px]">
                <div className="w-5 h-5">
                    <Icon />
                </div>
                <p>{title}</p>
            </div>
            <div className="text-24 font-bold">{count}</div>
        </div>
    );
});
