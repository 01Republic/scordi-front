import {atom} from 'recoil';
import {ReactNodeElement} from '^types/global.type';
import React, {Component, memo, MemoExoticComponent, NamedExoticComponent} from 'react';
import {ContentTabNav, ContentTabNavProps} from '^layouts/ContentLayout';
import {ComponentLike, ComponentType} from '^components/util/ComponentLike';

// export interface TabItemProps {
//     label: ReactNodeLike;
//     Component?: MemoExoticComponent<() => JSX.Element> | (() => JSX.Element);
// }

export interface TabItem {
    label: ReactNodeElement;
    TabPane: MemoExoticComponent<() => JSX.Element> | NamedExoticComponent<Object> | (() => JSX.Element);
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
