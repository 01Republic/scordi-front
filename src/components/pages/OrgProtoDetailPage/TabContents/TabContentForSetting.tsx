import {Fragment, memo, useState} from 'react';
import {MenuContentForEditPrototype, MenuContentForIntroduce} from './Setting';

const menuGroups = [
    {
        title: '설정',
        items: [
            {label: '기본 정보', Component: MenuContentForEditPrototype},
            {label: '소개 작성', Component: MenuContentForIntroduce},
            {label: '플랜-주기', Component: Fragment},
            {label: '카테고리', Component: Fragment},
            {label: '공개 상태', Component: Fragment},
        ],
    },
    {
        title: '운영',
        items: [{label: '생성된 구독 관리', Component: Fragment}],
    },
];

export const TabContentForSetting = memo(() => {
    const [menuIndex, setMenuIndex] = useState<[number, number]>([0, 0]);

    const [groupIndex, menuItemIndex] = menuIndex;
    const currentGroup = menuGroups[groupIndex];
    const DisplayingComponent = currentGroup.items[menuItemIndex].Component;

    return (
        <div className="bs-container">
            <div className="bs-row gap-8">
                {/* Left Col */}
                <div className="bs-col-12 sm:w-auto px-0">
                    <ul className="menu menu-compact bg-base-100 w-56 rounded border shadow sm:sticky sm:top-[80px]">
                        {menuGroups.map((group, i) => (
                            <Fragment key={i}>
                                <li className="menu-title font-semibold px-4 pt-3">{group.title}</li>
                                {group.items.map((menu, j) => (
                                    <li key={j} className={`${groupIndex === i && menuItemIndex === j && 'bordered'}`}>
                                        <a onClick={() => setMenuIndex([i, j])}>
                                            <span className="text-gray-500">{menu.label}</span>
                                        </a>
                                    </li>
                                ))}
                            </Fragment>
                        ))}
                    </ul>
                </div>

                {/* Right Col */}
                <div className="bs-col-12 sm:bs-col px-0">
                    <DisplayingComponent />
                </div>
            </div>
        </div>
    );
});
