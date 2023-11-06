import React, {memo, useEffect} from 'react';
import {useRecoilState, useSetRecoilState} from 'recoil';
import CryptoJS from 'crypto-js';
import {MobileSection} from '../share/sections/MobileSection';
import {V3ModalLikeLayoutMobile} from '../layouts/V3ModalLikeLayout.mobile';
import {InformationPanel} from './InformationPanel';
import {BsPlus} from 'react-icons/bs';
import {useModal} from '../share/modals/useModal';
import {
    inputCardNameModal,
    selectCardCompanyModal,
    inputCardNumberModal,
    selectAppModal,
    inputCardHoldingMemberModal,
    currentCreditCardAtom,
    updateCreditCardDtoAtom,
} from '../V3OrgCardListPage/modals/atom';
import {CardNumberModal} from '../V3OrgCardListPage/modals/CardNumberModal';
import {CardNameModal} from '../V3OrgCardListPage/modals/CardNameModal';
import {CardCompanyModal} from '../V3OrgCardListPage/modals/CardCompanyModal';
import {SelectAppModal} from '../V3OrgCardListPage/modals/SelectAppModal';
import {CardHoldingMember} from '../V3OrgCardListPage/modals/CardHoldingMemberModal';
import {ContentEmpty} from '../V3OrgHomePage/mobile/ContentEmpty';
import {creditCardApi} from '^api/credit-cards.api';
import {cardIdParamState, orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {cardSign} from '^config/environments';
import {creditCardSignAtom, subscriptionsAtom} from '../V3OrgCardListPage/atom';
import {SubscriptionItem} from '../V3OrgHomePage/mobile/SubscriptionItem';
import {plainToInstance} from 'class-transformer';
import {UnSignedCreditCardFormData} from '^types/credit-cards.type';
import {useRouter} from 'next/router';
import {V3OrgCardListPageRoute} from '^pages/v3/orgs/[orgId]/cards';

// TODO: [to.진경님] V3OrgCardShowPage 에서 드렸던 코멘트들 참고해서 같은 부분들 많이 보이는데 리팩토링 해보시죠!
export const V3OrgCardDetailPage = memo(() => {
    const {isShow: isInputCardNumberModal} = useModal(inputCardNumberModal);
    const {isShow: isInputCardNameModal} = useModal(inputCardNameModal);
    const {isShow: isInputCardHoldingMemberModal} = useModal(inputCardHoldingMemberModal);
    const {isShow: isSelectCardCompanyModal} = useModal(selectCardCompanyModal);
    const {open: openSelectAppModal, isShow: isSelectAppModal} = useModal(selectAppModal);
    const [subscriptions, setSubscriptions] = useRecoilState(subscriptionsAtom);
    const setCurrentCreditCard = useSetRecoilState(currentCreditCardAtom);
    const setCardDetailInfo = useSetRecoilState(updateCreditCardDtoAtom);
    const setCardSignInfo = useSetRecoilState(creditCardSignAtom);
    const orgId = useRouterIdParamState('orgId', orgIdParamState);
    const cardId = useRouterIdParamState('cardId', cardIdParamState);
    const router = useRouter();

    useEffect(() => {
        if (!cardId && isNaN(cardId)) return;

        creditCardApi.show(orgId, cardId).then((res) => {
            setCurrentCreditCard(res.data);
            const updateDto = plainToInstance(UnSignedCreditCardFormData, res.data).toUpdateDto();
            setCardDetailInfo(updateDto);
            setSubscriptions(res.data.subscriptions ?? []);
            const json = CryptoJS.AES.decrypt(res.data.sign, cardSign).toString(CryptoJS.enc.Utf8);
            const toString = JSON.parse(json);
            setCardSignInfo(toString);
        });
    }, [cardId]);

    const backBtnOnclick = () => {
        router.push(V3OrgCardListPageRoute.path(orgId));
    };

    return (
        <V3ModalLikeLayoutMobile
            title="카드"
            modals={[CardNumberModal, CardNameModal, CardHoldingMember, CardCompanyModal, SelectAppModal]}
            backBtnOnClick={backBtnOnclick}
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
