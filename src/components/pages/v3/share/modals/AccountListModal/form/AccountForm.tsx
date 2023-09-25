import React, {memo, useEffect, useState} from 'react';
import {UseFormReturn} from 'react-hook-form';
import {BsChevronDown} from 'react-icons/bs';
import {WithChildren} from '^types/global.type';
import {ProductDto} from '^types/product.type';
import {UnSignedAccountFormData} from '^types/account.type';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {ProductAvatar} from '^v3/share/ProductAvatar';
import {Input} from './Input';
import {PasswordInput} from './PasswordInput';
import {ModalLikeBottomBar} from '^v3/layouts/V3ModalLikeLayout.mobile/ModalLikeBottomBar';

interface AccountFormProps extends WithChildren {
    form: UseFormReturn<UnSignedAccountFormData, any>;
    isShow: boolean;
    product: ProductDto | null;
    onSubmit: (dto: UnSignedAccountFormData) => any;
}

export const AccountForm = memo((props: AccountFormProps) => {
    const {form, isShow, product, onSubmit} = props;
    const [isAdvancedInputsShow, setIsAdvancedInputsShow] = useState(false);

    // 기본적으로 디테일 인풋은 접혀있는 상태
    useEffect(() => {
        setIsAdvancedInputsShow(false);
    }, [isShow]);

    return (
        <>
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
                            <PasswordInput form={form} isShow={isShow} />

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
        </>
    );
});
