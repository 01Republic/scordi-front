import React, {memo, useEffect, useState} from 'react';
import {ProductAvatar} from '^v3/share/ProductAvatar';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {ModalLikeTopbar} from '^v3/layouts/V3ModalLikeLayout.mobile/ModalLikeTopbar';
import {ModalLikeBottomBar} from '^v3/layouts/V3ModalLikeLayout.mobile/ModalLikeBottomBar';
import {useForm} from 'react-hook-form';
import {toast} from 'react-toastify';
import {BsChevronDown} from 'react-icons/bs';
import {plainToInstance} from 'class-transformer';
import {UnSignedAccountFormData} from '^types/account.type';
import {accountApi} from '^api/account.api';
import {useAccounts} from '^hooks/useAccounts';
import {useAccountEditModal} from './hook';
import {Input} from './Input';
import {PasswordInput} from './PasswordInput';

export const AccountEditModal = memo(() => {
    const form = useForm<UnSignedAccountFormData>();
    const {isShow, Modal, hide, data} = useAccountEditModal();
    const {search} = useAccounts();
    const onBack = () => hide();
    const [isAdvancedInputsShow, setIsAdvancedInputsShow] = useState(false);
    const {product, account} = data;

    // 기본적으로 디테일 인풋은 접혀있는 상태
    useEffect(() => {
        setIsAdvancedInputsShow(false);
    }, [isShow]);

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

                            <Input
                                type="email"
                                label="아이디"
                                formObj={form}
                                name="email"
                                required
                                autoFocus
                                autoComplete="off"
                            />
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
