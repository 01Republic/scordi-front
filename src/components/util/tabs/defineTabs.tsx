import {atom} from 'recoil';
import {ReactNodeElement, WithChildren} from '^types/global.type';
import React, {Component, memo, MemoExoticComponent, NamedExoticComponent} from 'react';
import {ContentTabNav, ContentTabNavProps} from '^layouts/ContentLayout';
import {ComponentLike, ComponentType} from '^components/util/ComponentLike';

// export interface TabItemProps {
//     label: ReactNodeElement;
//     Component?: MemoExoticComponent<() => JSX.Element> | (() => JSX.Element);
// }

export interface TabPaneProps {
    moveTab?: (index: number) => any;
}

export interface TabItem<T extends TabPaneProps> {
    label: ReactNodeElement;
    TabPane: MemoExoticComponent<() => JSX.Element> | NamedExoticComponent<T> | (() => JSX.Element);
}

export interface TabProps {
    tabName: React.ReactNode;
    i: number;
    active: boolean;
    tabIndex: number;
    onClick: () => any;
}

export interface DefineTabOption {
    TabNav?: (props: {} & WithChildren) => JSX.Element;
    Tab?: (props: TabProps) => JSX.Element;
}

export function defineTabs<T extends TabPaneProps>(key: string, tabs: TabItem<T>[], option: DefineTabOption = {}) {
    const tabIndexAtom = atom({
        key: `tabIndexAtom/${key}`,
        default: 0,
    });

    const TabNav = memo((props: Partial<ContentTabNavProps>) => (
        <ContentTabNav
            tabs={tabs.map((tab) => tab.label)}
            recoilState={tabIndexAtom}
            TabNav={option.TabNav}
            Tab={option.Tab}
            {...props}
        />
    ));

    return {tabIndexAtom, tabs, TabNav};
}
