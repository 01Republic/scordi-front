import React, {memo} from 'react';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {AiOutlineEdit} from 'react-icons/ai';
import {useModal} from '../../share/modals/useModal';
import {
    inputCardHoldingMemeberModal,
    inputCardNameModal,
    inputCardNumberModal,
    selectCardCompanyModal,
} from '../../V3OrgCardShowPage/modals/atom';

export const InformationPanel = memo(() => {
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
                            <p className="font-bold">경영지원팀</p>
                            <AiOutlineEdit size={13} className="invisible group-hover:visible" />
                        </div>

                        {/* 카드사 */}
                        <div
                            onClick={openSelectCardCompanyModal}
                            className="flex items-center gap-3 cursor-pointer group"
                        >
                            <p className="text-gray-500">국민카드</p>
                            <AiOutlineEdit size={13} className="invisible group-hover:visible" />
                        </div>

                        {/* 카드번호 */}
                        <div
                            onClick={openInputCardNumberModal}
                            className="flex items-center gap-3 cursor-pointer group"
                        >
                            <p className="text-lg font-bold">0000-****-****-0000</p>
                            <AiOutlineEdit size={13} className="invisible group-hover:visible" />
                        </div>

                        {/* 카드소유자 */}
                        <div
                            onClick={openInputCardHoldingMemberModal}
                            className="flex items-center gap-3 cursor-pointer group"
                        >
                            <p>카드소유자 : 이진경</p>
                            <AiOutlineEdit size={13} className="invisible group-hover:visible" />
                        </div>
                    </div>
                    {/* <div className="dropdown dropdown-end">
                        <GoKebabHorizontal size={16} tabIndex={0} />

                        <ul
                            tabIndex={0}
                            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            <li>
                                <span onClick={() => deleteCreditCard(card.id)} className="text-error">
                                    삭제
                                </span>
                            </li>
                        </ul>
                    </div> */}
                </div>
            </MobileSection.Padding>
        </MobileSection.Item>
    );
});
