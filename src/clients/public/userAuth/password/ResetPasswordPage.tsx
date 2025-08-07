import React, {memo} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import cn from 'classnames';
import {LockKeyhole} from 'lucide-react';
import {LinkTo} from '^components/util/LinkTo';
import {UserLoginPageRoute} from '^pages/users/login';
import {FormInput} from '^clients/public/userAuth/common/FormInput';
import {CreateUserRequestDto} from '^models/User/types';
import {validPasswordRegex} from '^utils/valildation';
import {NewLandingPageLayout} from '^clients/public/home/LandingPages/NewLandingPageLayout';

interface ResetPasswordDto {
    password: string;
    passwordConfirmation: string;
}

export const ResetPasswordPage = memo(() => {
    const methods = useForm<ResetPasswordDto>({
        mode: 'all',
    });
    const {
        watch,
        handleSubmit,
        formState: {isValid},
    } = methods;
    const {password, passwordConfirmation} = watch();
    const isPending = false;

    const onSubmit = (data: ResetPasswordDto) => {
        console.log(data);
    };

    return (
        <NewLandingPageLayout pageName="AdditionalInfoPage" hideNav>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col items-center justify-center gap-10 w-[380px]">
                        <span className="text-28 font-bold text-gray-900">비밀번호 변경</span>
                        <section className="w-full flex flex-col gap-3">
                            <FormInput<CreateUserRequestDto>
                                name="password"
                                type="password"
                                label="비밀번호"
                                autoComplete="password"
                                showTogglePassword
                                icon={
                                    <LockKeyhole className="absolute left-4 top-1/2 transform -translate-y-1/2 text-violet-200 text-20" />
                                }
                                validation={{
                                    required: '비밀번호를 입력해주세요.',
                                    pattern: {
                                        value: validPasswordRegex,
                                        message: '8~20자의 영문, 숫자를 사용해 주세요.',
                                    },
                                }}
                            />
                            <FormInput<CreateUserRequestDto>
                                name="passwordConfirmation"
                                type="password"
                                label="비밀번호 확인"
                                autoComplete="passwordConfirmation"
                                showTogglePassword
                                icon={
                                    <LockKeyhole className="absolute left-4 top-1/2 transform -translate-y-1/2 text-violet-200 text-20" />
                                }
                                validation={{
                                    required: '비밀번호를 확인해주세요',
                                    validate: (value) => {
                                        if (value !== watch('password')) {
                                            return '비밀번호가 일치하지 않습니다.';
                                        }
                                    },
                                }}
                            />

                            <button
                                type="submit"
                                className={cn(
                                    'w-full flex items-center justify-center rounded-lg btn',
                                    !isValid ? 'btn-white' : ' btn-scordi ',
                                    isPending && 'link_to-loading',
                                )}
                            >
                                <p className="font-semibold text-16 py-3">확인</p>
                            </button>
                            <LinkTo
                                href={UserLoginPageRoute.path()}
                                className="text-gray-500 text-sm hover:underline text-center"
                            >
                                로그인 페이지로 돌아가기
                            </LinkTo>
                        </section>
                    </div>
                </form>
            </FormProvider>
        </NewLandingPageLayout>
    );
});
