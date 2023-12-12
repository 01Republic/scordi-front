import React, {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {V3MainLayout, V3MainLayoutContainer} from '^v3/layouts/V3MainLayout';
import {V3OrgSettingsMenuPanel} from '^v3/share/SettingMenuPanel';
import {LNBIndex} from '^v3/share/LeftNavBar';

interface V3SettingsLayoutProps extends WithChildren {}

export const V3SettingsLayout = memo((props: V3SettingsLayoutProps) => {
    const {children} = props;

    return (
        <V3MainLayout activeTabIndex={LNBIndex.Settings}>
            <V3MainLayoutContainer>
                <section className="grid grid-cols-10 items-start gap-5">
                    <div className="col-span-3">
                        <V3OrgSettingsMenuPanel />
                    </div>

                    <div className="col-span-7">{children}</div>
                </section>
            </V3MainLayoutContainer>
        </V3MainLayout>
    );
});
