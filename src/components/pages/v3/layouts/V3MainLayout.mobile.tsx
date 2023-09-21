import React, {memo} from 'react';
import {WithChildren} from '^types/global.type';
import styles from '^styles/v3/V3MainLayout.module.scss';
import {UserEditModal} from '^v3/share/modals/UserEditModal';
import {AddressModal} from '^v3/share/modals/AddressModal';
import {BottomNavMobile} from '^v3/share/BottomNavMobile';
import {TopNavMobileDefault} from '^v3/share/TobNav/TopNavMobile';
import {ReactComponentLike, ReactNodeLike} from 'prop-types';
import {MobileSection} from '../share/sections/MobileSection';

interface V3MainLayoutMobileProps extends WithChildren {
    // 페이지 상단의 제목
    title: ReactNodeLike;
    // 하단 네비게이션 중에서 활성상태로 보여줄 탭의 인덱스
    activeTabIndex: number;
    // 이 페이지에서만 사용되는 모달들을 등록
    modals?: ReactComponentLike[];
}

/**
 * 주 페이지 레이아웃 컴포넌트
 * - 페이지 상단바는 타이틀바로서 기능.
 * - 페이지 하단탭 네비게이션 포함.
 * - children 은 MobileSection.Item 을 쌓는 구조입니다.
 */
export const V3MainLayoutMobile = memo((props: V3MainLayoutMobileProps) => {
    const {title, activeTabIndex, modals = [], children} = props;

    return (
        <>
            <style dangerouslySetInnerHTML={{__html: `html, body, #__next { min-height: 100vh }`}} />
            <div className={`${styles.layout} h-full`}>
                <TopNavMobileDefault title={title} />
                <MobileSection.List>{children}</MobileSection.List>
                <BottomNavMobile activeIndex={activeTabIndex} />
            </div>
            {modals.map((ModalComponent, i) => (
                <ModalComponent key={i} />
            ))}
            <UserEditModal />
            <AddressModal />
        </>
    );
});