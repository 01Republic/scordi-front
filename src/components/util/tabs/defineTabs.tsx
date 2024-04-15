import {atom} from 'recoil';
import {ReactNodeLike} from 'prop-types';
import React, {memo, MemoExoticComponent} from 'react';
import {ContentTabNav, ContentTabNavProps} from '^layouts/ContentLayout';

// export interface TabItemProps {
//     label: ReactNodeLike;
//     Component?: MemoExoticComponent<() => JSX.Element> | (() => JSX.Element);
// }

export interface TabItem {
    label: ReactNodeLike;
    TabPane: MemoExoticComponent<() => JSX.Element> | (() => JSX.Element);
}

export function defineTabs(key: string, tabs: TabItem[]) {
    const tabIndexAtom = atom({
        key: `tabIndexAtom/${key}`,
        default: 0,
    });

    const TabNav = memo((props: Partial<ContentTabNavProps>) => (
        <ContentTabNav tabs={tabs.map((tab) => tab.label)} recoilState={tabIndexAtom} {...props} />
    ));

    return {tabIndexAtom, tabs, TabNav};
}
