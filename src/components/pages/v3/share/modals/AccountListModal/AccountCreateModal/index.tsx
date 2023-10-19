import React, {memo, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {plainToInstance} from 'class-transformer';
import {UnSignedAccountFormData} from '^types/account.type';
import {accountApi} from '^api/account.api';
import {useAccounts} from '^hooks/useAccounts';
import {AccountForm} from '../form';
import {useAccountCreateModal} from './hook';
import {ModalTopbar} from '^v3/share/modals/ModalTopbar';
import toast from 'react-hot-toast';

export const AccountCreateModal = memo(() => {
    const form = useForm<UnSignedAccountFormData>();
    const {isShow, Modal, hide, data} = useAccountCreateModal();
    const {fetchAllAccountsBy} = useAccounts();
    const onBack = () => hide();
    const {product, organizationId} = data;

    // 폼 기본값 채우기
    useEffect(() => {
        if (!product) return;
        form.setValue('productId', product.id);
    }, [product]);

    // 키보드 이벤트 바인딩
    useEffect(() => {
        const keyClicked = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onBack();
            return e;
        };
        window.addEventListener('keyup', keyClicked);
        return () => {
            window.removeEventListener('keyup', keyClicked);
        };
    }, []);

    const onSubmit = (dto: UnSignedAccountFormData) => {
        const {productId} = dto;
        if (!productId) {
            alert('무언가 잘못되었습니다. 스코디팅에게 문의해주세요!');
            return;
        }
        const formData = plainToInstance(UnSignedAccountFormData, dto).toCreateDto();
        accountApi.create(organizationId, formData).then(() => {
            toast.success('등록되었습니다.');
            fetchAllAccountsBy({productId}).finally(() => onBack());
        });
    };

    return (
        <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem]">
            <ModalTopbar title="새 계정 등록하기" backBtnOnClick={onBack} topbarPosition="sticky" />
            <AccountForm form={form} isShow={isShow} product={product} onSubmit={onSubmit} />
        </Modal>
    );
});
