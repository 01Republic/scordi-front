import React, {memo, useEffect, useState} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import Select, {SingleValue} from 'react-select';
import {useToast} from '^hooks/useToast';
import {useModal} from '../../useModal';
import {ModalTopbar} from '../../ModalTopbar';
import {createCreditCardDtoAtom} from '../atom';
import {orgIdParamState} from '^atoms/common';
import {creditCardApi} from '^models/CreditCard/api';
import {SkipButton} from '^v3/share/modals/NewCardModal/SkipButton';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {ModalLikeBottomBar} from '../../../../layouts/V3ModalLikeLayout.mobile/ModalLikeBottomBar';
import {useMoveScroll} from '^hooks/useMoveScroll';
import {selectCardCompanyModal} from './atom';
import {inputCardNameModal} from '../CardNameModal/atom';
import {cardIdParamState, currentCreditCardAtom} from '^models/CreditCard/atom';

export const CardCompanyModal = memo(() => {
    const {Modal, close} = useModal(selectCardCompanyModal);
    const {open: openInputCardNameModal} = useModal(inputCardNameModal);
    const [createCreditCardDto, setCreateCreditCardDto] = useRecoilState(createCreditCardDtoAtom);
    const [currentCreditCard, setCurrenCreditCard] = useRecoilState(currentCreditCardAtom);
    const [issuerCompany, setIssuerCompany] = useState<string | null>('');
    const [defaultValue, setDefaultValue] = useState({
        value: '',
        label: '',
    });
    const orgId = useRecoilValue(orgIdParamState);
    const cardId = useRecoilValue(cardIdParamState);
    const {selectRef, onScroll} = useMoveScroll();
    const {toast} = useToast();

    useEffect(() => {
        cardId
            ? setDefaultValue({
                  value: currentCreditCard.issuerCompany ?? '',
                  label: currentCreditCard.issuerCompany ?? '',
              })
            : setDefaultValue({
                  value: '',
                  label: '',
              });
    }, [orgId, cardId, currentCreditCard]);

    // 카드사 등록 함수
    const onSubmit = () => {
        if (!issuerCompany) return;

        setCreateCreditCardDto({...createCreditCardDto, issuerCompany: issuerCompany});
    };

    // 카드사 수정 함수
    const onUpdate = async () => {
        if (!orgId || isNaN(orgId) || !cardId || isNaN(cardId)) return;

        const res = await creditCardApi.update(orgId, cardId, {
            issuerCompany: issuerCompany,
        });

        if (res) {
            setCurrenCreditCard(res.data);
            close();
            toast.success('변경되었습니다.');
        }
    };

    return (
        <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem] z-50">
            <ModalTopbar
                backBtnOnClick={() => close()}
                topbarPosition="sticky"
                rightButtons={[
                    () => <SkipButton submitCardNumber={onSubmit} currentModal="cardCompany" isModify={!!cardId} />,
                ]}
            />
            <MobileSection.Padding>
                <p className="mb-4 pt-10">{cardId ? '카드 수정하기' : '새로운 카드 등록하기'}</p>
                <h2 className="h1 leading-tight mb-10">카드사를 선택해주세요</h2>

                <div ref={selectRef} onClick={onScroll}>
                    <Select
                        value={OPTIONS.find((option) => option.value === issuerCompany)}
                        options={OPTIONS}
                        defaultValue={defaultValue}
                        onChange={(e: SingleValue<{value: string; label: string}>) => e && setIssuerCompany(e?.value)}
                        className="select-underline input-underline"
                        placeholder="전체"
                    />
                    <span></span>
                </div>
            </MobileSection.Padding>
            <ModalLikeBottomBar>
                {cardId ? (
                    <button onClick={onUpdate} className="btn-modal">
                        확인
                    </button>
                ) : (
                    <button
                        onClick={() => {
                            onSubmit();
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
