import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {FormProvider, useForm} from 'react-hook-form';
import {googleTokenDataAtom} from '^atoms/common';
import {CreateUserRequestDto} from '^models/User/types';
import {invitedOrgIdAtom, isCopiedAtom} from '^v3/V3OrgJoin/atom';
import {SignBizInfoPageRoute} from '^pages/sign/bizInfo';
import {SignUserDetailRoute} from '^pages/sign/detail';
import {
    useCreateUserAuth,
    useInvitedCreateUserAuth,
    useLogin,
} from '^clients/public/home/LandingPages/SignAuthPage/SignAuthPage.atom';
import {NewLandingPageLayout} from '^clients/public/home/LandingPages/NewLandingPageLayout';
import {StepButton} from '../StepButton';
import {NameSection} from './NameSection';
import {EmailSection} from './EmailSection';
import {PhoneNumberSection} from './PhoneNumberSection';
import {JobSection} from './JopSection';
import {AgreeTermModal} from './AgreeTermModal';

export const SignCreateUserAuthPage = () => {
    const {mutate} = useCreateUserAuth();
    const {mutate: inviteMutate} = useInvitedCreateUserAuth();
    const {mutate: loginMutate} = useLogin();
    const [isOpenTermModal, setIsOpenTermModal] = useState(false);
    const [isCodeConfirmed, setIsCodeConfirmed] = useState(false);
    const invitedOrgId = useRecoilValue(invitedOrgIdAtom);
    const isCopied = useRecoilValue(isCopiedAtom);
    const setTokenData = useSetRecoilState(googleTokenDataAtom);
    const tokenData = useRecoilValue(googleTokenDataAtom);
    const router = useRouter();

    const accessToken = tokenData?.accessToken;

    const methods = useForm<CreateUserRequestDto>({
        mode: 'all',
        defaultValues: {
            name: tokenData?.name,
            email: tokenData?.email,
        },
    });

    const {
        reset,
        watch,
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
        methods.handleSubmit((data: CreateUserRequestDto & {code?: string}) => {
            const {code, ...userData} = data;

            if ((!isValid && !isCodeConfirmed) || !accessToken) return;

            /* 로그인
             * 유저 생성 후 로그인.
             * 로그인 이후 상세정보, 조직 생성이 가능
             * */
            const login = (redirectPath: string) => {
                loginMutate(accessToken, {
                    onSuccess: () => {
                        router.replace(redirectPath);
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
                        onSuccess: () => login(SignUserDetailRoute.path()),
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
                        onSuccess: () => login(SignBizInfoPageRoute.path()),
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
                        <span className="text-28 font-bold text-neutral-900">딱 필요한 정보만 받을게요</span>
                        <section className="w-full flex flex-col gap-3">
                            <NameSection />
                            <EmailSection />
                            <PhoneNumberSection
                                isCodeConfirmed={isCodeConfirmed}
                                setIsCodeConfirmed={setIsCodeConfirmed}
                            />
                            <JobSection />
                        </section>
                        <StepButton text="계속" disabled={isTermModalValid} onClick={() => setIsOpenTermModal(true)} />
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
