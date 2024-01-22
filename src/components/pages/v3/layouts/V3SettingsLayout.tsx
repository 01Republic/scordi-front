import React, {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {V3MainLayout, V3MainLayoutContainer} from '^v3/layouts/V3MainLayout';
import {V3OrgSettingsMenuPanel} from '^v3/V3OrgSettingsPage/desktop/SettingMenuPanel/SettingMenuPanel';
import {LNBIndex} from '^v3/share/LeftNavBar';

interface V3SettingsLayoutProps extends WithChildren {}

export const V3SettingsLayout = memo((props: V3SettingsLayoutProps) => {
    const {children} = props;

    return (
        <V3MainLayout activeTabIndex={LNBIndex.Settings}>
            <V3MainLayoutContainer className="!p-0">
                <section className="items-start flex">
                    <div>
                        <V3OrgSettingsMenuPanel />
                    </div>

                    <div className="w-full py-10 px-14">{children}</div>
                </section>
            </V3MainLayoutContainer>
        </V3MainLayout>
    );
});
