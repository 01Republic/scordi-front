import React, {memo, ReactNode, useEffect} from 'react';
import {atom, RecoilState, useRecoilState} from 'recoil';

export const tabIndexState = atom({
    key: 'Content/NavTabIndex',
    default: 0,
});

interface ContentTabNavProps {
    tabs: (string | ReactNode)[];
    // 만약 같은 페이지에서 여러 개의 텝 네비게이션이 필요한 경우,
    // 서로 키가 다른 상태컨테이너를 밖에서 주입할 수 있습니다.
    recoilState?: RecoilState<number>;
    // true 로 선택된 경우 다른 페이지로 이탈했다가 다시 돌아왔을 때 탭 선택을 초기화 합니다.
    // default: true
    resetIndex?: boolean;
}

export const ContentTabNav = memo((props: ContentTabNavProps) => {
    const {tabs, recoilState, resetIndex = true} = props;
    const [tabIndex, setTabIndex] = useRecoilState(recoilState || tabIndexState);
    const tabClickHandler = (i: number) => setTabIndex(i);

    useEffect(() => {
        // alert(1);
        return () => {
            if (resetIndex) setTabIndex(0);
        };
    }, []);

    return (
        <div className="ContentLayout--NavTabs tabs mb-5">
            {tabs.map((tabName, i) => (
                <a className={`tab tab-bordered ${tabIndex === i && 'tab-active'}`} onClick={() => tabClickHandler(i)}>
                    <span className="capitalize">{tabName}</span>
                </a>
            ))}
        </div>
    );
});
