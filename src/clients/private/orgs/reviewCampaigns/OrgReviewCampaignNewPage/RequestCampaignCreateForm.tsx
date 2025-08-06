import {errorToast} from '^api/api';
import {useIdParam} from '^atoms/common';
import {confirm2, confirmed} from '^components/util/dialog';
import {reviewCampaignApi} from '^models/ReviewCampaign/api';
import {CreateReviewCampaignRequestDto, ReviewCampaignDto} from '^models/ReviewCampaign/type';
import {dayAfter} from '^utils/dateTime';
import {useTranslation} from 'next-i18next';
import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {toast} from 'react-hot-toast';
import {useResetRecoilState} from 'recoil';
import {reviewCampaignCreateStepAtom} from './atom';
import {LeftSideIndicator} from './LeftSideIndicator';
import {RequestAddStep1} from './RequestAddStep1';
import {RequestAddStep2} from './RequestAddStep2';
import {RequestAddStep3} from './RequestAddStep3';
import {RequestComplete} from './RequestComplete';

interface RequestCampaignCreateFormProps {
    orgId: number;
    redirectTo: (createdCampaign: ReviewCampaignDto) => string;
}

export const RequestCampaignCreateForm = (props: RequestCampaignCreateFormProps) => {
    const {redirectTo} = props;
    const {t} = useTranslation('reviewCampaigns');
    const orgId = useIdParam('id');
    const [isLoading, setIsLoading] = useState(false);
    const resetSteps = useResetRecoilState(reviewCampaignCreateStepAtom);
    const form = useForm<CreateReviewCampaignRequestDto>({
        mode: 'all',
        defaultValues: {
            title: '',
            description: '',
            finishAt: dayAfter(7),
            teamMemberIds: [],
        },
    });
    const [createdCampaign, setCreatedCampaign] = useState<ReviewCampaignDto>();

    useEffect(() => {
        return () => {
            form.reset();
            resetSteps();
        };
    }, []);

    const onSubmit = async (data: CreateReviewCampaignRequestDto) => {
        if (!data.title) return toast.error(t('create.validation.titleRequired'));
        if (!data.description) return toast.error(t('create.validation.descriptionRequired'));
        if (!data.finishAt) return toast.error(t('create.validation.deadlineRequired'));

        const syncConfirm = () =>
            confirm2(t('create.confirmTitle') as string, t('create.confirmMessage') as string, undefined, {
                cancelButtonText: t('create.confirmButtons.cancel') as string,
                confirmButtonText: t('create.confirmButtons.confirm') as string,
            });

        return confirmed(syncConfirm())
            .then(() => setIsLoading(true))
            .then(() => reviewCampaignApi.create(orgId, data).then((res) => res.data))
            .then((campaign) => {
                toast.success(t('create.successMessage'));
                form.reset();
                resetSteps();
                setCreatedCampaign(campaign);
            })
            .catch(errorToast)
            .finally(() => setIsLoading(false));
    };

    if (createdCampaign) return <RequestComplete href={redirectTo(createdCampaign)} />;

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-12">{t('create.title')}</h2>

            <div className="grid grid-cols-9 gap-6">
                <div className="col-span-2">
                    <LeftSideIndicator />
                </div>

                <div className="col-span-7">
                    <form className="flex-1" onSubmit={form.handleSubmit(onSubmit)}>
                        <RequestAddStep1 form={form} />
                        <RequestAddStep2 form={form} />
                        <RequestAddStep3 form={form} isLoading={isLoading} />
                    </form>
                </div>
            </div>
        </div>
    );
};
