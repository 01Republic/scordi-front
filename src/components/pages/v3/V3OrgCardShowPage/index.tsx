import React, {memo, useEffect} from 'react';
import {HeaderPanel} from './HeaderPanel';
import {BsPlus} from 'react-icons/bs';
import {CardList} from './CardList';
import {V3ModalLikeLayoutMobile} from '../layouts/V3ModalLikeLayout.mobile';
import {MobileSection} from '../share/sections/MobileSection';
import {useModal} from '../share/modals/useModal';
import {
    inputCardNameModal,
    inputCardNumberModal,
    inputCardHoldingMemeberModal,
    selectAppModal,
    selectCardCompanyModal,
} from './modals/atom';
import {CardNumberModal} from './modals/CardNumberModal';
import {CardNameModal} from './modals/CardNameModal';
import {CardHoldingMember} from './modals/CardHoldingMemberModal';
import {SelectAppModal} from './modals/SelectAppModal';
import {CardCompanyModal} from './modals/CardCompanyModal';
import {useRouter} from 'next/router';
import {V3OrgHomePageRoute} from '^pages/v3/orgs/[orgId]';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';

export const V3OrgCardShowPage = memo(() => {
    const {open: openInputCardNumberModal, isShow: isInputCardNumberModal} = useModal(inputCardNumberModal);
    const {isShow: isSelectCardCompanyModal} = useModal(selectCardCompanyModal);
    const {isShow: isInputCardNameModal} = useModal(inputCardNameModal);
    const {isShow: isInputCardHoldingMemeberModal} = useModal(inputCardHoldingMemeberModal);
    const {isShow: isSelectAppModal} = useModal(selectAppModal);
    const orgId = useRouterIdParamState('orgId', orgIdParamState);
    const router = useRouter();

    const backBtnOnclick = () => {
        router.push(V3OrgHomePageRoute.path(orgId));
    };

    return (
        <V3ModalLikeLayoutMobile
            title="카드"
            modals={[CardNumberModal, CardCompanyModal, CardNameModal, CardHoldingMember, SelectAppModal]}
            backBtnOnClick={backBtnOnclick}
        >
            <MobileSection.List>
                <HeaderPanel />

                {/* 연동된 서비스 목록 */}

                <MobileSection.Item>
                    <MobileSection.Padding>
                        <CardList />
                    </MobileSection.Padding>
                </MobileSection.Item>

                {[
                    !isInputCardNumberModal,
                    !isSelectCardCompanyModal,
                    !isInputCardNameModal,
                    !isInputCardHoldingMemeberModal,
                    !isSelectAppModal,
                ].every((e) => e) && (
                    <button
                        onClick={openInputCardNumberModal}
                        className="btn btn-lg btn-scordi btn-circle btn-floating"
                    >
                        <BsPlus size={48} />
                    </button>
                )}
            </MobileSection.List>
        </V3ModalLikeLayoutMobile>
    );
});
