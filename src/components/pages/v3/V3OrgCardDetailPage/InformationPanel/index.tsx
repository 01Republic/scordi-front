import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {AiOutlineEdit} from 'react-icons/ai';
import {useModal} from '../../share/modals/useModal';
import {
    updateCreditCardDtoAtom,
    inputCardHoldingMemeberModal,
    inputCardNameModal,
    inputCardNumberModal,
    selectCardCompanyModal,
} from '../../V3OrgCardShowPage/modals/atom';
import {creditCardSignAtom} from '../../V3OrgCardShowPage/atom';
import {cardIdParamState, orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {creditCardApi} from '^api/credit-cards.api';
import {useRouter} from 'next/router';
import {V3OrgCardShowPageRoute} from '^pages/v3/orgs/[orgId]/cards';
import Swal from 'sweetalert2';

export const InformationPanel = memo(() => {
    const cardInfo = useRecoilValue(creditCardSignAtom);
    const cardDetailInfo = useRecoilValue(updateCreditCardDtoAtom);
    const {open: openInputCardNameModal} = useModal(inputCardNameModal);
    const {open: openInputCardNumberModal} = useModal(inputCardNumberModal);
    const {open: openInputCardHoldingMemberModal} = useModal(inputCardHoldingMemeberModal);
    const {open: openSelectCardCompanyModal} = useModal(selectCardCompanyModal);
    const orgId = useRouterIdParamState('orgId', orgIdParamState);
    const cardId = useRouterIdParamState('cardId', cardIdParamState);
    const router = useRouter();

    // 카드 삭제 함수
    const deleteCreditCard = () => {
        if (!orgId && !cardId) return;

        Swal.fire({
            title: '카드를 삭제하시겠습니까?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '',
            cancelButtonColor: 'error',
            confirmButtonText: '삭제',
            cancelButtonText: '취소',
        }).then((result) => {
            if (result.isConfirmed) {
                creditCardApi.destroy(orgId, cardId).then(() =>
                    Swal.fire({
                        icon: 'success',
                        title: '삭제가 완료되었습니다.',
                        showConfirmButton: false,
                        timer: 1500,
                    }),
                );
                setTimeout(() => {
                    router.push(V3OrgCardShowPageRoute.path(orgId));
                }, 1500);
            }
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
                            {cardDetailInfo?.name ? (
                                <p className="font-bold">{cardDetailInfo.name}</p>
                            ) : (
                                <p className="text-gray-300">카드의 별칭을 입력하기</p>
                            )}
                            <AiOutlineEdit size={13} className="invisible group-hover:visible" />
                        </div>

                        {/* 카드사 */}
                        <div
                            onClick={openSelectCardCompanyModal}
                            className="flex items-center gap-3 cursor-pointer group"
                        >
                            {cardDetailInfo?.issuerCompany ? (
                                <p className="font-bold">{cardDetailInfo.issuerCompany}</p>
                            ) : (
                                <p className="text-gray-300">카드사를 입력하기</p>
                            )}
                            <AiOutlineEdit size={13} className="invisible group-hover:visible" />
                        </div>

                        {/* 카드번호 */}
                        <div
                            onClick={openInputCardNumberModal}
                            className="flex items-center gap-3 cursor-pointer group"
                        >
                            <p className="text-lg font-bold">{`${cardInfo.number1}-${cardInfo.number2}-${cardInfo.number3}-${cardInfo.number4}`}</p>
                            <AiOutlineEdit size={13} className="invisible group-hover:visible" />
                        </div>

                        {/* 카드소유자 */}
                        <div
                            onClick={openInputCardHoldingMemberModal}
                            className="flex items-center gap-3 cursor-pointer group"
                        >
                            {cardDetailInfo.holdingMember ? (
                                <p className="font-bold">카드 소유자 :{cardDetailInfo.holdingMember.name} </p>
                            ) : (
                                <p className="text-gray-300">카드 소유자 등록하기</p>
                            )}
                            <AiOutlineEdit size={13} className="invisible group-hover:visible" />
                        </div>
                    </div>
                    <div onClick={deleteCreditCard} className="cursor-pointer align-top text-error">
                        카드 삭제
                    </div>
                </div>
            </MobileSection.Padding>
        </MobileSection.Item>
    );
});
