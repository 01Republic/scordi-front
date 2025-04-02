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
import {StepButton} from '^clients/public/home/LandingPages/SignAuthPage/StepButton';

export const OrganizationBizInfoPage = () => {
    const {mutate, isPending} = useCreateOrganizationAuth();
    const router = useRouter();

    useEffect(() => {
        localStorage.removeItem('googleTokenData');
    });

    const methods = useForm<CreateOrganizationRequestDto>({
        mode: 'all',
    });

    const {
        formState: {isValid},
    } = methods;

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
                        <span className="text-28 font-bold text-neutral-900">회사 정보를 입력해주세요</span>
                        <section className="w-full flex flex-col gap-3">
                            <OrganizationNameSection />
                            <BusinessRegistrationNumberSection />
                            <OrganizationSizeSection />
                        </section>
                        <StepButton text="계속" disabled={isValid} onClick={onNext} isPending={isPending} />
                    </div>
                </form>
            </FormProvider>
        </NewLandingPageLayout>
    );
};
