import React, {memo, useState} from 'react';
import {Mail} from 'lucide-react';
import cn from 'classnames';
import {FormProvider, SubmitHandler, useForm} from 'react-hook-form';
import {LinkTo} from '^components/util/LinkTo';
import {UserLoginPageRoute} from '^pages/users/login';
import {UserPasswordResetPageRoute} from '^pages/users/password/reset';
import {UserSignUpPageRoute} from '^pages/users/signup';
import {validateEmailRegex} from '^utils/valildation';
import {useUserPasswordReset} from '^models/User/hook';
import {FormInput} from '^clients/public/userAuth/common/FormInput';
import {NewLandingPageLayout} from '^clients/public/home/LandingPages/NewLandingPageLayout';

export const FindPasswordPage = memo(() => {
    const [successMessage, setSuccessMessage] = useState('');
    const {mutateAsync, isPending} = useUserPasswordReset();
    const methods = useForm<{email: string}>({
        mode: 'all',
    });
    const {watch, handleSubmit, setError} = methods;
    const email = watch('email');

    const onSubmit: SubmitHandler<{email: string}> = ({email}) => {
        setSuccessMessage('');
        mutateAsync(email, {
            onSuccess: () => {
                setSuccessMessage('메일이 발송되었습니다. 메일을 확인해주세요.');
            },
            onError: (e) => {
                console.log(e);
                setError('email', {type: 'server', message: '가입된 이메일이 아닙니다.'});
            },
        });
    };

    return (
        <NewLandingPageLayout pageName="AdditionalInfoPage" hideNav>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col items-center justify-center gap-10 w-[380px]">
                        <span className="text-28 font-bold text-gray-900">비밀번호 찾기</span>
                        <section className="w-full flex flex-col gap-3">
                            <FormInput<{email: string}>
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
                            {successMessage && (
                                <span className="font-normal text-12 text-gray-500">{successMessage}</span>
                            )}

                            <button
                                type="submit"
                                className={cn(
                                    'w-full flex items-center justify-center rounded-lg btn',
                                    !email ? 'btn-disabled2' : ' btn-scordi ',
                                    isPending && 'link_to-loading',
                                )}
                            >
                                <p className="font-semibold text-16 py-3">
                                    {successMessage ? '재발송' : '비밀번호 재설정 이메일 발송'}
                                </p>
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
