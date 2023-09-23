import React, {memo, useEffect} from 'react';
import {useModal} from '^v3/share/modals/useModal';
import {atom, useRecoilValue} from 'recoil';
import {subjectProductOfAccountsInModalState} from '^v3/share/modals/AccountListModal/atom';
import {useForm} from 'react-hook-form';
import {UnSignedAccountFormData} from '^types/account.type';
import {accountApi} from '^api/account.api';
import {orgIdParamState} from '^atoms/common';
import {plainToInstance} from 'class-transformer';
import {useAccounts} from '^hooks/useAccounts';
import {ProductAvatar} from '^v3/share/ProductAvatar';

export const accountCreateModalShowAtom = atom({
    key: 'accountCreateModalShowAtom',
    default: false,
});

export const AccountCreateModal = memo(() => {
    const orgId = useRecoilValue(orgIdParamState);
    const form = useForm<UnSignedAccountFormData>();
    const {Modal, close} = useModal({
        isShowAtom: accountCreateModalShowAtom,
    });
    const product = useRecoilValue(subjectProductOfAccountsInModalState);
    const {search} = useAccounts();

    const onBack = () => close();

    useEffect(() => {
        if (!product) return;
        form.setValue('productId', product.id);
    }, [product]);

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

    const onSubmit = (data: UnSignedAccountFormData) => {
        const {productId} = data;
        if (!productId) {
            alert('무언가 잘못되었습니다. 스코디팅에게 문의해주세요!');
            return;
        }

        const formData = plainToInstance(UnSignedAccountFormData, data);
        accountApi.create(orgId, {sign: formData.sign, productId}).then(() => {
            search({where: {productId}, itemsPerPage: 0}, true).finally(() => onBack());
        });
    };

    return (
        <Modal>
            <h3 className="font-bold text-xl">새 계정 등록하기</h3>
            <div className="pt-8">
                <form className="flex flex-col gap-4">
                    <input type="hidden" {...form.register('productId')} />

                    <div className="w-full">
                        {product && (
                            <div className="w-full sm:grid grid-cols-3">
                                <div className="col-span-1 mb-2">서비스</div>
                                <div className="col-span-2">
                                    <div className="mb-2 p-4 bg-scordi-light-100 rounded-lg">
                                        <ProductAvatar product={product} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="w-full sm:grid grid-cols-3">
                        <div className="col-span-1 mb-2">아이디</div>
                        <div className="col-span-2">
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                {...form.register('email')}
                                required
                                autoFocus
                            />
                        </div>
                    </div>

                    <div className="w-full sm:grid grid-cols-3">
                        <div className="col-span-1 mb-2">비밀번호</div>
                        <div className="col-span-2">
                            <input
                                type="password"
                                className="input input-bordered w-full"
                                {...form.register('password')}
                                required
                            />
                        </div>
                    </div>

                    {/* [optional] 사용자 (member multi-select) */}
                    <div className="w-full sm:grid grid-cols-3">
                        <div className="col-span-1 mb-2">사용자</div>
                        <div className="col-span-2">
                            <input type="text" className="input input-bordered w-full" />
                        </div>
                    </div>

                    {/* [optional] 로그인 페이지 링크 */}
                    <div className="w-full sm:grid grid-cols-3">
                        <div className="col-span-1 mb-2">로그인 페이지 링크</div>
                        <div className="col-span-2">
                            <input type="text" className="input input-bordered w-full" />
                        </div>
                    </div>

                    {/* [optional] 로그인방법 (dynamic tag 방식) */}
                    <div className="w-full sm:grid grid-cols-3">
                        <div className="col-span-1 mb-2">구분</div>
                        <div className="col-span-2">
                            <input type="text" className="input input-bordered w-full" />
                        </div>
                    </div>

                    {/* [optional] 메모 */}
                    <div className="w-full sm:grid grid-cols-3">
                        <div className="col-span-1 mb-2">메모</div>
                        <div className="col-span-2">
                            <input type="text" className="input input-bordered w-full" />
                        </div>
                    </div>

                    <br />

                    <div className="grid grid-cols-2 gap-3">
                        <button type="button" onClick={onBack} className="btn btn-block btn-lg sm:btn-md">
                            닫기
                        </button>
                        <button
                            type="button"
                            onClick={form.handleSubmit(onSubmit)}
                            className="btn btn-block btn-lg sm:btn-md btn-scordi"
                        >
                            저장
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
});
