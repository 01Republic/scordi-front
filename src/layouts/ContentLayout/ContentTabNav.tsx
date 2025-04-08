import React, {memo, ReactNode, useEffect} from 'react';
import {atom, RecoilState, useRecoilState} from 'recoil';
import {WithChildren} from '^types/global.type';

export const tabIndexState = atom({
    key: 'Content/NavTabIndex',
    default: 0,
});

export interface ContentTabNavProps {
    tabs: (string | ReactNode)[];
    // 만약 같은 페이지에서 여러 개의 텝 네비게이션이 필요한 경우,
    // 서로 키가 다른 상태컨테이너를 밖에서 주입할 수 있습니다.
    recoilState?: RecoilState<number>;
    // true 로 선택된 경우 다른 페이지로 이탈했다가 다시 돌아왔을 때 탭 선택을 초기화 합니다.
    // default: true
    resetIndex?: boolean;

    TabNav?: (props: {} & WithChildren) => JSX.Element;

    Tab?: (props: {
        tabName: React.ReactNode;
        i: number;
        active: boolean;
        tabIndex: number;
        onClick: () => any;
    }) => JSX.Element;
}

export const ContentTabNav = memo((props: ContentTabNavProps) => {
    const {tabs, recoilState, resetIndex = true, TabNav = DefaultTabNav, Tab = DefaultTab} = props;
    const [tabIndex, setTabIndex] = useRecoilState(recoilState || tabIndexState);
    const tabClickHandler = (i: number) => setTabIndex(i);

    useEffect(() => {
        // alert(1);
        return () => {
            if (resetIndex) setTabIndex(0);
        };
    }, []);

    return (
        <TabNav>
            {tabs.map((tabName, i) => (
                <Tab
                    key={i}
                    tabName={tabName}
                    i={i}
                    active={tabIndex === i}
                    tabIndex={tabIndex}
                    onClick={() => tabClickHandler(i)}
                />
            ))}
        </TabNav>
    );
});

const DefaultTabNav = (props: {} & WithChildren) => {
    const {children} = props;

    return <div className="ContentLayout--NavTabs tabs mb-5">{children}</div>;
};

const DefaultTab = (props: {
    tabName: React.ReactNode;
    i: number;
    active: boolean;
    tabIndex: number;
    onClick: () => any;
}) => {
    const {tabName, active, onClick} = props;

    return (
        <a className={`tab tab-bordered ${active && 'tab-active'}`} onClick={onClick}>
            <span className="capitalize">{tabName}</span>
        </a>
    );
};
