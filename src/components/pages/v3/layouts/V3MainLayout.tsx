import React, {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {V3TopNav} from '^v3/share/TobNav/TopNav';
import styles from '^styles/v3/V3MainLayout.module.scss';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {useCurrentOrg} from '^models/Organization/hook';
import {UserEditModal} from '^v3/share/modals/UserEditModal';
import {AddressModal} from '^v3/share/modals/AddressModal';
import {V3Footer} from '^v3/share/Footer';
import {LeftNavBar, LNBIndex} from '^v3/share/LeftNavBar';
import {ReactComponentLike, ReactNodeLike} from 'prop-types';

interface V3MainLayoutProps extends WithChildren {
    // 하단 네비게이션 중에서 활성상태로 보여줄 탭의 인덱스
    activeTabIndex: LNBIndex;
    // 페이지 상단의 제목
    title?: ReactNodeLike;
    // 이 페이지에서만 사용되는 모달들을 등록
    modals?: ReactComponentLike[];
}

export const V3MainLayout = memo((props: V3MainLayoutProps) => {
    const {activeTabIndex, modals = [], children} = props;
    return (
        <>
            <style dangerouslySetInnerHTML={{__html: `html, body, #__next { min-height: 100vh }`}} />
            <div className={`${styles.layout} h-full`}>
                <V3TopNav />
                <div className="lnb-wrapper">
                    <LeftNavBar activeIndex={activeTabIndex} />
                    <div className="main_container flex flex-col">
                        {children}
                        <V3Footer />
                    </div>
                </div>
            </div>
            {modals.map((ModalComponent, i) => (
                <ModalComponent key={i} />
            ))}
            <UserEditModal />
            <AddressModal />
        </>
    );
});

export * from './V3MainLayout/Container';
