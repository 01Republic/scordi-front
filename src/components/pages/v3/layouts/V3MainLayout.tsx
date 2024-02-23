import React, {memo} from 'react';
import {WithChildren} from '^types/global.type';
import styles from '^styles/v3/V3MainLayout.module.scss';
import {ReactComponentLike} from 'prop-types';
import {V3TopNav} from '^v3/share/TobNav/TopNav';
import {LeftNavBar, LNBIndex} from '^v3/share/LeftNavBar';
import {V3Footer} from '^v3/share/Footer';
import {UserEditModal} from '^v3/share/modals/UserEditModal';
import {AddressModal} from '^v3/share/modals/AddressModal';
import {OnboardingFlow} from '^v3/share/OnboardingFlow';
import {PageLoadingCover} from '^v3/share/PageLoadingCover';
import {ConnectDataSourcesModal} from '^v3/share/modals/ConnectDataSoucresModal';

export interface V3MainLayoutProps extends WithChildren {
    // 하단 네비게이션 중에서 활성상태로 보여줄 탭의 인덱스
    activeTabIndex: LNBIndex;
    // // 페이지 상단의 제목
    // title?: ReactNodeLike;
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
            <PageLoadingCover />
            {/*<OnboardingFlow />*/}
            {/*<ConnectDataSourcesModal />*/}
        </>
    );
});

export * from './V3MainLayout/Container';
