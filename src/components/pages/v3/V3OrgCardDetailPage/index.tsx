import React, {memo, useEffect} from 'react';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {MobileSection} from '../share/sections/MobileSection';
import {V3ModalLikeLayoutMobile} from '../layouts/V3ModalLikeLayout.mobile';
import {InformationPanel} from './InformationPanel';
import {useModal} from '../share/modals/useModal';
import {ContentEmpty} from '../share/ContentEmpty';
import {SubscriptionItem} from '../V3OrgHomePage/mobile/SubscriptionItem';
import {useRouter} from 'next/router';
import {V3OrgCardListPageRoute} from '^pages/v3/orgs/[orgId]/cards';
import {inputCardNumberModal} from '^v3/share/modals/NewCardModal/CardNumberModal/atom';
import {selectCardCompanyModal} from '^v3/share/modals/NewCardModal/CardCompanyModal/atom';
import {inputCardNameModal} from '^v3/share/modals/NewCardModal/CardNameModal/atom';
import {inputCardHoldingMemberModal} from '^v3/share/modals/NewCardModal/CardHoldingMemberModal/atom';
import {selectAppModal, subscriptionsAtom} from '^v3/share/modals/NewCardModal/SelectAppModal/atom';
import {cardIdParamState, creditCardSignAtom, currentCreditCardAtom} from '^models/CreditCard/atom';
import {creditCardApi} from '^models/CreditCard/api';
import {NewCardModalV2} from 'src/components/pages/v3/share/modals/NewCardModal/NewCardModalV2';
import {orgIdParamState} from '^atoms/common';
import {Plus} from 'lucide-react';

export const V3OrgCardDetailPage = memo(() => {
    const cardNumberModal = useModal(inputCardNumberModal);
    const cardNameModal = useModal(inputCardNameModal);
    const cardHoldingMemberModal = useModal(inputCardHoldingMemberModal);
    const cardCompanyModal = useModal(selectCardCompanyModal);
    const {open: openSelectAppModal, isShow: isSelectAppModal} = useModal(selectAppModal);
    const [subscriptions, setSubscriptions] = useRecoilState(subscriptionsAtom);
    const [currentCreditCard, setCurrentCreditCard] = useRecoilState(currentCreditCardAtom);
    const setCardSignInfo = useSetRecoilState(creditCardSignAtom);
    const orgId = useRecoilValue(orgIdParamState);
    const cardId = useRecoilValue(cardIdParamState);
    const router = useRouter();

    useEffect(() => {
        if (!orgId || isNaN(orgId) || !cardId || isNaN(cardId)) return;

        creditCardApi.show(orgId, cardId).then((res) => {
            setCurrentCreditCard(res.data);
        });
    }, [orgId, cardId]);

    useEffect(() => {
        const isNotEmpty = Object.keys(currentCreditCard).length;
        if (!cardId || isNaN(cardId) || !isNotEmpty) return;

        const decrypted = currentCreditCard.decryptSign();
        setCardSignInfo(decrypted);

        setSubscriptions(currentCreditCard.subscriptions ?? []);
    }, [orgId, cardId, currentCreditCard]);

    const backBtnOnclick = () => {
        router.push(V3OrgCardListPageRoute.path(orgId));
    };

    const isModalClose = () => {
        if (
            cardNumberModal.isShow ||
            cardNameModal.isShow ||
            cardHoldingMemberModal.isShow ||
            cardCompanyModal.isShow ||
            isSelectAppModal
        )
            return false;
        else return true;
    };

    return (
        <V3ModalLikeLayoutMobile title="카드" backBtnOnClick={backBtnOnclick}>
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

                {isModalClose() && (
                    <button className="btn btn-lg btn-scordi btn-circle btn-floating">
                        <Plus size={48} onClick={openSelectAppModal} />
                    </button>
                )}
            </MobileSection.List>
            <NewCardModalV2 />
        </V3ModalLikeLayoutMobile>
    );
});
