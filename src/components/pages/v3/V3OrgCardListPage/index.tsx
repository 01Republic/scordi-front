import React, {memo} from 'react';
import {HeaderPanel} from './HeaderPanel';
import {BsPlus} from 'react-icons/bs';
import {CardList} from './CardList';
import {V3ModalLikeLayoutMobile} from '../layouts/V3ModalLikeLayout.mobile';
import {MobileSection} from '../share/sections/MobileSection';
import {useModal} from '../share/modals/useModal';
import {useRouter} from 'next/router';
import {V3OrgHomePageRoute} from '^pages/v3/orgs/[orgId]';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {CardFormModalGroup} from '^components/pages/v3/V3OrgCardListPage/modals/CardFormModalGroup';
import {inputCardNumberModal} from './modals/CardNumberModal/atom';

export const V3OrgCardListPage = memo(() => {
    const cardNumberModal = useModal(inputCardNumberModal);
    const orgId = useRouterIdParamState('orgId', orgIdParamState);
    const router = useRouter();

    const backBtnOnclick = () => {
        router.push(V3OrgHomePageRoute.path(orgId));
    };

    return (
        <V3ModalLikeLayoutMobile title="카드" backBtnOnClick={backBtnOnclick}>
            <MobileSection.List>
                <HeaderPanel />

                {/* 연동된 서비스 목록 */}

                <MobileSection.Item>
                    <MobileSection.Padding>
                        <CardList />
                    </MobileSection.Padding>
                </MobileSection.Item>

                {!cardNumberModal.isShow && (
                    <button
                        onClick={() => cardNumberModal.open()}
                        className="btn btn-lg btn-scordi btn-circle btn-floating"
                    >
                        <BsPlus size={48} />
                    </button>
                )}
            </MobileSection.List>
            <CardFormModalGroup />
        </V3ModalLikeLayoutMobile>
    );
});
