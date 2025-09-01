import React, {memo, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {FormProvider, useForm} from 'react-hook-form';
import {SignUserDetailRoute} from '^pages/sign/detail';
import {CreateOrganizationRequestDto} from '^models/Organization/type';
import {useCreateOrganization} from '^models/Organization/hook';
import {BaseLayout} from '^clients/private/_layouts/BaseLayout';
import {OrganizationNameSection} from './OrganizationNameSection';
import {BusinessRegistrationNumberSection} from './BusinessRegistrationNumberSection';
import {OrganizationSizeSection} from './OrganizationSizeSection';
import {StepButton} from '^clients/public/userAuth/UserSignUpPage/StepButton';
import {useMembershipInHeader2} from '^models/Membership/hook';
import {useCurrentUser} from '^models/User/hook';
import {SuccessSign} from '^clients/public/userAuth/UserSignUpPage/SignDetail/SuccessSign';

export const OrgCreatePage = memo(() => {
    const router = useRouter();
    const [newOrgId, setNewOrgId] = useState<number | undefined>(undefined);
    const {currentUser} = useCurrentUser();
    const {mutate, isPending, isSuccess} = useCreateOrganization();
    const {data} = useMembershipInHeader2(currentUser?.id, {
        relations: ['organization'],
        where: {userId: currentUser?.id},
        includeAdmin: true,
        itemsPerPage: 0,
        order: {id: 'DESC'},
    });

    const {items} = data;

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
                    setNewOrgId(orgId);
                    if (items.length < 1) return router.push(SignUserDetailRoute.path() + `?orgId=${orgId}`);
                },
            });
        })();
    };
    //
    if (newOrgId && items.length > 1)
        return <SuccessSign isWorkSpace={!!isSuccess && items.length > 1} newOrgId={newOrgId} />;

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
                                text={items.length > 0 ? '완료' : '계속'}
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
