import React, {memo, useState} from 'react';
import {useRecoilState} from 'recoil';
import Select from 'react-select';
import {useToast} from '^hooks/useToast';
import {useModal} from '../../share/modals/useModal';
import {ModalTopbar} from '../../share/modals/ModalTopbar';
import {updateCreditCardDtoAtom, inputCardNameModal, selectCardCompanyModal, createCreditCardDtoAtom} from './atom';
import {cardIdParamState, orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {creditCardApi} from '^api/credit-cards.api';
import {SkipButton} from '^v3/V3OrgCardShowPage/modals/SkipButton';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {ModalLikeBottomBar} from '../../layouts/V3ModalLikeLayout.mobile/ModalLikeBottomBar';

export const CardCompanyModal = memo(() => {
    const {Modal, close} = useModal(selectCardCompanyModal);
    const {open: openInputCardNameModal} = useModal(inputCardNameModal);
    const [createCreditCardDto, setCreateCreditCardDto] = useRecoilState(createCreditCardDtoAtom);
    const [updateCreditCardDto, setUpdateCreditCardDto] = useRecoilState(updateCreditCardDtoAtom);
    const [issuerCompany, setIssuerCompany] = useState('');
    const orgId = useRouterIdParamState('orgId', orgIdParamState);
    const cardId = useRouterIdParamState('cardId', cardIdParamState);
    const {toast} = useToast();

    // 카드사 등록 함수
    const submitCardCompany = () => {
        if (!issuerCompany) return;

        setCreateCreditCardDto({...createCreditCardDto, issuerCompany: issuerCompany});
    };

    // 카드사 수정 함수
    const updateCardCompany = async () => {
        if (!issuerCompany) return;

        const data = await creditCardApi.update(orgId, cardId, {
            issuerCompany: issuerCompany,
        });

        if (data) {
            if (!data.data) return;

            toast.success('카드 별칭이 변경되었습니다.');
            setTimeout(() => {
                close();
            }, 2000);
            setUpdateCreditCardDto({...updateCreditCardDto, issuerCompany: issuerCompany});
        }
    };

    return (
        <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem] z-50">
            <ModalTopbar backBtnOnClick={close} topbarPosition="sticky" />
            <MobileSection.Padding>
                <p className="mb-4 pt-20">{cardId ? '카드 수정하기' : '새로운 카드 등록하기'}</p>
                <h2 className="h1 leading-tight mb-10">카드사를 선택해주세요</h2>
                <SkipButton currentModal="cardCompany" isModify={!!cardId} />

                <div>
                    <Select
                        value={OPTIONS.find((option) => option.value === issuerCompany)}
                        options={OPTIONS}
                        defaultValue={{
                            value: updateCreditCardDto.issuerCompany ?? '',
                            label: updateCreditCardDto.issuerCompany,
                        }}
                        onChange={(e) => e && setIssuerCompany(e?.value)}
                        className="select-underline input-underline"
                        placeholder="전체"
                    />
                    <span></span>
                </div>
            </MobileSection.Padding>
            <ModalLikeBottomBar>
                {cardId ? (
                    <button onClick={updateCardCompany} className="btn-modal">
                        확인
                    </button>
                ) : (
                    <button
                        onClick={() => {
                            submitCardCompany();
                            openInputCardNameModal();
                        }}
                        className="btn-modal"
                    >
                        다음
                    </button>
                )}
            </ModalLikeBottomBar>
        </Modal>
    );
});

// TODO: 카드사 로고 보여지도록 수정
const OPTIONS = [
    {value: 'KB국민카드', label: 'KB국민카드'},
    {value: '신한카드', label: '신한카드'},
    {value: '하나카드', label: '하나카드'},
    {value: '롯데카드', label: '롯데카드'},
    {value: 'BC카드', label: 'BC카드'},
    {value: 'NH농협카드', label: 'NH농협카드'},
    {value: '삼성카드', label: '삼성카드'},
    {value: '현대카드', label: '현대카드'},
];
