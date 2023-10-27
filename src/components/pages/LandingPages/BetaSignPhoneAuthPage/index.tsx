import React, {memo, useEffect, useState} from 'react';
import {LandingPageLayout} from '../LandingPageLayout';
import {useRouter} from 'next/router';
import {useForm} from 'react-hook-form';
import {UserDto, UserSocialSignUpRequestDto} from '^types/user.type';
import {toast} from 'react-toastify';
import {useRecoilState, useRecoilValue} from 'recoil';
import {codeConfirmedState, isTermModalOpenedState, phoneAuthDataState} from './BetaSignPhoneAuthPage.atom';
import {PhoneNumberInput} from './PhoneNumberInput';
import {AuthCodeInput} from './AuthCodeInput';
import {TermModal} from '^components/pages/LandingPages/BetaSignPhoneAuthPage/TermModal';
import {GoogleSignedUserData} from '^atoms/currentUser.atom';
import {createInvitedUser, findUserByEmail, postUser} from '^api/session.api';
import {errorNotify} from '^utils/toast-notify';
import {useSocialLogin} from '^hooks/useCurrentUser';
import {SignWelcomePageRoute} from '^pages/sign/welcome';
import {useTranslation} from 'next-i18next';
import {createInvoiceAccount} from '^api/invoiceAccount.api';
import {gmailAccessTokenDataAtom} from '^hooks/useGoogleAccessToken';
import {GmailAgent} from '^api/tasting.api';
import {getCreateInvoiceAccountFromTo} from '^types/invoiceAccount.type';
import {ApiError} from '^api/api';
import {BetaSignSocialPageRoute} from '^pages/sign/social';
import {invitedOrgIdAtom} from '^v3/V3OrgJoin/atom';

export const BetaSignPhoneAuthPage = memo(() => {
    const router = useRouter();
    const socialLogin = useSocialLogin();
    const accessTokenData = useRecoilValue(gmailAccessTokenDataAtom);
    const phoneAuthData = useRecoilValue(phoneAuthDataState);
    const invitedOrgId = useRecoilValue(invitedOrgIdAtom);
    const form = useForm<UserSocialSignUpRequestDto>();
    const [isOpened, setIsOpened] = useRecoilState(isTermModalOpenedState);
    const codeConfirmed = useRecoilValue(codeConfirmedState);
    const {t} = useTranslation('sign');
    const [pageLoaded, setPageLoaded] = useState(false);

    useEffect(() => {
        console.log('\ninvited from', invitedOrgId);
        const gmailProfileData = window.localStorage.getItem('scordi/tasting/gmailProfile');
        if (!gmailProfileData) {
            router.replace(BetaSignSocialPageRoute.path());
            return;
        }

        const gmailProfile = JSON.parse(gmailProfileData) as GoogleSignedUserData;
        form.setValue('provider', 'google');
        form.setValue('uid', gmailProfile.id);
        form.setValue('email', gmailProfile.email);
        form.setValue('name', gmailProfile.name);
        form.setValue('profileImageUrl', gmailProfile.picture);
        setPageLoaded(true);
    }, []);

    useEffect(() => {
        form.setValue('phone', phoneAuthData.phoneNumber);
    }, [phoneAuthData.phoneNumber]);

    // 가입 후처리 콜백
    const findOrCreateUserCallback = (user: UserDto, data: UserSocialSignUpRequestDto) => {
        /*
         * 가입이 완료되면 (accessTokenData 가 존재하는 경우)
         * 가입한 회원의 조직에 인보이스메일계정을 기본으로 하나 생성합니다.
         */
        if (accessTokenData) {
            const organizationId = invitedOrgId || user.orgId;
            const gmailAgent = new GmailAgent(accessTokenData);
            gmailAgent.getProfile().then(async (userData) => {
                const tokenData = gmailAgent.accessTokenData;
                return createInvoiceAccount(organizationId, {
                    email: userData.email,
                    image: userData.picture,
                    tokenData: {
                        accessToken: tokenData.access_token,
                        refreshToken: tokenData.refresh_token,
                        expireAt: tokenData.expireAt,
                    },
                    gmailQueryOptions: getCreateInvoiceAccountFromTo(),
                });
            });
        }

        // 정상적인 온보딩 플로우
        socialLogin({provider: data.provider, uid: data.uid})
            .then(() => router.push(SignWelcomePageRoute.path()))
            .catch(errorNotify);
    };

    // 인증 완료 후 최종 가입시도
    const onLastSubmit = (data: UserSocialSignUpRequestDto) => {
        if (!data.isAgreeForServiceUsageTerm || !data.isAgreeForPrivacyPolicyTerm) {
            setIsOpened(true);
            return;
        }

        // 먼저 이메일을 통해 가입여부를 확인하고
        findUserByEmail(data.email)
            .then((res) => {
                // 가입된 사용자라면 후처리 로직만 실행하고
                const user = res.data;
                if (user.orgId) {
                    toast.info('가입한 계정이 있어 기존 계정으로 진행합니다.');
                    findOrCreateUserCallback(user, data);
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
                    if (!invitedOrgId) throw Error('test error');
                    if (invitedOrgId) {
                        createInvitedUser({organizationId: invitedOrgId, ...data})
                            .then((res) => {
                                findOrCreateUserCallback(res.data, data);
                            })
                            .catch((err: ApiError) => {
                                errorNotify(err);
                            });
                    } else {
                        postUser(data)
                            .then((res) => {
                                console.log('가입 then', res);
                                findOrCreateUserCallback(res.data, data);
                            })
                            .catch((err: ApiError) => {
                                console.log('가입 catch', err);
                                errorNotify(err);
                            });
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

    return (
        <LandingPageLayout pageName="BetaSignPhoneAuthPage">
            <div className="mx-auto text-center py-20 w-full max-w-lg space-y-5">
                <h1
                    className="text-2xl sm:text-4xl mb-8 font-bold"
                    onClick={() => {
                        console.log(form.getValues());
                    }}
                    dangerouslySetInnerHTML={{__html: t('phone_auth.page_title')}}
                />

                <div className="p-4">
                    <form className="mx-auto mb-14">
                        {/* Phone Number */}
                        <PhoneNumberInput />

                        {/* Auth Code */}
                        <AuthCodeInput />
                    </form>

                    <div>
                        <button
                            className="btn sm:btn-lg btn-block btn-scordi-500 normal-case disabled:!bg-slate-100 disabled:!border-slate-300"
                            disabled={!form.watch('phone') || !codeConfirmed}
                            onClick={agreeModalOnConfirm}
                        >
                            {t('phone_auth.start_with_phone_number')}
                        </button>
                    </div>
                </div>
            </div>

            <hr />

            <TermModal form={form} onConfirm={agreeModalOnConfirm} />
        </LandingPageLayout>
    );
});
