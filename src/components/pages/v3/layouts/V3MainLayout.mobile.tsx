import React, {memo} from 'react';
import {WithChildren} from '^types/global.type';
import styles from '^styles/v3/V3MainLayout.module.scss';
import {UserEditModal} from '^v3/share/modals/UserEditModal';
import {AddressModal} from '^v3/share/modals/AddressModal';
import {BottomNavMobile} from '^v3/share/BottomNavMobile';
import {TopNavMobileDefault} from '^v3/share/TobNav/TopNavMobile';
import {ReactNodeLike} from 'prop-types';

interface V3MainLayoutMobileProps extends WithChildren {
    title: ReactNodeLike;
    activeTabIndex: number;
}

/**
 * 주 페이지 레이아웃 컴포넌트
 * - 페이지 상단바는 타이틀바로서 기능.
 * - 페이지 하단탭 네비게이션 포함.
 */
export const V3MainLayoutMobile = memo((props: V3MainLayoutMobileProps) => {
    const {title, activeTabIndex, children} = props;

    return (
        <>
            <style dangerouslySetInnerHTML={{__html: `html, body, #__next { min-height: 100vh }`}} />
            <div className={`${styles.layout} h-full`}>
                <TopNavMobileDefault title={title} />
                {children}
                <BottomNavMobile activeIndex={activeTabIndex} />
            </div>
            <UserEditModal />
            <AddressModal />
        </>
    );
});
