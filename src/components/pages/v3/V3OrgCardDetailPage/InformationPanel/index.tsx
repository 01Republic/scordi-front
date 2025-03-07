import React, {memo} from 'react';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {useModal} from '../../share/modals/useModal';
import {orgIdParamState} from '^atoms/common';
import {creditCardApi} from '^models/CreditCard/api';
import {useRouter} from 'next/router';
import {V3OrgCardListPageRoute} from '^pages/v3/orgs/[orgId]/cards';
import {inputCardNumberModal} from '^v3/share/modals/NewCardModal/CardNumberModal/atom';
import {selectCardCompanyModal} from '^v3/share/modals/NewCardModal/CardCompanyModal/atom';
import {inputCardNameModal} from '^v3/share/modals/NewCardModal/CardNameModal/atom';
import {inputCardHoldingMemberModal} from '^v3/share/modals/NewCardModal/CardHoldingMemberModal/atom';
import {cardIdParamState, creditCardSignAtom, currentCreditCardAtom} from '^models/CreditCard/atom';
import {useAlert} from '^hooks/useAlert';
import {Edit} from 'lucide-react';

export const InformationPanel = memo(() => {
    const cardInfo = useRecoilValue(creditCardSignAtom);
    const currentCreditCard = useRecoilValue(currentCreditCardAtom);
    const {open: openInputCardNameModal} = useModal(inputCardNameModal);
    const {open: openInputCardNumberModal} = useModal(inputCardNumberModal);
    const {open: openInputCardHoldingMemberModal} = useModal(inputCardHoldingMemberModal);
    const {open: openSelectCardCompanyModal} = useModal(selectCardCompanyModal);
    const orgId = useRecoilValue(orgIdParamState);
    const [cardId, setCardId] = useRecoilState(cardIdParamState);
    const router = useRouter();
    const {alert} = useAlert();

    // 카드 삭제 함수
    const onDelete = () => {
        if (!orgId || isNaN(orgId) || !cardId || isNaN(cardId)) return;

        const res = alert.destroy({
            title: '카드를 삭제하시겠습니까?',
            onConfirm: () => creditCardApi.destroy(orgId, cardId),
        });

        res.then(() => {
            router.replace(V3OrgCardListPageRoute.path(orgId));
            setCardId(null);
        });
    };

    // TODO: ui 수정 필요
    return (
        <MobileSection.Item>
            <MobileSection.Padding>
                <div className="flex justify-between">
                    <div>
                        {/* 카드 명 */}
                        <div onClick={openInputCardNameModal} className="flex items-center gap-3 cursor-pointer group">
                            {currentCreditCard?.name ? (
                                <p className="font-bold">{currentCreditCard.name}</p>
                            ) : (
                                <p className="text-gray-300">카드의 별칭을 입력하기</p>
                            )}
                            <Edit size={13} className="text-gray-300 group-hover:text-gray-500" />
                        </div>

                        {/* 카드사 */}
                        <div
                            onClick={openSelectCardCompanyModal}
                            className="flex items-center gap-3 cursor-pointer group"
                        >
                            {currentCreditCard?.issuerCompany ? (
                                <p className="font-bold">{currentCreditCard.issuerCompany}</p>
                            ) : (
                                <p className="text-gray-300">카드사를 입력하기</p>
                            )}
                            <Edit size={13} className="text-gray-300 group-hover:text-gray-500" />
                        </div>

                        {/* 카드번호 */}
                        <div
                            onClick={openInputCardNumberModal}
                            className="flex items-center gap-3 cursor-pointer group"
                        >
                            <p className="text-lg font-bold">{`${cardInfo?.number1}-${cardInfo?.number2}-${cardInfo?.number3}-${cardInfo?.number4}`}</p>
                            <Edit size={13} className="text-gray-300 group-hover:text-gray-500" />
                        </div>

                        {/* 카드소유자 */}
                        <div
                            onClick={openInputCardHoldingMemberModal}
                            className="flex items-center gap-3 cursor-pointer group"
                        >
                            {currentCreditCard.holdingMember ? (
                                <p className="font-bold">
                                    카드 소유자 :{' '}
                                    {currentCreditCard.holdingMember.name ?? currentCreditCard.holdingMember.email}
                                </p>
                            ) : (
                                <p className="text-gray-300">카드 소유자 등록하기</p>
                            )}
                            <Edit size={13} className="text-gray-300 group-hover:text-gray-500" />
                        </div>
                    </div>
                    <div onClick={onDelete} className="cursor-pointer align-top text-error">
                        카드 삭제
                    </div>
                </div>
            </MobileSection.Padding>
        </MobileSection.Item>
    );
});
