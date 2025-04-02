import React, {useEffect} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {useRouter} from 'next/router';
import Image from 'next/image';
import {ChevronDown, ChevronRight} from 'lucide-react';
import SlackIcon from '^public/logo/icons/ic_slack.png';
import GoogleIcon from '^public/logo/icons/ic_google.png';
import {Button} from '^public/components/ui/button';
import {Card} from '^public/components/ui/card';
import {orgIdParamState} from '^atoms/common';
import {TeamMemberDto, useTeamMembers} from '^models/TeamMember';
import {createReviewCampaignRequestAtom, reviewCampaignCreateStepAtom} from '../atom';
import {SelectedTeamMemberListItem} from '^clients/private/orgs/reviewCampaigns/OrgReviewCampaignNewPage/RequestAddStep2/SelectedTeamMemberListItem';
import {TeamMemberSearch} from '^clients/private/orgs/reviewCampaigns/OrgReviewCampaignNewPage/RequestAddStep2/TeamMemberSearch';

export const RequestAddStep2 = () => {
    const router = useRouter();
    const orgId = useRecoilValue(orgIdParamState);
    const [step, setStep] = useRecoilState(reviewCampaignCreateStepAtom);
    const [formData, setFormData] = useRecoilState(createReviewCampaignRequestAtom);
    const {result, searchAndUpdateCounter} = useTeamMembers();
    const teamMembers = result.items;

    const onReady = () => {
        searchAndUpdateCounter({
            relations: ['teams'],
            order: {id: 'DESC'},
            updateCounterCacheColumn: 'subscriptionCount',
            itemsPerPage: 0,
        });
    };

    const onPrevious = () => setStep((s) => s - 1);
    const onNext = () => setStep((s) => s + 1);

    const removeSelectedMember = (member: TeamMemberDto) => {
        setFormData((prev) => ({
            ...prev,
            teamMemberIds: prev.teamMemberIds.filter((id) => id !== member.id),
        }));
    };

    const onSelectMember = (member: TeamMemberDto) => {
        console.log('onSelectMember', member);
        setFormData((prev) => ({
            ...prev,
            teamMemberIds: [...prev.teamMemberIds, member.id],
        }));
    };

    useEffect(() => {
        if (!orgId || isNaN(orgId)) return;
        if (!router.isReady) return;
        onReady && onReady();
    }, [orgId, router.isReady]);

    return (
        <Card className={'bg-white mb-4'}>
            <div
                className={
                    'px-9 py-5 flex items-center justify-start space-x-2 text-xl font-bold text-gray-900 cursor-pointer'
                }
                onClick={() => setStep(2)}
            >
                {step === 2 ? <ChevronDown /> : <ChevronRight />}
                <span>2. 요청할 대상 선택</span>
            </div>
            {step === 2 && (
                <div className={'p-9 space-y-10 border-t'}>
                    <div className={'text-14'}>요청을 전송할 대상을 모두 선택해주세요.</div>

                    {/* TODO: 슬랙, 구글 불러오기 기능 추가 */}
                    <div className={'space-y-2'}>
                        <div className={'flex justify-end items-center'}>
                            <div className={'flex items-center space-x-1 text-sm'}>
                                <span>불러오기:</span>
                                <Button size={'sm'} variant={'ghost'} onClick={onPrevious}>
                                    <Image src={SlackIcon} alt={'Slack'} width={20} height={20} />
                                    Slack
                                </Button>
                                <Button size={'sm'} variant={'ghost'} onClick={onPrevious}>
                                    <Image src={GoogleIcon} alt={'Google Workspace'} width={20} height={20} />
                                    Google Workspace
                                </Button>
                            </div>
                        </div>

                        <TeamMemberSearch teamMembers={teamMembers} onSelectMember={onSelectMember} />
                    </div>

                    <div className={'grid grid-cols-2 gap-2'}>
                        {teamMembers.map((teamMember) => {
                            if (!formData.teamMemberIds.includes(teamMember.id)) return <></>;
                            return (
                                <SelectedTeamMemberListItem teamMember={teamMember} onRemove={removeSelectedMember} />
                            );
                        })}
                    </div>

                    <div className={'flex justify-center space-x-4'}>
                        <Button size={'xl'} variant={'scordi'} onClick={onNext} className={'w-64'}>
                            다음
                        </Button>
                    </div>
                </div>
            )}
        </Card>
    );
};
