import React, {memo, useEffect, useState} from 'react';
import {LandingPageLayout} from '../LandingPageLayout';
import {useRouter} from 'next/router';
import {useForm} from 'react-hook-form';
import {patchPhoneAuthSession} from '^api/authlization';
import {SendPhoneAuthMessageDto, UserSocialSignUpRequestDto} from '^types/user.type';
import {toast} from 'react-toastify';
import {useRecoilState, useRecoilValue} from 'recoil';
import {codeSentState, isTermModalOpenedState, phoneAuthDataState, useSendCode} from './BetaSignPhoneAuthPage.atom';
import {PhoneNumberInput} from './PhoneNumberInput';
import {AuthCodeInput} from './AuthCodeInput';
import {TermModal} from '^components/pages/LandingPages/BetaSignPhoneAuthPage/TermModal';
import {GoogleSignedUserData} from '^atoms/currentUser.atom';
import {postUser} from '^api/session.api';
import {WelcomePageRoute} from '^pages/users/signup/welcome';
import {errorNotify} from '^utils/toast-notify';
import {useSocialLogin} from '^hooks/useCurrentUser';
import {SignWelcomePageRoute} from '^pages/sign/welcome';
import {useTranslation} from 'next-i18next';

export const BetaSignPhoneAuthPage = memo(() => {
    const router = useRouter();
    const socialLogin = useSocialLogin();
    const phoneAuthData = useRecoilValue(phoneAuthDataState);
    const form = useForm<UserSocialSignUpRequestDto>();
    const [isOpened, setIsOpened] = useRecoilState(isTermModalOpenedState);
    const [isLastConfirmable, setIsLastConfirmable] = useState<boolean>(false);
    const {t} = useTranslation('sign');

    useEffect(() => {
        const gmailProfileData = window.localStorage.getItem('scordi/tasting/gmailProfile');
        if (!gmailProfileData) return;

        const gmailProfile = JSON.parse(gmailProfileData) as GoogleSignedUserData;
        form.setValue('provider', 'google');
        form.setValue('uid', gmailProfile.id);
        form.setValue('email', gmailProfile.email);
        form.setValue('name', gmailProfile.name);
        form.setValue('profileImageUrl', gmailProfile.picture);
    }, []);

    useEffect(() => {
        form.setValue('phone', phoneAuthData.phoneNumber);
    }, [phoneAuthData.phoneNumber]);

    // 인증 완료 후 최종 가입시도
    const onLastSubmit = (data: UserSocialSignUpRequestDto) => {
        if (!data.isAgreeForServiceUsageTerm || !data.isAgreeForPrivacyPolicyTerm) {
            setIsOpened(true);
            return;
        }

        postUser(data)
            .then(() => {
                socialLogin({provider: data.provider, uid: data.uid})
                    .then(() => router.push(SignWelcomePageRoute.path()))
                    .catch(errorNotify);
            })
            .catch(errorNotify);
    };

    // 약관 동의 모달 완료
    const agreeModalOnConfirm = () => onLastSubmit(form.getValues());

    return (
        <LandingPageLayout pageName="BetaSignPhoneAuthPage">
            <div className="mx-auto text-center py-20 w-full max-w-lg space-y-5 min-h-[100vh]">
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
                            onClick={agreeModalOnConfirm}
                        >
                            {t('phone_auth.start_with_phone_number')}
                        </button>
                    </div>
                </div>
            </div>

            <TermModal form={form} onConfirm={agreeModalOnConfirm} />
        </LandingPageLayout>
    );
});
