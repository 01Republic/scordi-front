import React, {memo} from 'react';
import {atom, useRecoilState} from 'recoil';

export const navTabIndex = atom({
    key: 'AppsNavTabIndex',
    default: 0,
});

export const NavTabs = memo(() => {
    const [tabIndex, setTabIndex] = useRecoilState(navTabIndex);
    const tabClickHandler = (i: number) => setTabIndex(i);

    return (
        <div className="tabs mb-5">
            <a className={`tab tab-bordered ${tabIndex === 0 && 'tab-active'}`} onClick={() => tabClickHandler(0)}>
                Subscriptions
            </a>
            <a className={`tab tab-bordered ${tabIndex === 1 && 'tab-active'}`} onClick={() => tabClickHandler(1)}>
                Integrations
            </a>
        </div>
    );
});
