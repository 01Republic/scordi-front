import React, {memo, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {plainToInstance} from 'class-transformer';
import {toast} from 'react-toastify';
import {UnSignedAccountFormData} from '^types/account.type';
import {accountApi} from '^api/account.api';
import {useAccounts} from '^hooks/useAccounts';
import {AccountForm} from '../form';
import {useAccountEditModal} from './hook';
import {ModalTopbar} from '^v3/share/modals/ModalTopbar';

export const AccountEditModal = memo(() => {
    const form = useForm<UnSignedAccountFormData>();
    const {isShow, Modal, hide, data} = useAccountEditModal();
    const {fetchAllAccountsBy} = useAccounts();
    const onBack = () => hide();
    const {product, account} = data;

    // 폼 기본값 채우기
    useEffect(() => {
        if (!account) return;

        const decrypted = account.decryptSign();
        form.setValue('productId', account.productId);
        form.setValue('email', decrypted.email);
        form.setValue('password', decrypted.password);
        form.setValue('loginPageUrl', account.loginPageUrl);
        form.setValue('loginMethod', account.loginMethod);
        form.setValue('memo', account.memo);
    }, [account]);

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
        if (!account) return;
        const {organizationId, id} = account;

        const {productId} = dto;
        if (!productId) {
            alert('무언가 잘못되었습니다. 스코디팅에게 문의해주세요!');
            return;
        }
        const formData = plainToInstance(UnSignedAccountFormData, dto).toUpdateDto();
        accountApi.update(organizationId, id, formData).then(() => {
            toast.success('저장되었습니다.');
            fetchAllAccountsBy({productId}, true).finally(() => onBack());
        });
    };

    return (
        <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem]">
            <ModalTopbar title="계정 정보 변경" backBtnOnClick={onBack} topbarPosition="sticky" />
            <AccountForm form={form} isShow={isShow} product={product} onSubmit={onSubmit} />
        </Modal>
    );
});
