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
import {CardHoldingMember} from './modals/CardHoldingMemberModal/CardHoldingMemberModal';
import {SelectAppModal} from './modals/SelectAppModal';
import {CardCompanyModal} from './modals/CardCompanyModal';

export const V3OrgCardShowPage = memo(() => {
    const {
        open: openInputCardNumberModal,
        isShow: isInputCardNumberModal,
        setIsShow: setInputCardNumberModal,
    } = useModal(inputCardNumberModal);
    const {isShow: isSelectCardCompanyModal} = useModal(selectCardCompanyModal);
    const {isShow: isInputCardNameModal} = useModal(inputCardNameModal);
    const {isShow: isInputCardHoldingMemeberModal} = useModal(inputCardHoldingMemeberModal);
    const {isShow: isSelectAppModal} = useModal(selectAppModal);

    useEffect(() => {
        setInputCardNumberModal(false);
    }, []);

    return (
        <V3ModalLikeLayoutMobile
            title="카드"
            modals={[CardNumberModal, CardCompanyModal, CardNameModal, CardHoldingMember, SelectAppModal]}
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
