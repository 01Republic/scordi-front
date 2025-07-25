import React, {useState} from 'react';
import {useQueryClient} from '@tanstack/react-query';
import {FormProvider, useForm} from 'react-hook-form';
import cn from 'classnames';
import {useCurrentUser} from '^models/User/hook';
import {CreateUserDetailRequestDto, CreateUserResponseDto} from '^models/User/types';
import {useCreateUserDetailAuth} from '../SignAuthPage.atom';
import {NewLandingPageLayout} from '^clients/public/home/LandingPages/NewLandingPageLayout';
import {FunnelSection} from './FunnelSection';
import {SuccessSign} from './SuccessSign';

export const SignDetailAuthPage = () => {
    const [isSignSuccess, setSignSuccess] = useState(false);
    const queryClient = useQueryClient();
    const {currentUser} = useCurrentUser();
    const {mutate, isPending} = useCreateUserDetailAuth();
    const user = currentUser ? currentUser : queryClient.getQueryData<CreateUserResponseDto>(['createUserAuth']);
    const methods = useForm<CreateUserDetailRequestDto>({
        mode: 'all',
    });

    const {watch} = methods;
    const funnel = watch('funnel');

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
                        <span className="text-28 font-bold text-gray-900">스코디를 어떻게 알게 되셨나요?</span>
                        <section className="w-full flex flex-col gap-3">
                            <FunnelSection />
                        </section>
                        <button
                            type="button"
                            onClick={onSubmit}
                            className={cn(
                                'w-full flex items-center justify-center rounded-lg btn',
                                !funnel ? 'btn-white' : ' btn-scordi ',
                                isPending && 'link_to-loading',
                            )}
                        >
                            <p className="font-semibold text-16 py-3">{!funnel ? '건너뛰기' : '완료'}</p>
                        </button>
                    </div>
                </form>
            </FormProvider>
        </NewLandingPageLayout>
    );
};
