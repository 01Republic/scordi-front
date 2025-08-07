import {LinkTo} from '^components/util/LinkTo';
import {UserLoginPageRoute} from '^pages/users/login';
import React, {memo} from 'react';
import {FormInput} from '^clients/public/userAuth/common/FormInput';
import {UserLoginRequestDto} from '^models/User/types';
import {Mail} from 'lucide-react';
import {validateEmailRegex} from '^utils/valildation';
import {NewLandingPageLayout} from '^clients/public/home/LandingPages/NewLandingPageLayout';
import cn from 'classnames';
import {FormProvider, useForm} from 'react-hook-form';
import {UserPasswordResetPageRoute} from '^pages/users/password/reset';
import {UserSignUpPageRoute} from '^pages/users/signup';

interface FindPasswordDto {
    email: string;
}

export const FindPasswordPage = memo(() => {
    const methods = useForm<FindPasswordDto>({
        mode: 'all',
    });
    const {watch, handleSubmit} = methods;
    const email = watch('email');
    const isPending = false;

    const onSubmit = (data: FindPasswordDto) => {
        console.log(data);
    };

    return (
        <NewLandingPageLayout pageName="AdditionalInfoPage" hideNav>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col items-center justify-center gap-10 w-[380px]">
                        <span className="text-28 font-bold text-gray-900">비밀번호 찾기</span>
                        <section className="w-full flex flex-col gap-3">
                            <FormInput<FindPasswordDto>
                                name="email"
                                type="text"
                                label="이메일"
                                autoComplete="email"
                                placeholder="가입하신 이메일을 입력해주세요."
                                icon={
                                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-violet-200 text-20" />
                                }
                                validation={{
                                    required: '가입하신 이메일을 입력해주세요.',
                                    pattern: {
                                        value: validateEmailRegex,
                                        message: '유효한 이메일 형식이 아닙니다.',
                                    },
                                }}
                            />

                            <button
                                type="submit"
                                className={cn(
                                    'w-full flex items-center justify-center rounded-lg btn',
                                    !email ? 'btn-white' : ' btn-scordi ',
                                    isPending && 'link_to-loading',
                                )}
                            >
                                <p className="font-semibold text-16 py-3">비밀번호 재설정 이메일 발송</p>
                            </button>

                            <div className="flex justify-between w-full">
                                <LinkTo
                                    href={UserLoginPageRoute.path()}
                                    className="text-gray-500 text-sm hover:underline text-center"
                                >
                                    돌아가기
                                </LinkTo>
                                <LinkTo
                                    href={UserSignUpPageRoute.path()}
                                    className="text-gray-500 text-sm hover:underline text-center"
                                >
                                    회원가입
                                </LinkTo>
                            </div>

                            <LinkTo
                                href={UserPasswordResetPageRoute.path()}
                                className="text-gray-500 text-sm hover:underline text-center"
                            >
                                비밀번호 셋팅
                            </LinkTo>
                        </section>
                    </div>
                </form>
            </FormProvider>
        </NewLandingPageLayout>
    );
});
