import React, {memo} from 'react';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {AiOutlineEdit} from 'react-icons/ai';
import {useModal} from '../../share/modals/useModal';
import {orgIdParamState} from '^atoms/common';
import {creditCardApi} from '^api/credit-cards.api';
import {useRouter} from 'next/router';
import {V3OrgCardListPageRoute} from '^pages/v3/orgs/[orgId]/cards';
import {inputCardNumberModal} from '../../V3OrgCardListPage/modals/CardNumberModal/atom';
import {selectCardCompanyModal} from '../../V3OrgCardListPage/modals/CardCompanyModal/atom';
import {inputCardNameModal} from '../../V3OrgCardListPage/modals/CardNameModal/atom';
import {inputCardHoldingMemberModal} from '../../V3OrgCardListPage/modals/CardHoldingMemberModal/atom';
import {cardIdParamState, creditCardSignAtom, currentCreditCardAtom} from '^models/CreditCard/atom';
import {useAlert} from '^hooks/useAlert';

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

        alert.destroy({
            title: '카드를 삭제하시겠습니까?',
            confirmFn: () => creditCardApi.destroy(orgId, cardId),
            routerFn: () => {
                router.replace(V3OrgCardListPageRoute.path(orgId));
                setCardId(null);
            },
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
                            <AiOutlineEdit size={13} className="text-gray-300 group-hover:text-gray-500" />
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
                            <AiOutlineEdit size={13} className="text-gray-300 group-hover:text-gray-500" />
                        </div>

                        {/* 카드번호 */}
                        <div
                            onClick={openInputCardNumberModal}
                            className="flex items-center gap-3 cursor-pointer group"
                        >
                            <p className="text-lg font-bold">{`${cardInfo?.number1}-${cardInfo?.number2}-${cardInfo?.number3}-${cardInfo?.number4}`}</p>
                            <AiOutlineEdit size={13} className="text-gray-300 group-hover:text-gray-500" />
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
                            <AiOutlineEdit size={13} className="text-gray-300 group-hover:text-gray-500" />
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
