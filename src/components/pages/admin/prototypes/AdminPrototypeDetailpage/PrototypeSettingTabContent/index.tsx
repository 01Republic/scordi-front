import {Fragment, memo, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {adminPrototypeDetail} from '^components/pages/admin/prototypes/AdminPrototypeDetailpage';
import {
    MenuContentForEditPlanCycle,
    MenuContentForEditPrototype,
    MenuContentForIntroduce,
    PrototypeSettingSubmenuPanel,
    SubmenuGroup,
} from '^components/pages/OrgProtoDetailPage/TabContents/Setting';
import {EditPrototypeMenuContent} from '^components/pages/admin/prototypes/AdminPrototypeDetailpage/PrototypeSettingTabContent/MenuContents/EditPrototype';

const menuGroups: SubmenuGroup[] = [
    {
        name: '설정',
        items: [
            {name: '기본 정보', Component: EditPrototypeMenuContent},
            {name: '소개 작성', Component: MenuContentForIntroduce},
            {name: '플랜-주기', Component: MenuContentForEditPlanCycle},
            {name: '카테고리', Component: Fragment},
            {name: '공개 상태', Component: Fragment},
        ],
    },
    {
        name: '운영',
        items: [
            {name: '생성된 구독 관리', Component: Fragment},
            {name: '크롤링 이력 통합 조회', Component: Fragment},
        ],
    },
];

export const PrototypeSettingTabContent = memo(() => {
    const prototype = useRecoilValue(adminPrototypeDetail);

    if (!prototype) return <></>;

    const [menuIndex, setMenuIndex] = useState<[number, number]>([0, 0]);

    const [groupIndex, itemIndex] = menuIndex;
    const currentGroup = menuGroups[groupIndex];
    const DisplayingComponent = currentGroup.items[itemIndex].Component;

    return (
        <div className="bs-container">
            <div className="bs-row gap-8">
                {/* Left Col */}
                <div className="bs-col-12 sm:w-auto px-0">
                    <PrototypeSettingSubmenuPanel
                        groups={menuGroups}
                        groupIndex={groupIndex}
                        itemIndex={itemIndex}
                        onClick={(i, j) => setMenuIndex([i, j])}
                    />
                </div>

                {/* Right Col */}
                <div className="bs-col-12 sm:bs-col px-0">
                    <DisplayingComponent />
                </div>
            </div>
        </div>
    );
});
