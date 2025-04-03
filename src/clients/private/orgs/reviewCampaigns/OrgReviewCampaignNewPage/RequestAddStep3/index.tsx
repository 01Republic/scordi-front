import React from 'react';
import {useRouter} from 'next/router';
import {toast} from 'react-hot-toast';
import {useRecoilState, useRecoilValue} from 'recoil';
import {ChevronDown, ChevronRight} from 'lucide-react';
import {Card} from '^public/components/ui/card';
import {Button} from '^public/components/ui/button';
import {OrgReviewCampaignListPageRoute} from '^pages/orgs/[id]/reviewCampaigns';
import {errorToast} from '^api/api';
import {confirm2, confirmed} from '^components/util/dialog';
import {orgIdParamState} from '^atoms/common';
import {
    createReviewCampaignRequestAtom,
    defaultCreateReviewCampaignRequestDto,
    reviewCampaignCreateStepAtom,
} from '../atom';
import {DatePicker} from './DatePicker';
import {TimePicker} from './TimePicker';
import {reviewCampaignApi} from '^models/ReviewCampaign/api';

export const RequestAddStep3 = () => {
    const router = useRouter();
    const [step, setStep] = useRecoilState(reviewCampaignCreateStepAtom);
    const [formData, setFormData] = useRecoilState(createReviewCampaignRequestAtom);
    const [date, setDate] = React.useState<Date | undefined>(undefined);
    const [time, setTime] = React.useState<string | undefined>(undefined);
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

        if (date && time) {
            const [hours, minutes] = time.split(':').map(Number);
            date.setHours(hours, minutes);

            setFormData((prev) => ({
                ...prev,
                finishAt: date,
            }));
        }

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
            .then(() => reviewCampaignApi.create(orgId, formData))
            .then(() => {
                toast.success('요청이 전송되었습니다.');
                setFormData(defaultCreateReviewCampaignRequestDto);
                setStep(1);
                /* TODO: 요청 상세 페이지로 이동해야 함 */
                router.push(OrgReviewCampaignListPageRoute.path(orgId));
            })
            .catch(errorToast);
    };

    return (
        <Card className={'bg-white mb-4'}>
            <div
                className={
                    'px-9 py-5 flex items-center justify-start space-x-2 text-xl font-bold text-gray-900 cursor-pointer'
                }
                onClick={() => setStep(3)}
            >
                {step === 3 ? <ChevronDown /> : <ChevronRight />}
                <span>3. 제출 마감일 설정</span>
            </div>
            {step === 3 && (
                <div className={'p-9 space-y-10 border-t'}>
                    <div className={'space-y-2'}>
                        <div className={'text-gray-500 text-14'}>마감일은 추후 변경 가능합니다.</div>
                        <div className={'flex space-x-4 items-center'}>
                            <DatePicker date={date} onSelect={setDate} />
                            <TimePicker time={time} onSelect={setTime} />
                        </div>
                    </div>

                    <div className={'flex justify-center space-x-4'}>
                        <Button
                            size={'xl'}
                            variant={'scordi'}
                            onClick={onSubmit}
                            className={'w-64'}
                            disabled={date === undefined || time === undefined}
                        >
                            완료
                        </Button>
                    </div>
                </div>
            )}
        </Card>
    );
};
