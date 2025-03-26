import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {FormProvider, useForm} from 'react-hook-form';
import {googleTokenDataAtom} from '^atoms/common';
import {CreateUserRequestDto} from '^models/User/types';
import {invitedOrgIdAtom} from '^v3/V3OrgJoin/atom';
import {SignBizInfoPageRoute} from '^pages/sign/bizInfo';
import {SignUserDetailRoute} from '^pages/sign/detail';
import {useCreateUserAuth, useLogin} from '^clients/public/home/LandingPages/SignAuthPage/SignAuthPage.atom';
import {NewLandingPageLayout} from '^clients/public/home/LandingPages/NewLandingPageLayout';
import {StepButton} from '../StepButton';
import {NameSection} from './NameSection';
import {EmailSection} from './EmailSection';
import {PhoneNumberSection} from './PhoneNumberSection';
import {JobSection} from './JopSection';
import {AgreeTermModal} from './AgreeTermModal';

export const SignCreateUserAuthPage = () => {
    const {mutate} = useCreateUserAuth();
    const {mutate: loginMutate} = useLogin();
    const [isOpenTermModal, setIsOpenTermModal] = useState(false);
    const [isCodeConfirmed, setIsCodeConfirmed] = useState(false);
    const invitedOrgId = useRecoilValue(invitedOrgIdAtom);
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

    const [name, email, phone, job] = watch(['name', 'email', 'phone', 'job']);
    const isTermModalValid = !!name && !!email && !!phone && !!job && isCodeConfirmed;

    const onSubmit = () => {
        methods.handleSubmit((data: CreateUserRequestDto & {code?: string}) => {
            const {code, ...userData} = data;
            if (!isValid && !isCodeConfirmed && !accessToken) return;

            mutate(
                {data: userData, accessToken},
                {
                    onSuccess: () => {
                        if (!accessToken) return;
                        loginMutate(accessToken, {
                            onSuccess: () => {
                                if (!invitedOrgId) {
                                    router.replace(SignBizInfoPageRoute.path());
                                } else {
                                    router.replace(SignUserDetailRoute.path());
                                }
                            },
                        });
                    },
                },
            );
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
