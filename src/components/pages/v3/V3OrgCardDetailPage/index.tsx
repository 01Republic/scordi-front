import React, {memo, useEffect} from 'react';
import {useRecoilState, useSetRecoilState} from 'recoil';
import CryptoJS from 'crypto-js';
import {MobileSection} from '../share/sections/MobileSection';
import {V3ModalLikeLayoutMobile} from '../layouts/V3ModalLikeLayout.mobile';
import {InformationPanel} from './InformationPanel';
import {BsPlus} from 'react-icons/bs';
import {useModal} from '../share/modals/useModal';
import {
    addCardModal,
    inputCardNameModal,
    selectCardCompanyModal,
    inputCardNumberModal,
    selectAppModal,
    inputCardHoldingMemeberModal,
    currentCreditCardAtom,
} from '../V3OrgCardShowPage/modals/atom';
import {CardNumberModal} from '../V3OrgCardShowPage/modals/CardNumberModal';
import {CardNameModal} from '../V3OrgCardShowPage/modals/CardNameModal';
import {CardCompanyModal} from '../V3OrgCardShowPage/modals/CardCompanyModal';
import {SelectAppModal} from '../V3OrgCardShowPage/modals/SelectAppModal';
import {CardHoldingMember} from '../V3OrgCardShowPage/modals/CardHoldingMemberModal';
import {ContentEmpty} from '../V3OrgHomePage/mobile/ContentEmpty';
import {creditCardApi} from '^api/credit-cards.api';
import {cardIdParamState, orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {cardSign} from '^config/environments';
import {creditCardSignAtom, subscriptionsAtom} from '../V3OrgCardShowPage/atom';
import {SubscriptionItem} from '../V3OrgHomePage/mobile/SubscriptionItem';

export const V3OrgCardDetailPage = memo(() => {
    const {isShow: isAddCardModal} = useModal(addCardModal);
    const {isShow: isInputCardNumberModal} = useModal(inputCardNumberModal);
    const {isShow: isInputCardNameModal} = useModal(inputCardNameModal);
    const {isShow: isInputCardHoldingMemberModal} = useModal(inputCardHoldingMemeberModal);
    const {isShow: isSelectCardCompanyModal} = useModal(selectCardCompanyModal);
    const {open: openSelectAppModal, isShow: isSelectAppModal} = useModal(selectAppModal);

    const [subscriptions, setSubscriptions] = useRecoilState(subscriptionsAtom);
    const setCurrentCreditCard = useSetRecoilState(currentCreditCardAtom);
    const setCardSignInfo = useSetRecoilState(creditCardSignAtom);
    const orgId = useRouterIdParamState('orgId', orgIdParamState);
    const cardId = useRouterIdParamState('cardId', cardIdParamState);

    useEffect(() => {
        if (!cardId && isNaN(cardId)) return;

        creditCardApi.show(orgId, cardId).then((res) => {
            setCurrentCreditCard(res.data);
            setSubscriptions(res.data.subscriptions ?? []);
            const json = CryptoJS.AES.decrypt(res.data.sign, cardSign).toString(CryptoJS.enc.Utf8);
            const toString = JSON.parse(json);
            setCardSignInfo(toString);
        });
    }, [cardId]);

    return (
        <V3ModalLikeLayoutMobile
            title="카드"
            modals={[CardNumberModal, CardNameModal, CardHoldingMember, CardCompanyModal, SelectAppModal]}
        >
            <MobileSection.List>
                {/* 카드정보 */}
                <InformationPanel />
                <div className="bg-white">
                    <MobileSection.Padding>
                        {subscriptions.length ? (
                            subscriptions.map((subscription, i) => <SubscriptionItem key={i} item={subscription} />)
                        ) : (
                            <ContentEmpty
                                text="등록된 앱이 없어요"
                                subtext="눌러서 앱 추가"
                                onClick={openSelectAppModal}
                            />
                        )}
                    </MobileSection.Padding>
                </div>

                {[
                    !isAddCardModal,
                    !isInputCardNumberModal,
                    !isInputCardNameModal,
                    !isInputCardHoldingMemberModal,
                    !isSelectCardCompanyModal,
                    !isSelectAppModal,
                ].every((e) => e) && (
                    <button className="btn btn-lg btn-scordi btn-circle btn-floating">
                        <BsPlus size={48} onClick={openSelectAppModal} />
                    </button>
                )}
            </MobileSection.List>
        </V3ModalLikeLayoutMobile>
    );
});
