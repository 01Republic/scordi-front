import React, {memo, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {ScrollSpy} from '^components/util/scroll-spy';

export const ConnectMethodTabs = [
    {name: '구성원', targetId: 'workspace', disabled: false},
    {name: '결제메일', targetId: 'invoice-emails', disabled: false},
    {name: '카드', targetId: 'card-accounts', disabled: false},
    {name: '은행', targetId: 'bank-accounts', disabled: true},
    {name: '홈택스', targetId: 'hometax', disabled: true},
];

interface BorderedTabsProps {
    //
}

export const BorderedTabs = memo((props: BorderedTabsProps) => {
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const router = useRouter();
    const {} = props;

    useEffect(() => {
        if (!router.isReady) return;

        ScrollSpy.run('[data-spy="scroll"]', {activeClass: 'tab-active'});
    }, [router.isReady]);

    return (
        <div className="tabs tabs-bordered px-12 flex-nowrap overflow-scroll no-scrollbar">
            {ConnectMethodTabs.map((tab, i) => (
                <Tab
                    key={i}
                    text={tab.name}
                    href={`#${tab.targetId}`}
                    onClick={() => setActiveTabIndex(i)}
                    active={i === activeTabIndex}
                    disabled={tab.disabled}
                />
            ))}
        </div>
    );
});
BorderedTabs.displayName = 'BorderedTabs';

interface TabProps {
    text: string;
    href: string;
    onClick: () => any;
    active?: boolean;
    disabled?: boolean;
}

const Tab = memo((props: TabProps) => {
    const {text, href, onClick, active = false, disabled = false} = props;

    return (
        <a
            href={disabled ? undefined : href}
            className={`tab whitespace-nowrap h-auto py-3 px-6 text-lg font-semibold ${active && 'tab-active'} ${
                disabled && '!text-gray-300 cursor-not-allowed'
            }`}
            onClick={() => !disabled && onClick()}
            data-spy="scroll"
            data-spy-target={href}
        >
            {text}
        </a>
    );
});
