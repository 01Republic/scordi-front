import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {FormProvider, useForm} from 'react-hook-form';
import {SignUserDetailRoute} from '^pages/sign/detail';
import {OrgCreatePageRoute} from '^pages/orgs/new';
import {googleTokenDataAtom} from '^atoms/common';
import {CreateUserRequestDto} from '^models/User/types';
import {invitedOrgIdAtom, isCopiedAtom} from '^v3/V3OrgJoin/atom';
import {encryptValue} from '^utils/crypto';
import {
    useCreateUserAuth,
    useGoogleLogin,
    useInvitedCreateUserAuth,
    useLogin,
} from '^clients/public/userAuth/UserSignUpPage/SignAuthPage.atom';
import {NewLandingPageLayout} from '^clients/public/home/LandingPages/NewLandingPageLayout';
import {StepButton} from '^clients/public/userAuth/UserSignUpPage/StepButton';
import {NameSection} from './signUpSocialInput/NameSection';
import {EmailSection} from './signUpSocialInput/EmailSection';
import {
    NoTokenEmailSection,
    NoTokenNameSection,
    NoTokenPasswordConfirmSection,
    NoTokenPasswordSection,
} from './signUpEmailInput';
import {PhoneNumberSection} from './PhoneNumberSection';
import {JobSection} from './JobSection';
import {AgreeTermModal} from './AgreeTermModal';

export const SignCreateUserAuthPage = () => {
    const {mutate, isPending} = useCreateUserAuth();
    const {mutate: inviteMutate, isPending: isInvitePending} = useInvitedCreateUserAuth();
    const {mutate: googleLoginMutate, isPending: isGoogleLoginPending} = useGoogleLogin();
    const {mutate: loginMutate, isPending: isLoginPending} = useLogin();
    const [isOpenTermModal, setIsOpenTermModal] = useState(false);
    const [isCodeConfirmed, setIsCodeConfirmed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const invitedOrgId = useRecoilValue(invitedOrgIdAtom);
    const isCopied = useRecoilValue(isCopiedAtom);
    const setTokenData = useSetRecoilState(googleTokenDataAtom);
    const tokenData = useRecoilValue(googleTokenDataAtom);
    const router = useRouter();

    const accessToken = tokenData?.accessToken;

    const methods = useForm<CreateUserRequestDto>({
        mode: 'all',
        defaultValues: {
            name: tokenData?.name || '',
            email: tokenData?.email || '',
            password: '',
            passwordConfirmation: '',
        },
    });

    const {
        reset,
        setError,
        formState: {isValid},
    } = methods;

    useEffect(() => {
        if (!router.isReady) return;
        if (typeof window === 'undefined') return;
        const tokenDataStr = localStorage.getItem('googleTokenData');

        if (tokenDataStr) {
            try {
                const tokenData = JSON.parse(tokenDataStr);
                setTokenData(tokenData);
                localStorage.removeItem('googleTokenData');
            } catch (e) {
                console.error(e);
            }
        }
    }, [setTokenData, router.isReady]);

    useEffect(() => {
        if (tokenData) {
            reset({
                name: tokenData.name,
                email: tokenData.email,
            });
        }
    }, [reset, tokenData?.name, tokenData?.email]);

    const isTermModalValid = isValid && isCodeConfirmed;

    const onSubmit = () => {
        setIsLoading(true);

        methods.handleSubmit((data: CreateUserRequestDto & {code?: string}) => {
            const {code, ...userData} = data;

            if (!tokenData && !accessToken) {
                if (!userData.password) return;
                /* 이메일,패스워드 로그인
                 * 유저 생성 후 로그인.
                 * 로그인 이후 상세정보, 조직 생성이 가능
                 * */
                const login = (email: string, password: string, redirectPath: string) => {
                    loginMutate(
                        {data: {email, password: encryptValue(password)}},
                        {
                            onSuccess: () => {
                                setIsLoading(false);
                                router.push(redirectPath);
                            },
                        },
                    );
                };

                /* 이메일,패스워드 로그인
                 * 유저 생성 후 로그인.
                 * 로그인 이후 상세정보, 조직 생성 가능
                 */
                const encryptedPassword = {
                    ...userData,
                    password: encryptValue(userData.password),
                    passwordConfirmation: userData.passwordConfirmation
                        ? encryptValue(userData.passwordConfirmation)
                        : undefined,
                };

                mutate(
                    {data: encryptedPassword},
                    {
                        onSuccess: () => login(userData.email, userData.password!, OrgCreatePageRoute.path()),
                        onError: (err: any) => {
                            setIsLoading(false);
                            const status = err.response?.status;
                            if (status === 422) {
                                setError('email', {
                                    type: 'server',
                                    message: '이미 가입된 이메일입니다.',
                                });
                            }
                        },
                    },
                );
            }

            if ((!isValid && !isCodeConfirmed) || !accessToken) return;

            /* 구글 로그인
             * 유저 생성 후 로그인.
             * 로그인 이후 상세정보, 조직 생성이 가능
             * */
            const googleLogin = (redirectPath: string) => {
                googleLoginMutate(accessToken, {
                    onSuccess: () => {
                        router.push(redirectPath);
                    },
                });
            };

            /* 초대받은 아이디가 있다면,
             * 초대 회원가입 API로 유저생성 후
             * 상세정보 추가 페이지로 이동
             * */
            if (invitedOrgId) {
                inviteMutate(
                    {
                        data: {
                            phone: data.phone,
                            isAgreeForServiceUsageTerm: data.isAgreeForServiceUsageTerm,
                            isAgreeForPrivacyPolicyTerm: data.isAgreeForPrivacyPolicyTerm,
                            isAgreeForMarketingTerm: data.isAgreeForMarketingTerm,
                            organizationId: invitedOrgId,
                            isFromCopiedLink: isCopied,
                        },
                        accessToken,
                    },
                    {
                        onSuccess: () => googleLogin(SignUserDetailRoute.path()),
                    },
                );
                /* 초대받은 아이디가 없다면,
                 * 신규 회원가입 API로 유저생성 후
                 * 조직 생성 페이지로 이동
                 * */
            } else {
                mutate(
                    {data: userData, accessToken},
                    {
                        onSuccess: () => googleLogin(OrgCreatePageRoute.path()),
                    },
                );
            }
        })();
    };

    return (
        <NewLandingPageLayout pageName="AdditionalInfoPage" hideNav>
            <FormProvider {...methods}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
                    <div className="flex flex-col items-center justify-center gap-10 w-[380px]">
                        <span className="text-28 font-bold text-gray-900">딱 필요한 정보만 받을게요</span>
                        <section className="w-full flex flex-col gap-3">
                            {tokenData ? (
                                <>
                                    <NameSection />
                                    <EmailSection />
                                </>
                            ) : (
                                <>
                                    <NoTokenNameSection />
                                    <NoTokenEmailSection />
                                    <NoTokenPasswordSection />
                                    <NoTokenPasswordConfirmSection />
                                </>
                            )}
                            <PhoneNumberSection
                                isCodeConfirmed={isCodeConfirmed}
                                setIsCodeConfirmed={setIsCodeConfirmed}
                            />
                            <JobSection />
                        </section>
                        <StepButton
                            text="계속"
                            disabled={isTermModalValid}
                            onClick={() => setIsOpenTermModal(true)}
                            isPending={
                                isPending || isGoogleLoginPending || isLoginPending || isInvitePending || isLoading
                            }
                        />
                    </div>
                    <AgreeTermModal
                        isOpenTermModal={isOpenTermModal}
                        setIsOpenTermModal={setIsOpenTermModal}
                        onSubmit={onSubmit}
                    />
                </form>
            </FormProvider>
        </NewLandingPageLayout>
    );
};
