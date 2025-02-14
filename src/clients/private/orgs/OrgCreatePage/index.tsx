import React, {memo} from 'react';
import {useForm} from 'react-hook-form';
import {LandingPageLayout} from '^clients/public/home/LandingPages/LandingPageLayout';
import {CreateOrganizationRequestDto} from '^models/Organization/type';
import {organizationApi} from '^models/Organization/api';
import {confirm2, confirmed} from '^components/util/dialog';
import {OrgMainPageRoute} from '^pages/orgs/[id]';
import {useRouter} from 'next/router';
import {errorToast} from '^api/api';

export const OrgCreatePage = memo(function OrgCreatePage() {
    const form = useForm<CreateOrganizationRequestDto>();
    const router = useRouter();

    const onSubmit = (dto: CreateOrganizationRequestDto) => {
        const createConfirm = () => confirm2('워크스페이스를 생성할까요?');

        return confirmed(createConfirm())
            .then(() => organizationApi.create(dto))
            .then((res) => res.data)
            .then((org) => router.push(OrgMainPageRoute.path(org.id)))
            .catch(errorToast);
    };

    return (
        <LandingPageLayout pageName="BetaSignPhoneAuthPage" hideNav hideFooter>
            <div className="mx-auto text-center pt-[30vh] w-full max-w-lg space-y-5 h-screen">
                <h1
                    className="text-3xl sm:text-4xl font-bold leading-loose"
                    onClick={() => {
                        console.log(form.getValues());
                    }}
                >
                    <span className="block mb-2">워크스페이스의 이름은</span>
                    <span className="block">무엇으로 할까요?</span>
                </h1>

                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="p-4">
                        <div className="mx-auto mb-14">
                            {/* 워크스페이스 이름 설정 */}
                            <div className="form-control relative mb-6">
                                <input
                                    type="text"
                                    className={`input sm:input-lg input-bordered flex-grow`}
                                    {...form.register('name')}
                                    placeholder="회사명을 입력해주세요."
                                    required
                                    onKeyUp={(e) => {
                                        if (e.key === 'Enter') {
                                            form.watch('name');
                                        }
                                    }}
                                />
                            </div>
                        </div>

                        {form.watch('name') ? (
                            <button
                                type="submit"
                                className="btn sm:btn-lg btn-block btn-scordi-500 normal-case disabled:!bg-slate-100 disabled:!border-slate-300"
                                // disabled={!form.watch('phone') || !codeConfirmed || isLoading}
                                // onClick={() => agreeModalOnConfirm()}
                            >
                                {form.watch('name')} (으)로 시작하기
                            </button>
                        ) : (
                            <button
                                className="btn sm:btn-lg btn-block btn-scordi-500 normal-case disabled:!bg-slate-100 disabled:!border-slate-300"
                                disabled
                            >
                                시작하기
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </LandingPageLayout>
    );
});
