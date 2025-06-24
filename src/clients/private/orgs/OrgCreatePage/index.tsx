import React, {memo, useEffect} from 'react';
import {useRouter} from 'next/router';
import {FormProvider, useForm} from 'react-hook-form';
import {SignUserDetailRoute} from '^pages/sign/detail';
import {CreateOrganizationRequestDto} from '^models/Organization/type';
import {useCreateOrganization} from '^models/Organization/hook';
import {BaseLayout} from '^clients/private/_layouts/BaseLayout';
import {StepButton} from '^clients/public/home/UsersAuth/UserSignUpPage/StepButton';
import {OrganizationNameSection} from './OrganizationNameSection';
import {BusinessRegistrationNumberSection} from './BusinessRegistrationNumberSection';
import {OrganizationSizeSection} from './OrganizationSizeSection';

export const OrgCreatePage = memo(() => {
    const router = useRouter();
    const {mutate, isPending} = useCreateOrganization();
    const form = useForm<CreateOrganizationRequestDto>({
        mode: 'all',
    });

    useEffect(() => {
        localStorage.removeItem('googleTokenData');
    }, []);

    const onNext = () => {
        form.handleSubmit((data: CreateOrganizationRequestDto) => {
            mutate(data, {
                onSuccess: ({id: orgId}) => {
                    router.push(SignUserDetailRoute.path() + `?orgId=${orgId}`);
                },
            });
        })();
    };

    return (
        <BaseLayout workspace={false}>
            <main className="w-full h-screen flex items-center justify-center">
                <FormProvider {...form}>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="flex flex-col items-center justify-center gap-10 w-[380px]">
                            <span className="text-28 font-bold text-gray-900">회사 정보를 입력해주세요</span>
                            <section className="w-full flex flex-col gap-3">
                                <OrganizationNameSection />
                                <BusinessRegistrationNumberSection />
                                <OrganizationSizeSection />
                            </section>
                            <StepButton
                                text="계속"
                                disabled={form.formState.isValid}
                                onClick={onNext}
                                isPending={isPending}
                            />
                        </div>
                    </form>
                </FormProvider>
            </main>
        </BaseLayout>
    );
});
