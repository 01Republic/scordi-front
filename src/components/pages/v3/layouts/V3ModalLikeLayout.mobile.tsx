import React, {memo} from 'react';
import {useRouter} from 'next/router';
import {ReactComponentLike} from 'prop-types';
import {ReactNodeElement, WithChildren} from '^types/global.type';
import styles from '^styles/v3/V3MainLayout.module.scss';
import {ModalLikeTopbar} from './V3ModalLikeLayout.mobile/ModalLikeTopbar';
import {ModalLikeBottomBar} from './V3ModalLikeLayout.mobile/ModalLikeBottomBar';
import {ChannelTalkHideStyle} from '^components/ExternalCDNScripts/channel-talk/ChannelTalkHideStyle';
import Head from 'next/head';

interface V3ModalLikeLayoutMobileProps extends WithChildren {
    // 페이지 상단의 제목
    title?: ReactNodeElement;
    // 페이지 상단 우측 버튼들
    topRightButtons?: ReactComponentLike[];
    // 페이지 하단 고정 버튼들
    buttons?: ReactComponentLike[];
    // 이 페이지에서만 사용되는 모달들을 등록
    modals?: ReactComponentLike[];
    // 뒤로가기 버튼 클릭시의 동작
    backBtnOnClick?: () => void;
}

/**
 * 모달처럼 보이는 페이지 레이아웃 컴포넌트
 * - 페이지 상단바는 뒤로가기 버튼을 운영함.
 * - 페이지 하단탭 네비게이션 없음.
 */
export const V3ModalLikeLayoutMobile = memo((props: V3ModalLikeLayoutMobileProps) => {
    const {title, topRightButtons, buttons = [], modals = [], children, backBtnOnClick} = props;
    const router = useRouter();

    const onBack = () => router.back();

    return (
        <div className={styles.viewport}>
            <style dangerouslySetInnerHTML={{__html: `html, body, #__next { min-height: 100vh }`}} />
            <ChannelTalkHideStyle maxWidth="640px" />
            <div className={`${styles.layout}`}>
                <ModalLikeTopbar
                    backBtnOnClick={backBtnOnClick ? backBtnOnClick : onBack}
                    title={title}
                    rightButtons={topRightButtons}
                />
                <div className="bg-white" style={{minHeight: 'calc(100vh - 50px)'}}>
                    {children}
                </div>
                {buttons.length ? (
                    <ModalLikeBottomBar>
                        {buttons.map((BottomBarButton, i) => (
                            <BottomBarButton key={i} />
                        ))}
                    </ModalLikeBottomBar>
                ) : (
                    <></>
                )}
            </div>
            {modals.map((ModalComponent, i) => (
                <ModalComponent key={i} />
            ))}
        </div>
    );
});
