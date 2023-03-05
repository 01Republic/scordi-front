import {Fragment, memo, useState} from 'react';
import {DangerPanel} from './Spend/DangerPanel';
import {SettingsPanel} from './Spend/SettingsPanel';
import {SubmenuGroup} from '^components/pages/OrgProtoDetailPage/TabContents/Setting';
import {ApplicationSettingSubmenuPanel} from '^components/pages/ApplicationDetailPage/TabContents/Setting';

const menuGroups: SubmenuGroup[] = [
    {
        name: '설정',
        items: [
            {name: '연동 정보', Component: Fragment},
            {name: '조직 정보', Component: Fragment},
            {name: '구독 정보', Component: Fragment},
            {name: '구성원 정보', Component: Fragment},
        ],
    },
];

export const TabContentForSettings = memo(() => {
    const [menuIndex, setMenuIndex] = useState<[number, number]>([0, 0]);

    const [groupIndex, itemIndex] = menuIndex;
    const currentGroup = menuGroups[groupIndex];
    const DisplayingComponent = currentGroup.items[itemIndex]?.Component || Fragment;

    return (
        <div className="bs-container">
            <div className="bs-row gap-8">
                {/* Left Col */}
                <div className="bs-col-12 sm:w-auto px-0">
                    {/*<SettingsPanel />*/}
                    <ApplicationSettingSubmenuPanel
                        groups={menuGroups}
                        groupIndex={groupIndex}
                        itemIndex={itemIndex}
                        onClick={(i, j) => setMenuIndex([i, j])}
                    />
                </div>

                {/* Right Col */}
                <div className="bs-col-12 sm:bs-col px-0">
                    <DisplayingComponent />
                    <DangerPanel />
                </div>
            </div>
        </div>
    );
});
