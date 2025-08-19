import React, {memo, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {LockKeyhole, Mail} from 'lucide-react';
import {UserLoginRequestDto} from '^models/User/types';
import {useLogin, useUser} from '^clients/public/userAuth/UserSignUpPage/SignAuthPage.atom';
import {validateEmailRegex, validPasswordRegex} from '^utils/valildation';
import {FormInput} from '^clients/public/userAuth/common/FormInput';
import Link from 'next/link';
import {UserPasswordFindPageRoute} from '^pages/users/password/find';
import {SignAuthCreateUserPageRoute} from '^pages/sign/createUser';
import {encryptValue} from '^utils/crypto';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {invitedOrgIdAtom} from '^v3/V3OrgJoin/atom';
import {googleTokenDataAtom} from '^atoms/common';
import {inviteMembershipApi} from '^models/Membership/api';
import {useRouter} from 'next/router';
import {OrgMainPageRoute} from '^pages/orgs/[id]';

export const EmailLoginSection = memo(() => {
    const router = useRouter();
    const invitedOrgId = useRecoilValue(invitedOrgIdAtom);
    const setTokenData = useSetRecoilState(googleTokenDataAtom);
    const {mutate: loginMutate, isPending: isLoginPending} = useLogin();
    const {mutate: userMutate, isPending: isUserPending} = useUser();
    const [isLoading, setIsLoading] = useState(false);
    const methods = useForm<UserLoginRequestDto>({
        mode: 'onChange',
    });
    const {
        handleSubmit,
        setError,
        clearErrors,
        formState: {isValid},
    } = methods;

    const onSubmit = (data: UserLoginRequestDto) => {
        setIsLoading(true);
        clearErrors(['email', 'password']);

        const encryptedPassword = {
            ...data,
            password: encryptValue(data.password),
        };

        loginMutate(encryptedPassword, {
            onSuccess: () => {
                if (invitedOrgId) {
                    inviteMembershipApi
                        .validate(invitedOrgId, data.email)
                        .then(() => {
                            setIsLoading(false);
                            router.push(OrgMainPageRoute.path(invitedOrgId));
                        })
                        .catch(() => {
                            setIsLoading(false);
                            setError('email', {
                                type: 'server',
                                message: `입력된 ${data.email}계정은 초대받은 계정이 아닙니다.`,
                            });
                        });
                } else {
                    userMutate();
                }
            },
            onError: (err: any) => {
                setIsLoading(false);
                const status = err.response?.status;
                if (status === 404) {
                    setError('email', {
                        type: 'server',
                        message: '등록된 이메일이 없습니다.',
                    });
                } else if (status === 401) {
                    setError('password', {
                        type: 'server',
                        message: '비밀번호가 일치하지 않습니다.',
                    });
                }
            },
        });
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-5">
                <FormInput<UserLoginRequestDto>
                    name="email"
                    type="text"
                    label="이메일"
                    autoComplete="email"
                    icon={
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-violet-200 text-20" />
                    }
                    validation={{
                        required: '이메일을 입력해주세요.',
                        pattern: {
                            value: validateEmailRegex,
                            message: '유효한 이메일 형식이 아닙니다.',
                        },
                    }}
                />
                <FormInput<UserLoginRequestDto>
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
                <button
                    type="submit"
                    className={`btn btn-lg btn-block  flex items-center justify-center font-medium  ${
                        !isValid ? 'btn-disabled2' : 'btn-scordi'
                    } ${isLoading || isLoginPending || isUserPending ? 'link_to-loading' : ''}`}
                >
                    로그인
                </button>
                <div className="flex w-full items-center justify-center gap-2">
                    <Link
                        href={SignAuthCreateUserPageRoute.path()}
                        onClick={() => setTokenData(null)}
                        className="btn-link text-center text-gray-400 hover:text-gray-500 !no-underline hover:underline text-14"
                    >
                        회원가입
                    </Link>
                    <span className="text-gray-400">|</span>
                    <Link
                        href={UserPasswordFindPageRoute.path()}
                        className="btn-link text-center text-gray-400 hover:text-gray-500 !no-underline hover:underline text-14"
                    >
                        비밀번호 찾기
                    </Link>
                </div>
            </form>
        </FormProvider>
    );
});
