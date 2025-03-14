import React, {memo, useEffect} from 'react';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {FormProvider, useForm} from 'react-hook-form';
import {googleTokenDataAtom} from '^atoms/common';
import {UserAdditionalInfoType} from '^models/User/types';
import {signAdditionalInfoPageDataState} from './AdditionalInfoPage.atom';
import {NewLandingPageLayout} from '^clients/public/home/LandingPages/NewLandingPageLayout';
import {StepButton} from '^clients/public/home/LandingPages/SignAdditionalInfoPage/StepButton';
import {NameSection} from '^clients/public/home/LandingPages/SignAdditionalInfoPage/NameSection';
import {EmailSection} from '^clients/public/home/LandingPages/SignAdditionalInfoPage/EmailSection';
import {PhoneNumberSection} from '^clients/public/home/LandingPages/SignAdditionalInfoPage/PhoneNumberSection';
import {JobSection} from '^clients/public/home/LandingPages/SignAdditionalInfoPage/JobSection';

interface SignAdditionalInfoPageProps {}

export const SignAdditionalInfoPage = memo((props: SignAdditionalInfoPageProps) => {
    const setTokenData = useSetRecoilState(googleTokenDataAtom);
    const tokenData = useRecoilValue(googleTokenDataAtom);
    const [additionalData, setAdditionalData] = useRecoilState(signAdditionalInfoPageDataState);
    const {} = props;

    const methods = useForm<UserAdditionalInfoType>({
        mode: 'all',
        defaultValues: {
            name: tokenData?.name,
            email: tokenData?.email,
        },
    });

    const {
        watch,
        reset,
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

    const name = watch('name');
    const email = watch('email');
    const phoneNumber = watch('phoneNumber');
    const code = watch('code');
    const job = watch('job');

    return (
        <NewLandingPageLayout pageName="AdditionalInfoPage" hideNav>
            <FormProvider {...methods}>
                <div className="flex flex-col items-center justify-center gap-10 w-[380px]">
                    <span className="text-28 font-600 text-neutral-900">딱 필요한 정보만 받을게요</span>
                    <section className="w-full flex flex-col gap-3">
                        <NameSection />
                        <EmailSection />
                        <PhoneNumberSection />
                        <JobSection />
                    </section>
                    <StepButton text="계속" />
                </div>
            </FormProvider>
        </NewLandingPageLayout>
    );
});
