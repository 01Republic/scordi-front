import React, {memo, useState} from 'react';
import {useModal} from '../../share/modals/useModal';
import {creditcardAtom, inputCardNameModal, selectCardCompanyModal} from './atom';
import {ModalTopbar} from '../../share/modals/ModalTopbar';
import {useForm} from 'react-hook-form';
import {DefaultButton} from '^components/Button';
import Select from 'react-select/async';
import {useRecoilState} from 'recoil';

export const CardCompanyModal = memo(() => {
    const {Modal, close} = useModal(selectCardCompanyModal);
    const {open: openInputCardNameModal} = useModal(inputCardNameModal);
    const [creditCardData, setCreditCardData] = useRecoilState(creditcardAtom);
    const [issuerCompany, setIssuerCompany] = useState('');
    const form = useForm();

    const submitCardCompany = () => {
        setCreditCardData({...creditCardData, issuerCompany: issuerCompany});
    };

    return (
        <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem] z-50">
            <ModalTopbar backBtnOnClick={close} topbarPosition="sticky" />
            <div className="px-5 flex flex-col justify-start gap-10">
                <div className="py-5 pt-20">
                    <p className="mb-4">새로운 카드 등록하기</p>
                    <h2 className="h1 leading-tight">카드사를 선택해주세요</h2>
                </div>
                <div>
                    <Select options={OPTIONS} className="select-underline input-underline" placeholder="전체" />
                    <span></span>
                </div>

                <DefaultButton
                    onClick={() => {
                        openInputCardNameModal();
                        submitCardCompany();
                    }}
                    text="다음"
                    type="button"
                />
            </div>
        </Modal>
    );
});

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
