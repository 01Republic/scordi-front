import {atom} from 'recoil';
import {ReactNodeElement} from '^types/global.type';
import React, {Component, memo, MemoExoticComponent, NamedExoticComponent} from 'react';
import {ContentTabNav, ContentTabNavProps} from '^layouts/ContentLayout';
import {ComponentLike, ComponentType} from '^components/util/ComponentLike';

// export interface TabItemProps {
//     label: ReactNodeElement;
//     Component?: MemoExoticComponent<() => JSX.Element> | (() => JSX.Element);
// }

export interface TabPaneProps {
    moveTab: (index: number) => any;
}

export interface TabItem<T extends TabPaneProps> {
    label: ReactNodeElement;
    TabPane: MemoExoticComponent<() => JSX.Element> | NamedExoticComponent<T> | (() => JSX.Element);
}

export function defineTabs<T extends TabPaneProps>(key: string, tabs: TabItem<T>[]) {
    const tabIndexAtom = atom({
        key: `tabIndexAtom/${key}`,
        default: 0,
    });

    const TabNav = memo((props: Partial<ContentTabNavProps>) => (
        <ContentTabNav tabs={tabs.map((tab) => tab.label)} recoilState={tabIndexAtom} {...props} />
    ));

    return {tabIndexAtom, tabs, TabNav};
}
