import { orgIdParamState } from '^atoms/common';
import { SelectedTeamMemberListItem } from '^clients/private/orgs/reviewCampaigns/OrgReviewCampaignNewPage/RequestAddStep2/SelectedTeamMemberListItem';
import { TeamMemberSearch } from '^clients/private/orgs/reviewCampaigns/OrgReviewCampaignNewPage/RequestAddStep2/TeamMemberSearch';
import { useToast } from '^hooks/useToast';
import { integrationSlackMemberApi } from '^models/integration/IntegrationSlackMember/api';
import { integrationSlackWorkspaceApi } from '^models/integration/IntegrationSlackWorkspace/api';
import { organizationConnectGoogleWorkspaceApi } from '^models/Organization/api';
import { useCurrentOrg } from '^models/Organization/hook';
import { TeamMemberDto, useTeamMembers } from '^models/TeamMember';
import { Button } from '^public/components/ui/button';
import { Card } from '^public/components/ui/card';
import GoogleIcon from '^public/logo/icons/ic_google.png';
import SlackIcon from '^public/logo/icons/ic_slack.png';
import { ChevronDown, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { createReviewCampaignRequestAtom, reviewCampaignCreateStepAtom } from '../atom';

export const RequestAddStep2 = () => {
    const router = useRouter();
    const orgId = useRecoilValue(orgIdParamState);
    const [step, setStep] = useRecoilState(reviewCampaignCreateStepAtom);
    const [formData, setFormData] = useRecoilState(createReviewCampaignRequestAtom);
    const { result, searchAndUpdateCounter } = useTeamMembers();
    const teamMembers = result.items;
    const { toast } = useToast();
    const { currentOrg } = useCurrentOrg(orgId);

    const onReady = () => {
        searchAndUpdateCounter({
            relations: ['teams', 'slackMember',],
            order: { id: 'DESC' },
            updateCounterCacheColumn: 'subscriptionCount',
            itemsPerPage: 0,
        });
    };

    const onNext = () => setStep((s) => s + 1);

    const removeSelectedMember = (member: TeamMemberDto) => {
        setFormData((prev) => ({
            ...prev,
            teamMemberIds: prev.teamMemberIds.filter((id) => id !== member.id),
        }));
    };

    const onSelectMember = (member: TeamMemberDto) => {
        setFormData((prev) => ({
            ...prev,
            teamMemberIds: [...prev.teamMemberIds, member.id],
        }));
    };

    const onLoadSlackMembers = () => {
        integrationSlackWorkspaceApi.index(orgId).then((res) => {
            const workspace = res.data.items[0];
            if (!workspace) {
                toast.error('연결된 슬랙 워크스페이스가 없습니다.');
                return;
            }

            integrationSlackMemberApi.index(orgId, workspace.id, { itemsPerPage: 0 }).then((res) => {
                const slackMembers = res.data.items;
                const newMemberIds = slackMembers
                    .map(member => member.teamMemberId)
                    .filter((id): id is number => id !== null);

                setFormData((prev) => ({
                    ...prev,
                    teamMemberIds: Array.from(new Set([...prev.teamMemberIds, ...newMemberIds]))
                }));

                toast.success('슬랙에서 팀 멤버들을 불러왔어요.');
            });
        });
    };

    const onLoadGoogleMembers = () => {
        if (!currentOrg?.lastGoogleSyncHistory?.googleTokenData) {
            toast.error('구글 워크스페이스가 연결되어 있지 않습니다. 먼저 구글 워크스페이스를 연결해주세요.');
            return;
        }

        organizationConnectGoogleWorkspaceApi.sync(orgId).then((res) => {
            const googleMembers = res.data;
            const newMemberIds = googleMembers
                .map(member => member.id)
                .filter((id): id is number => id !== null);

            setFormData((prev) => ({
                ...prev,
                teamMemberIds: Array.from(new Set([...prev.teamMemberIds, ...newMemberIds]))
            }));

            toast.success('구글 워크스페이스에서 팀 멤버들을 불러왔어요.');
        }).catch((error) => {
            if (error.response?.status === 422) {
                toast.error('구글 워크스페이스 연동에 문제가 있습니다. 설정에서 연동 상태를 확인해주세요.');
            } else {
                toast.error('팀 멤버를 불러오는 중 오류가 발생했습니다.');
            }
        });
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

                    <div className={'space-y-2'}>
                        <div className={'flex justify-end items-center'}>
                            <div className={'flex items-center space-x-1 text-sm'}>
                                <span>불러오기:</span>
                                <Button size={'sm'} variant={'ghostGray'} onClick={onLoadSlackMembers}>
                                    <Image src={SlackIcon} alt={'Slack'} width={20} height={20} />
                                    Slack
                                </Button>
                                <Button size={'sm'} variant={'ghostGray'} onClick={onLoadGoogleMembers}>
                                    <Image src={GoogleIcon} alt={'Google Workspace'} width={20} height={20} />
                                    Google Workspace
                                </Button>
                            </div>
                        </div>

                        <TeamMemberSearch teamMembers={teamMembers} onSelectMember={onSelectMember} />
                    </div>

                    <div className={'grid grid-cols-2 gap-2'}>
                        {teamMembers
                            .filter((teamMember) => formData.teamMemberIds.includes(teamMember.id))
                            .map((teamMember: TeamMemberDto) => (
                                <SelectedTeamMemberListItem
                                    key={teamMember.id}
                                    teamMember={teamMember}
                                    onRemove={removeSelectedMember}
                                />
                            ))}
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
