import React, {useEffect} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {FormProvider, useForm} from 'react-hook-form';
import {googleTokenDataAtom} from '^atoms/common';
import {UserAdditionalInfoType} from '^models/User/types';
import {NewLandingPageLayout} from '^clients/public/home/LandingPages/NewLandingPageLayout';
import {StepButton} from './StepButton';
import {NameSection} from './NameSection';
import {EmailSection} from './EmailSection';
import {PhoneNumberSection} from './PhoneNumberSection';
import {PositionSection} from './PositionSection';

export const SignAdditionalInfoPage = () => {
    const setTokenData = useSetRecoilState(googleTokenDataAtom);
    const tokenData = useRecoilValue(googleTokenDataAtom);

    const methods = useForm<UserAdditionalInfoType>({
        mode: 'all',
        defaultValues: {
            name: tokenData?.name,
            email: tokenData?.email,
        },
    });

    const {
        reset,
        getValues,
        formState: {isValid},
    } = methods;

    useEffect(() => {
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
    }, [setTokenData]);

    useEffect(() => {
        if (tokenData) {
            reset({
                name: tokenData.name,
                email: tokenData.email,
            });
        }
    }, [reset, tokenData?.name, tokenData?.email]);

    const disabled = isValid && getValues('isConfirmedCode') === true;

    return (
        <NewLandingPageLayout pageName="AdditionalInfoPage" hideNav>
            <FormProvider {...methods}>
                <div className="flex flex-col items-center justify-center gap-10 w-[380px]">
                    <span className="text-28 font-600 text-neutral-900">딱 필요한 정보만 받을게요</span>
                    <section className="w-full flex flex-col gap-3">
                        <NameSection />
                        <EmailSection />
                        <PhoneNumberSection />
                        <PositionSection />
                    </section>
                    <StepButton text="계속" disabled={disabled} />
                </div>
            </FormProvider>
        </NewLandingPageLayout>
    );
};
