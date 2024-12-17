import React, {Dispatch, Fragment, memo, ReactNode, SetStateAction, useState} from 'react';
import {WithChildren} from '^types/global.type';
import {ReactComponentLike} from 'prop-types';

interface MainTabButtonProps extends WithChildren {
    onClick?: () => any;
    active?: boolean;
}

export const MainTabButton = memo((props: MainTabButtonProps) => {
    const {onClick, active = false, children} = props;

    return (
        <div
            className={`group relative py-4 cursor-pointer ${
                active ? 'text-scordi' : 'hover:text-black'
            } border-scordi transition-all`}
            onClick={onClick}
        >
            <div>{children}</div>
            <span className={`absolute bottom-0 block w-full bg-scordi ${active ? 'h-[3px]' : 'h-0'} transition-all`} />
        </div>
    );
});
MainTabButton.displayName = 'MainTabButton';

interface MainTabButtonsProps extends WithChildren {
    tabs?: ReactNode[];
    activeTabIndex?: number;
    setActiveTabIndex?: Dispatch<SetStateAction<number>>;
    className?: string;
    borderless?: boolean;
}

export const MainTabButtons = memo((props: MainTabButtonsProps) => {
    const {tabs = [], activeTabIndex = 0, setActiveTabIndex, borderless = false, className = '', children} = props;

    const onClick = (i: number) => setActiveTabIndex && setActiveTabIndex(i);

    return (
        <div
            className={`flex gap-6 items-center ${
                borderless ? '' : 'border-b border-gray-300'
            } text-16 font-semibold text-gray-500 transition-all ${className}`}
        >
            {children ||
                tabs.map((tab, i) => (
                    <MainTabButton key={i} active={i === activeTabIndex} onClick={() => onClick(i)}>
                        {tab}
                    </MainTabButton>
                ))}
        </div>
    );
});

interface MainTabGroupProps {
    tabs?: ReactNode[];
    tabPanes?: ReactComponentLike[];
    children?: ReactNode | ((activeTabIndex: number) => ReactNode);
}

export const MainTabGroup = memo((props: MainTabGroupProps) => {
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const {tabs = [], tabPanes = [], children} = props;

    const TabPane = tabPanes.find((_, i) => i === activeTabIndex) || Fragment;

    return (
        <>
            <MainTabButtons activeTabIndex={activeTabIndex} setActiveTabIndex={setActiveTabIndex} tabs={tabs} />

            <div>{children ? typeof children === 'function' ? children(activeTabIndex) : children : <TabPane />}</div>
        </>
    );
});
