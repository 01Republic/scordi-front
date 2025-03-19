import React, {useState} from 'react';
import {NewLandingPageLayout} from '^clients/public/home/LandingPages/NewLandingPageLayout';
import {FormProvider, useForm} from 'react-hook-form';
import {WorkspacesAndCompanyInfoType} from '^models/User/types';
import {OrganizationNameSection} from './OrganizationNameSection';
import {BusinessRegistrationNumberSection} from './BusinessRegistrationNumberSection';
import {OrganizationSizeSection} from './OrganizationSizeSection';
import {FunnelSection} from '^clients/public/home/LandingPages/SignAdditionalInfoPage/FunnelSection';

export const OrganizationInfoSectionPage = () => {
    const [step, setStep] = useState(1);

    const methods = useForm<WorkspacesAndCompanyInfoType>({
        mode: 'all',
    });

    const {
        formState: {isValid},
    } = methods;

    const title = step === 3 ? '스코디를 어떻게 알게되셨나요?' : '딱 필요한 정보만 받을게요';

    return (
        <NewLandingPageLayout pageName="AdditionalInfoPage" hideNav>
            <FormProvider {...methods}>
                <div className="flex flex-col items-center justify-center gap-10 w-[380px]">
                    <span className="text-28 font-600 text-neutral-900">{title}</span>
                    {step === 1 && (
                        <section className="w-full flex flex-col gap-3">
                            <OrganizationNameSection setStep={setStep} />
                        </section>
                    )}
                    {step === 2 && (
                        <section className="w-full flex flex-col gap-3">
                            <OrganizationNameSection isDisabled={true} />
                            <BusinessRegistrationNumberSection />
                            <OrganizationSizeSection setStep={setStep} />
                        </section>
                    )}
                    {step === 3 && <FunnelSection />}
                </div>
            </FormProvider>
        </NewLandingPageLayout>
    );
};
