import React, {memo, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {plainToInstance} from 'class-transformer';
import {UnSignedAccountFormData} from '^models/Account/types';
import {accountApi} from '^models/Account/api';
import {AccountForm} from '../form';
import {useAccountCreateModal} from './hook';
import {ModalTopbar} from '^v3/share/modals/ModalTopbar';
import {useToast} from '^hooks/useToast';
import {useAccounts} from '^models/Account/hook';

export const AccountCreateModal = memo(() => {
    const form = useForm<UnSignedAccountFormData>();
    const {isShow, Modal, hide, data} = useAccountCreateModal();
    const {reload: refreshAccountList} = useAccounts();
    const {toast} = useToast();
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

    const onBack = () => hide();

    const onSubmit = (dto: UnSignedAccountFormData) => {
        const {productId, email, password} = dto;
        if (!productId) {
            toast.error('서비스를 선택해주세요');
            return;
        }

        if (!email) {
            toast.error('이메일을 입력해주세요');
            return;
        }

        if (!password) {
            toast.error('패스워드를 입력해주세요');
            return;
        }

        const formData = plainToInstance(UnSignedAccountFormData, dto).toCreateDto();

        accountApi.create(organizationId, formData).then((res) => {
            toast.success('등록되었습니다.');
            refreshAccountList();
            hide();
            form.reset();
        });
    };

    return (
        <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem]">
            <ModalTopbar title="새 계정 등록하기" backBtnOnClick={onBack} topbarPosition="sticky" />
            <AccountForm form={form} isShow={isShow} product={product} onSubmit={onSubmit} />
        </Modal>
    );
});
