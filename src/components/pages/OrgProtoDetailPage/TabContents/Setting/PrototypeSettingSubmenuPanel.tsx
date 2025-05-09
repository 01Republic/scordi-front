import {ExoticComponent, Fragment, memo, ReactNode} from 'react';

type SubmenuItem = {
    name: string;
    Component: ExoticComponent<{children?: ReactNode}>;
};

export type SubmenuGroup = {
    name: string;
    items: SubmenuItem[];
};

interface PrototypeSettingSubmenuPanelProps {
    groups: SubmenuGroup[];
    groupIndex: number;
    itemIndex: number;
    onClick: (groupIdx: number, itemIdx: number) => any;
}

export const PrototypeSettingSubmenuPanel = memo((props: PrototypeSettingSubmenuPanelProps) => {
    const {groups, groupIndex, itemIndex, onClick} = props;

    return (
        <ul className="menu menu-compact bg-base-100 w-56 rounded border shadow sm:sticky sm:top-[80px]">
            {groups.map((group, i) => (
                <Fragment key={i}>
                    {/* Group name */}
                    <li className="menu-title font-semibold px-4 pt-3">{group.name}</li>

                    {/* Each menu of this group */}
                    {group.items.map((menu, j) => (
                        <li key={j} className={`${groupIndex === i && itemIndex === j && 'bordered'}`}>
                            <a onClick={() => onClick(i, j)}>
                                <span className="text-gray-500">{menu.name}</span>
                            </a>
                        </li>
                    ))}
                </Fragment>
            ))}
        </ul>
    );
});
