import React, {memo, useEffect, useState} from 'react';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {ModalLikeTopbar} from '^v3/layouts/V3ModalLikeLayout.mobile/ModalLikeTopbar';
import {useAccountEditModal} from './atom';
import {ProductAvatar} from '^v3/share/ProductAvatar';
import {useForm} from 'react-hook-form';
import {UnSignedAccountFormData} from '^types/account.type';
import {ModalLikeBottomBar} from '^v3/layouts/V3ModalLikeLayout.mobile/ModalLikeBottomBar';
import {Input} from '^v3/share/modals/AccountListModal/AccountEditModal/Input';
import {BsChevronDown, BsEye, BsEyeSlash} from 'react-icons/bs';
import {accountApi} from '^api/account.api';
import {plainToInstance} from 'class-transformer';
import {useAccounts} from '^hooks/useAccounts';
import {PasswordInput} from '^v3/share/modals/AccountListModal/AccountEditModal/PasswordInput';
import {toast} from 'react-toastify';

export const AccountEditModal = memo(() => {
    const form = useForm<UnSignedAccountFormData>();
    const {isShow, Modal, hide, data} = useAccountEditModal();
    const {search} = useAccounts();
    const {product, account} = data;
    const onBack = () => hide();
    const [isAdvancedInputsShow, setIsAdvancedInputsShow] = useState(false);

    useEffect(() => {
        setIsAdvancedInputsShow(false);
    }, [isShow]);

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

    const onSubmit = (data: UnSignedAccountFormData) => {
        if (!account) return;
        const {organizationId, id} = account;
        const {productId} = data;

        const formData = plainToInstance(UnSignedAccountFormData, data).toUpdateDto();
        accountApi.update(organizationId, id, formData).then(() => {
            toast.success('저장되었습니다.');
            search({where: {productId}, itemsPerPage: 0}, true).finally(() => onBack());
        });
    };

    return (
        <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem]">
            <ModalLikeTopbar title="계정 정보 변경" backBtnOnClick={onBack} topbarPosition="sticky" />
            <MobileSection.List>
                <MobileSection.Item className="border-b-0">
                    <MobileSection.Padding>
                        <form className="flex flex-col gap-4">
                            <input type="hidden" {...form.register('productId')} />

                            <div className="w-full">
                                {product && (
                                    <div className="w-full">
                                        <div className="col-span-1 mb-2">서비스</div>
                                        <div className="col-span-2">
                                            <div className="mb-2 p-4 bg-scordi-light-100 rounded-lg">
                                                <ProductAvatar product={product} />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <Input type="email" label="아이디" formObj={form} name="email" required autoFocus />
                            <PasswordInput form={form} />

                            {!isAdvancedInputsShow && (
                                <p
                                    className="text-sm text-gray-500 flex justify-center items-center gap-2 cursor-pointer"
                                    onClick={() => setIsAdvancedInputsShow(true)}
                                >
                                    <span>더 입력하기</span>
                                    <BsChevronDown />
                                </p>
                            )}

                            <div className={`flex flex-col gap-4 ${isAdvancedInputsShow ? '' : 'hidden'}`}>
                                {/* [optional] 사용자 (member multi-select) */}
                                <div className="w-full">
                                    <div className="col-span-1">사용자</div>
                                    <div className="col-span-2 mb-4">
                                        <input
                                            type="text"
                                            className="input input-underline w-full px-0 h-[2.5rem] font-[500] text-xl"
                                        />
                                        <span />
                                    </div>
                                </div>

                                {/* [optional] 로그인 페이지 링크 */}
                                <Input type="url" label="로그인 페이지 링크" formObj={form} name="loginPageUrl" />

                                {/* [optional] 로그인방법 (dynamic tag 방식) */}
                                <div className="w-full">
                                    <div className="col-span-1 mb-2">구분</div>
                                    <div className="col-span-2 mb-4">
                                        <input
                                            type="text"
                                            className="input input-underline w-full px-0 h-[2.5rem] font-[500] text-xl"
                                        />
                                        <span />
                                    </div>
                                </div>

                                {/* [optional] 메모 */}
                                <Input type="text" label="메모" formObj={form} name="memo" />
                            </div>

                            <br />
                        </form>
                    </MobileSection.Padding>
                </MobileSection.Item>
            </MobileSection.List>

            <ModalLikeBottomBar
                className={isAdvancedInputsShow ? `sticky bottom-0` : ''}
                style={{background: 'linear-gradient(0, white, transparent)'}}
            >
                <button onClick={form.handleSubmit(onSubmit)} className="btn btn-lg btn-block btn-scordi capitalize">
                    저장하기
                </button>
            </ModalLikeBottomBar>
        </Modal>
    );
});
