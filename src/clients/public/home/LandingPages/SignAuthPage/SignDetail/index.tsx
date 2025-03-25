import React, {useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useQueryClient} from '@tanstack/react-query';
import {CreateUserDetailRequestDto, CreateUserResponseDto} from '^models/User/types';
import {NewLandingPageLayout} from '^clients/public/home/LandingPages/NewLandingPageLayout';
import {StepButton} from '../StepButton';
import {useCreateUserDetailAuth} from '../SignAuthPage.atom';
import {FunnelSection} from './FunnelSection';
import {useCurrentUser} from '^models/User/hook';
import {SuccessSign} from '^clients/public/home/LandingPages/SignAuthPage/SignDetail/SuccessSign';

export const SignDetailAuthPage = () => {
    const [isSignSuccess, setSignSuccess] = useState(false);
    const queryClient = useQueryClient();
    const {currentUser} = useCurrentUser();
    const {mutate} = useCreateUserDetailAuth();
    const user = currentUser ? currentUser : queryClient.getQueryData<CreateUserResponseDto>(['createUserAuth']);
    const methods = useForm<CreateUserDetailRequestDto>({
        mode: 'all',
    });

    const {watch} = methods;

    const buttonText = watch('funnel') ? '완료' : '건너뛰기';

    const onSubmit = () => {
        methods.handleSubmit((data: CreateUserDetailRequestDto) => {
            if (!user) return;
            mutate(
                {data, userId: user.id},
                {
                    onSuccess: () => setSignSuccess(true),
                },
            );
        })();
    };

    if (isSignSuccess) return <SuccessSign />;

    return (
        <NewLandingPageLayout pageName="AdditionalInfoPage" hideNav>
            <FormProvider {...methods}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
                    <div className="flex flex-col items-center justify-center gap-10 w-[380px]">
                        <span className="text-28 font-bold text-neutral-900">스코디를 어떻게 알게되셨나요?</span>
                        <section className="w-full flex flex-col gap-3">
                            <FunnelSection />
                        </section>
                        <StepButton text={buttonText} disabled={true} onClick={onSubmit} />
                    </div>
                </form>
            </FormProvider>
        </NewLandingPageLayout>
    );
};
