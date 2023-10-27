import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {AiOutlineEdit} from 'react-icons/ai';
import {useModal} from '../../share/modals/useModal';
import {
    creditcardAtom,
    inputCardHoldingMemeberModal,
    inputCardNameModal,
    inputCardNumberModal,
    selectCardCompanyModal,
} from '../../V3OrgCardShowPage/modals/atom';
import {creditCardSignAtom} from '../../V3OrgCardShowPage/atom';

export const InformationPanel = memo(() => {
    const cardInfo = useRecoilValue(creditCardSignAtom);
    const cardDetailInfo = useRecoilValue(creditcardAtom);
    const {open: openInputCardNameModal} = useModal(inputCardNameModal);
    const {open: openInputCardNumberModal} = useModal(inputCardNumberModal);
    const {open: openInputCardHoldingMemberModal} = useModal(inputCardHoldingMemeberModal);
    const {open: openSelectCardCompanyModal} = useModal(selectCardCompanyModal);

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
                            {cardDetailInfo.holdingMemberId ? (
                                <p className="font-bold">{cardDetailInfo.holdingMemberId}</p>
                            ) : (
                                <p className="text-gray-300">카드 소유자 등록하기</p>
                            )}
                            <AiOutlineEdit size={13} className="invisible group-hover:visible" />
                        </div>
                    </div>
                </div>
            </MobileSection.Padding>
        </MobileSection.Item>
    );
});
