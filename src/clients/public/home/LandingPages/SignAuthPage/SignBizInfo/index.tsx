import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {FormProvider, useForm} from 'react-hook-form';
import {SignUserDetailRoute} from '^pages/sign/detail';
import {CreateOrganizationRequestDto} from '^models/User/types';
import {NewLandingPageLayout} from '^clients/public/home/LandingPages/NewLandingPageLayout';
import {BusinessRegistrationNumberSection} from './BusinessRegistrationNumberSection';
import {OrganizationSizeSection} from './OrganizationSizeSection';
import {OrganizationNameSection} from './OrganizationNameSection';
import {useCreateOrganizationAuth} from '^clients/public/home/LandingPages/SignAuthPage/SignAuthPage.atom';

export const OrganizationBizInfoPage = () => {
    const {mutate} = useCreateOrganizationAuth();
    const [step, setStep] = useState(1);
    const router = useRouter();

    useEffect(() => {
        localStorage.removeItem('googleTokenData');
    });

    const methods = useForm<CreateOrganizationRequestDto>({
        mode: 'all',
    });

    const onNext = () => {
        methods.handleSubmit((data: CreateOrganizationRequestDto) => {
            mutate(data, {
                onSuccess: () => {
                    router.push(SignUserDetailRoute.path());
                },
            });
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
                        <span className="text-28 font-600 text-neutral-900">딱 필요한 정보만 받을게요</span>
                        {step === 1 && (
                            <section className="w-full flex flex-col gap-3">
                                <OrganizationNameSection setStep={setStep} />
                            </section>
                        )}
                        {step === 2 && (
                            <section className="w-full flex flex-col gap-3">
                                <OrganizationNameSection isDisabled={true} />
                                <BusinessRegistrationNumberSection />
                                <OrganizationSizeSection setStep={setStep} onNext={onNext} />
                            </section>
                        )}
                    </div>
                </form>
            </FormProvider>
        </NewLandingPageLayout>
    );
};
