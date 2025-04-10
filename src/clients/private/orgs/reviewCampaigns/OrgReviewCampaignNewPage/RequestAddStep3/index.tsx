import React, {useState} from 'react';
import {useRouter} from 'next/router';
import {useRecoilState, useRecoilValue} from 'recoil';
import {toast} from 'react-hot-toast';
import {orgIdParamState} from '^atoms/common';
import {OrgReviewCampaignDetailPageRoute} from '^pages/orgs/[id]/reviewCampaigns/[reviewCampaignId]';
import {errorToast} from '^api/api';
import {confirm2, confirmed} from '^components/util/dialog';
import {reviewCampaignApi} from '^models/ReviewCampaign/api';
import {
    createReviewCampaignRequestAtom,
    defaultCreateReviewCampaignRequestDto,
    useReviewCampaignCreateStep,
} from '../atom';
import {StepCard, StepCardBody, StepSubmitButton} from '../components';
import {DatePicker} from './DatePicker';
import {TimePicker} from './TimePicker';

export const RequestAddStep3 = () => {
    const router = useRouter();
    const {getStep, setFoldStep, resetSteps} = useReviewCampaignCreateStep();
    const [formData, setFormData] = useRecoilState(createReviewCampaignRequestAtom);
    const [date, setDate] = React.useState<Date | undefined>(undefined);
    const [time, setTime] = React.useState<string | undefined>(undefined);
    const step = getStep(3);
    const [isLoading, setIsLoading] = useState(false);
    const orgId = useRecoilValue(orgIdParamState);

    const onSubmit = async () => {
        if (!formData.title) {
            toast.error('제목을 입력해주세요.');
            return false;
        }

        if (!formData.description) {
            toast.error('설명을 입력해주세요.');
            return false;
        }

        if (!date || !time) {
            toast.error('마감일 및 시간을 입력해주세요.');
            return false;
        }

        const [hours, minutes] = time.split(':').map(Number);

        const syncConfirm = () =>
            confirm2(
                '새 요청을 생성하고 알림을 보낼까요?',
                '요청 대상자들에게 지금 바로 알림이 보내져요.',
                'question',
                {
                    cancelButtonText: '돌아가기',
                    confirmButtonText: '생성 완료하기',
                },
            );

        return confirmed(syncConfirm())
            .then(() => setIsLoading(true))
            .then(() =>
                reviewCampaignApi
                    .create(orgId, {
                        ...formData,
                        finishAt: new Date(date.setHours(hours, minutes)),
                    })
                    .then((res) => res.data),
            )
            .then((campaign) => {
                toast.success('요청이 전송되었습니다.');
                setFormData(defaultCreateReviewCampaignRequestDto);
                resetSteps();
                router.push(OrgReviewCampaignDetailPageRoute.path(orgId, campaign.id));
            })
            .catch(errorToast)
            .finally(() => setIsLoading(false));
    };

    return (
        <StepCard
            title="3. 제출 마감일 설정"
            isHidden={!!step?.hidden}
            isCurrent={!!step?.isFocused}
            isFolded={!!step?.folded}
            setIsFolded={(isFolded) => setFoldStep(3, isFolded)}
        >
            <StepCardBody>
                <div className={'space-y-2'}>
                    <div className={'text-gray-500 text-14'}>마감일은 추후 변경 가능합니다.</div>
                    <div className={'flex space-x-4 items-center'}>
                        <DatePicker date={date} onSelect={setDate} />
                        <TimePicker time={time} onSelect={setTime} />
                    </div>
                </div>

                <div className={'flex justify-center space-x-4'}>
                    <StepSubmitButton
                        text="완료"
                        onClick={onSubmit}
                        disabled={date === undefined || time === undefined}
                        isLoading={isLoading}
                    />
                </div>
            </StepCardBody>
        </StepCard>
    );
};
