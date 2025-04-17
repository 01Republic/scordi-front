import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {MainContainer, MainLayout} from '^clients/private/_layouts/MainLayout';
import {CreateReviewCampaignRequestDto} from '^models/ReviewCampaign/type';
import {LeftSideIndicator} from './LeftSideIndicator';
import {RequestAddStep1} from './RequestAddStep1';
import {RequestAddStep2} from './RequestAddStep2';
import {RequestAddStep3} from './RequestAddStep3';
import {toast} from 'react-hot-toast';
import {confirm2, confirmed} from '^components/util/dialog';
import {reviewCampaignApi} from '^models/ReviewCampaign/api';
import {reviewCampaignCreateStepAtom} from './atom';
import {OrgReviewCampaignDetailPageRoute} from '^pages/orgs/[id]/reviewCampaigns/[reviewCampaignId]';
import {errorToast} from '^api/api';
import {useIdParam} from '^atoms/common';
import {useResetRecoilState} from 'recoil';
import {useRouter} from 'next/router';
import {dayAfter} from '^utils/dateTime';

export const OrgReviewCampaignNewPage = () => {
    const router = useRouter();
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

    useEffect(() => {
        return () => {
            form.reset();
            resetSteps();
        };
    }, []);

    const onSubmit = async (data: CreateReviewCampaignRequestDto) => {
        if (!data.title) {
            toast.error('제목을 입력해주세요.');
            return false;
        }

        if (!data.description) {
            toast.error('설명을 입력해주세요.');
            return false;
        }

        if (!data.finishAt) {
            toast.error('마감일 및 시간을 입력해주세요.');
            return false;
        }

        const syncConfirm = () =>
            confirm2(
                '요청을 만들고 알림을 보낼까요?',
                '요청을 만들면 즉시 대상자에게 알림이 가요.\n요청 대상자로 선택된 구성원에게 요청 알림을 보낼까요?',
                undefined,
                {
                    cancelButtonText: '취소',
                    confirmButtonText: '확인',
                },
            );

        return confirmed(syncConfirm())
            .then(() => setIsLoading(true))
            .then(() => reviewCampaignApi.create(orgId, data).then((res) => res.data))
            .then((campaign) => {
                toast.success('요청이 전송되었습니다.');
                return router.push(OrgReviewCampaignDetailPageRoute.path(orgId, campaign.id));
            })
            .catch(errorToast)
            .finally(() => setIsLoading(false));
    };

    return (
        <MainLayout>
            <MainContainer>
                <h2 className="text-2xl font-bold text-gray-900 mb-12">새 요청 만들기</h2>

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
            </MainContainer>
        </MainLayout>
    );
};
