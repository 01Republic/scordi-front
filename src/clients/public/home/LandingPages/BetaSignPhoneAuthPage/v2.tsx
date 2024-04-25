import React, {memo, useEffect, useState} from 'react';
import {useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState} from 'recoil';
import {useRouter} from 'next/router';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'next-i18next';
import {CgSpinner} from 'react-icons/cg';
import {ApiError} from '^api/api';
import {LandingPageLayout} from '../LandingPageLayout';
import {codeConfirmedState, isTermModalOpenedState, phoneAuthDataState} from './BetaSignPhoneAuthPage.atom';
import {PhoneNumberInput} from './PhoneNumberInput';
import {AuthCodeInput} from './AuthCodeInput';
import {errorNotify} from '^utils/toast-notify';
import {invitedOrgIdAtom, isCopiedAtom} from '^v3/V3OrgJoin/atom';
import {googleAccessTokenAtom} from '^components/pages/UsersLogin/atom';
import {userSocialGoogleApi} from '^api/social-google.api';
import {TermModalV2} from '^clients/public/home/LandingPages/BetaSignPhoneAuthPage/TermModalV2';
import {useSocialLoginV2} from '^models/User/hook';
import {UserGoogleSocialSignUpRequestDtoV2} from '^models/User/types';
import {V3OrgJoinErrorPageRoute} from '^pages/v3/orgs/[orgId]/error';
import {SignWelcomePageRoute} from '^pages/sign/welcome';
import Link from 'next/link';
import {useAlert} from '^hooks/useAlert';

export const BetaSignPhoneAuthPage2 = memo(() => {
    const router = useRouter();
    const socialLoginV2 = useSocialLoginV2();
    const [googleAccessToken, setGoogleAccessToken] = useRecoilState(googleAccessTokenAtom);
    const phoneAuthData = useRecoilValue(phoneAuthDataState);
    const invitedOrgId = useRecoilValue(invitedOrgIdAtom);
    const [orgNameInputDisplay, setOrgNameInputDisplay] = useState(false);
    const form = useForm<UserGoogleSocialSignUpRequestDtoV2>();
    const setIsOpened = useSetRecoilState(isTermModalOpenedState);
    const codeConfirmed = useRecoilValue(codeConfirmedState);
    const isCopied = useRecoilValue(isCopiedAtom);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {t} = useTranslation('sign');
    const [pageLoaded, setPageLoaded] = useState(false);
    const resetGoogleCode = useResetRecoilState(googleAccessTokenAtom);

    useEffect(() => {
        if (!router.isReady) return;
        if (typeof window === 'undefined') return;

        const accessToken = window.localStorage.getItem('accessToken');
        if (accessToken) {
            setGoogleAccessToken(accessToken);
            setPageLoaded(true);
            window.localStorage.removeItem('accessToken');
        }
    }, [router.isReady]);

    useEffect(() => {
        form.setValue('phone', phoneAuthData.phoneNumber);
    }, [phoneAuthData.phoneNumber]);

    // 가입 후처리 콜백
    const findOrCreateUserCallback = async () => {
        if (!googleAccessToken || isLoading) return;

        setIsLoading(true);
        // 정상적인 온보딩 플로우
        await socialLoginV2(googleAccessToken)
            .then(() => router.replace(SignWelcomePageRoute.path()))
            .catch(errorNotify)
            .finally(() => setIsLoading(false));
    };

    // 인증 완료 후 최종 가입시도
    const onLastSubmit = (data: UserGoogleSocialSignUpRequestDtoV2) => {
        if (!googleAccessToken) return;

        if (!data.isAgreeForServiceUsageTerm || !data.isAgreeForPrivacyPolicyTerm) {
            setIsOpened(true);
            return;
        }

        const {signUp: googleSignUp, signUpInvited: googleSignUpInvited, show: findByGoogleToken} = userSocialGoogleApi;

        // 먼저 이메일을 통해 가입여부를 확인하고
        findByGoogleToken(googleAccessToken)
            .then((res) => {
                // 가입된 사용자라면 후처리 로직만 실행하고
                const user = res.data;
                if (user.lastSignedOrgId) {
                    // toast.info('가입한 계정이 있어 기존 계정으로 진행합니다.');
                    findOrCreateUserCallback();
                } else {
                    alert('[에러] 조직이 설정되지 않은 사용자입니다.\n관리자에게 문의해주세요.');
                }
            })
            .catch((err: ApiError) => {
                console.log({err});
                // 기존에 가입되어있지 않은 사용자라면
                if (err?.response?.data?.status === 404) {
                    // 가입을 시킵니다.
                    // 초대된 회원의 경우 다른 API를 사용합니다.
                    if (invitedOrgId) {
                        googleSignUpInvited(googleAccessToken, {
                            organizationId: invitedOrgId,
                            isFromCopiedLink: isCopied,
                            ...data,
                        })
                            .then(findOrCreateUserCallback)
                            .catch(() => router.push(V3OrgJoinErrorPageRoute.path(invitedOrgId)))
                            .finally(resetGoogleCode);
                    } else {
                        ////////
                        if (!data.organizationName?.trim()) {
                            setIsOpened(false);
                            setOrgNameInputDisplay(true);
                            return;
                        }
                        googleSignUp(googleAccessToken, data)
                            .then(findOrCreateUserCallback)
                            .catch((err: ApiError) => {
                                console.log('가입 catch', err);
                                errorNotify(err);
                            })
                            .finally(resetGoogleCode);
                    }
                } else {
                    errorNotify(err);
                }
            });
    };

    // 약관 동의 모달 완료
    const agreeModalOnConfirm = () => onLastSubmit(form.getValues());

    if (!pageLoaded) {
        return (
            <LandingPageLayout pageName="BetaSignPhoneAuthPage">
                <div className="mx-auto text-center py-20 w-full max-w-lg space-y-5">
                    <h1
                        className="text-2xl sm:text-4xl mb-8 font-bold"
                        dangerouslySetInnerHTML={{__html: t('auth_check.page_title')}}
                    />
                </div>
            </LandingPageLayout>
        );
    }

    // 조직명 인풋이 활성화 되는 경우, 조직명을 받는 화면 모드로 전환된다. (약관모달 확인 직후)
    if (orgNameInputDisplay) {
        return (
            <LandingPageLayout pageName="BetaSignPhoneAuthPage">
                <div className="mx-auto text-center py-20 w-full max-w-lg space-y-5">
                    <h1
                        className="text-3xl sm:text-4xl font-bold leading-loose"
                        onClick={() => {
                            console.log(form.getValues());
                        }}
                    >
                        <span className="block mb-2">워크스페이스의 이름은</span>
                        <span className="block">무엇으로 할까요?</span>
                    </h1>

                    <div className="p-4">
                        <div className="mx-auto mb-14">
                            {/* 워크스페이스 이름 설정 */}
                            <div className="form-control relative mb-6">
                                <input
                                    type="text"
                                    className={`input sm:input-lg input-bordered flex-grow`}
                                    {...form.register('organizationName')}
                                    placeholder="ex. 제로원리퍼블릭"
                                    required
                                    onKeyUp={(e) => {
                                        if (e.key === 'Enter') {
                                            form.watch('organizationName') && agreeModalOnConfirm();
                                        }
                                    }}
                                />
                            </div>
                        </div>

                        {form.watch('organizationName') ? (
                            <button
                                type="submit"
                                className="btn sm:btn-lg btn-block btn-scordi-500 normal-case disabled:!bg-slate-100 disabled:!border-slate-300"
                                disabled={!form.watch('phone') || !codeConfirmed || isLoading}
                                onClick={() => agreeModalOnConfirm()}
                            >
                                {form.watch('organizationName')} (으)로 시작하기
                            </button>
                        ) : (
                            <button
                                className="btn sm:btn-lg btn-block btn-scordi-500 normal-case disabled:!bg-slate-100 disabled:!border-slate-300"
                                disabled
                            >
                                이름을 입력해주세요
                            </button>
                        )}
                    </div>
                </div>
            </LandingPageLayout>
        );
    }

    return (
        <LandingPageLayout pageName="BetaSignPhoneAuthPage">
            <div className="mx-auto text-center py-20 w-full max-w-lg space-y-5">
                <h1
                    className="text-3xl sm:text-4xl font-bold"
                    onClick={() => {
                        console.log(form.getValues());
                    }}
                    dangerouslySetInnerHTML={{__html: t('phone_auth.page_title')}}
                />
                <p
                    className="font-normal text-gray-600 block mt-4 pb-4 text-lg sm:text-2xl"
                    dangerouslySetInnerHTML={{__html: t('phone_auth.page_subtitle')}}
                />

                <div className="p-4">
                    <form className="mx-auto mb-14">
                        {/* Phone Number */}
                        <PhoneNumberInput />

                        {/* Auth Code */}
                        <AuthCodeInput />
                    </form>

                    <button
                        className="btn sm:btn-lg btn-block btn-scordi-500 normal-case disabled:!bg-slate-100 disabled:!border-slate-300"
                        disabled={!form.watch('phone') || !codeConfirmed || isLoading}
                        onClick={() => !isLoading && agreeModalOnConfirm()}
                    >
                        {isLoading ? (
                            <CgSpinner size={28} className="animate-spin" />
                        ) : (
                            <>{t('phone_auth.start_with_phone_number')}</>
                        )}
                    </button>
                </div>
            </div>

            <hr />

            <TermModalV2 form={form} onConfirm={agreeModalOnConfirm} />
        </LandingPageLayout>
    );
});
