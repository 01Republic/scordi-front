import {memo} from 'react';
import {useRouter} from 'next/router';
import {useCreateFlow} from '^hooks/useApplicationPrototypes';
import {useForm} from 'react-hook-form';
import {CreateBillingHistoryStandAloneRequestDto as CreateDto} from '^types/billing.type';
import {createAppsByBillingHistory} from '^api/billing.api';
import {NewAppCreatedPageRoute} from '^pages/orgs/[id]/apps/new/created';
import {errorNotify} from '^utils/toast-notify';
import {MobileSection} from '^components/v2/MobileSection';
import {yyyy_mm_dd} from '^utils/dateTime';
import {MobileBottomNav} from '^components/v2/MobileBottomNav';
import {ApplicationDto} from '^types/application.type';
import {AppInfoPageRoute} from '^pages/orgs/[id]/apps/[appId]';

type CreateBillingHistoryFormProps = {
    application: ApplicationDto;
};

export const CreateBillingHistoryForm = memo((props: CreateBillingHistoryFormProps) => {
    const {application} = props;
    const router = useRouter();
    const organizationId = Number(router.query.id) || null;
    const {prototype: proto, paymentPlan: plan, billingCycle: cycle} = application || {};
    const form = useForm<CreateDto>();

    const pageLoaded = !!organizationId && !!proto && !!plan && !!cycle;
    if (!pageLoaded) return <></>;

    const onSubmit = (body: CreateDto) => {
        createAppsByBillingHistory(body)
            .then(({data}) => {
                const {application} = data;
                router.push(AppInfoPageRoute.path(organizationId, application.id));
            })
            .catch(errorNotify);
    };

    return (
        <form className="py-5" onSubmit={form.handleSubmit(onSubmit)}>
            <input type="hidden" defaultValue={cycle.id} {...form.register('billingCycleId')} />

            <MobileSection className="mb-5">
                <div className="form-control">
                    <div className="bs-row mx-0">
                        <div className="bs-col-7 px-0">
                            <input
                                type="date"
                                className="input input-bordered w-full"
                                autoComplete="off"
                                required
                                defaultValue={yyyy_mm_dd(new Date())}
                                {...form.register('paidAt')}
                            />
                        </div>
                    </div>
                </div>
            </MobileSection>

            <MobileSection className="mb-5">
                <div className="form-control">
                    <div className="bs-row mx-0">
                        <div className="bs-col-5 px-0">
                            <input
                                id="lastPaidAmount"
                                type="number"
                                step="0.01"
                                placeholder="0.01"
                                className="input input-bordered w-full"
                                autoComplete="off"
                                required
                                {...form.register('paidAmount')}
                            />
                        </div>
                        <div className="bs-col px-2 flex items-center">
                            <label htmlFor="lastPaidAmount" className="label">
                                <span className="label-text">달러</span>
                            </label>
                        </div>
                    </div>
                </div>
            </MobileSection>

            <MobileBottomNav>
                <MobileSection className="py-[20px] pb-[50px] px-0 md:px-[20px]">
                    <button type="submit" className="btn btn-block btn-big btn-secondary">
                        완료
                    </button>
                </MobileSection>
            </MobileBottomNav>
        </form>
    );
});
