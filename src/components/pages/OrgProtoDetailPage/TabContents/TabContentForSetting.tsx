import {Fragment, memo, useEffect, useState} from 'react';
import {
    ContentForm,
    ContentPanel,
    ContentPanelInput,
    ContentPanelItem,
    ContentPanelItemText,
    ContentPanelItemTitle,
    ContentPanelList,
} from '^layouts/ContentLayout';
import {TextInput} from '^components/TextInput';
import {useForm} from 'react-hook-form';
import {
    PrototypeConnectMethod,
    UpdateApplicationPrototypeRequestDto as UpdateDto,
} from '^types/applicationPrototype.type';
import {useApplicationPrototype} from '^hooks/useApplicationPrototypes';
import {atom, useRecoilState, useRecoilValue} from 'recoil';
import {MenuContentForEditPrototype} from '^components/pages/OrgProtoDetailPage/TabContents/Setting/MenuContentForEditPrototype';

export const prototypeSettingSubMenuIndex = atom<[number, number]>({
    key: 'Prototypes/setting/subMenu/NavTabIndex',
    default: [0, 0],
});

const menuGroups = [
    {
        title: '설정',
        items: [
            {label: '기본 정보 관리', Component: MenuContentForEditPrototype},
            {label: '플랜 & 주기 관리', Component: MenuContentForEditPrototype},
            {label: '카테고리 관리', Component: MenuContentForEditPrototype},
        ],
    },
    {
        title: '운영',
        items: [{label: '생성된 구독 관리', Component: Fragment}],
    },
];

export const TabContentForSetting = memo(() => {
    const [proto, mutation] = useApplicationPrototype();
    const form = useForm<UpdateDto>();
    const [menuIndex, setMenuIndex] = useRecoilState(prototypeSettingSubMenuIndex);

    const [groupIndex, menuItemIndex] = menuIndex;
    const currentGroup = menuGroups[groupIndex];
    const DisplayingComponent = currentGroup.items[menuItemIndex].Component;

    return (
        <div className="bs-container">
            <div className="bs-row gap-8">
                {/* Left Col */}
                <div className="bs-col-12 sm:w-auto px-0">
                    <ul className="menu bg-base-100 w-56 rounded border shadow">
                        {menuGroups.map((group, i) => (
                            <Fragment key={i}>
                                <li className="menu-title">
                                    <span>{group.title}</span>
                                </li>
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
