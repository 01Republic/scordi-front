import {orgIdParamState} from '^atoms/common';
import {SelectedTeamMemberListItem} from '^clients/private/orgs/reviewCampaigns/OrgReviewCampaignNewPage/RequestAddStep2/SelectedTeamMemberListItem';
import {useToast} from '^hooks/useToast';
import {integrationSlackMemberApi} from '^models/integration/IntegrationSlackMember/api';
import {integrationSlackWorkspaceApi} from '^models/integration/IntegrationSlackWorkspace/api';
import {organizationConnectGoogleWorkspaceApi} from '^models/Organization/api';
import {useCurrentOrg} from '^models/Organization/hook';
import {TeamMemberDto, useTeamMembers} from '^models/TeamMember';
import {Button} from '^public/components/ui/button';
import GoogleIcon from '^public/logo/icons/ic_google.png';
import SlackIcon from '^public/logo/icons/ic_slack.png';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {createReviewCampaignRequestAtom, useReviewCampaignCreateStep} from '../atom';
import {StepCard, StepCardBody, StepSubmitButton} from '../components';
import {TeamMemberSearch} from './TeamMemberSearch';

export const RequestAddStep2 = () => {
    const router = useRouter();
    const orgId = useRecoilValue(orgIdParamState);
    const {getStep, setFoldStep, changeStep} = useReviewCampaignCreateStep();
    const [formData, setFormData] = useRecoilState(createReviewCampaignRequestAtom);
    const {result, searchAndUpdateCounter} = useTeamMembers();
    const teamMembers = result.items;
    const {toast} = useToast();
    const {currentOrg} = useCurrentOrg(orgId);
    const step = getStep(2);

    const onReady = () => {
        searchAndUpdateCounter({
            relations: ['teams', 'slackMember'],
            order: {id: 'DESC'},
            updateCounterCacheColumn: 'subscriptionCount',
            itemsPerPage: 0,
        });
    };

    const onSelectMember = (member: TeamMemberDto) => {
        setFormData((prev) => ({
            ...prev,
            teamMemberIds: [...prev.teamMemberIds, member.id],
        }));
    };

    const removeSelectedMember = (member: TeamMemberDto) => {
        setFormData((prev) => ({
            ...prev,
            teamMemberIds: prev.teamMemberIds.filter((id) => id !== member.id),
        }));
    };

    const onLoadSlackMembers = () => {
        integrationSlackWorkspaceApi.index(orgId).then((res) => {
            const workspace = res.data.items[0];
            if (!workspace) {
                toast.error('연결된 슬랙 워크스페이스가 없습니다.');
                return;
            }

            integrationSlackMemberApi.index(orgId, workspace.id, {itemsPerPage: 0}).then((res) => {
                const slackMembers = res.data.items;
                const newMemberIds = slackMembers
                    .map((member) => member.teamMemberId)
                    .filter((id): id is number => id !== null);

                setFormData((prev) => ({
                    ...prev,
                    teamMemberIds: Array.from(new Set([...prev.teamMemberIds, ...newMemberIds])),
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

        organizationConnectGoogleWorkspaceApi
            .sync(orgId)
            .then((res) => {
                const googleMembers = res.data;
                const newMemberIds = googleMembers.map((member) => member.id).filter((id): id is number => id !== null);

                setFormData((prev) => ({
                    ...prev,
                    teamMemberIds: Array.from(new Set([...prev.teamMemberIds, ...newMemberIds])),
                }));

                toast.success('구글 워크스페이스에서 팀 멤버들을 불러왔어요.');
            })
            .catch((error) => {
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
        <StepCard
            title="2. 요청할 대상 선택"
            isHidden={!!step?.hidden}
            isCurrent={!!step?.isFocused}
            isFolded={!!step?.folded}
            setIsFolded={(isFolded) => setFoldStep(2, isFolded)}
        >
            <StepCardBody>
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

                <div className="grid grid-cols-2 gap-2">
                    {teamMembers.map(
                        (teamMember) =>
                            formData.teamMemberIds.includes(teamMember.id) && (
                                <SelectedTeamMemberListItem
                                    key={teamMember.id}
                                    teamMember={teamMember}
                                    onRemove={removeSelectedMember}
                                />
                            ),
                    )}
                </div>

                <div className={'flex justify-center space-x-4'}>
                    <StepSubmitButton
                        onClick={() => {
                            setFoldStep(2, true);
                            changeStep(3);
                        }}
                        disabled={formData.teamMemberIds.length === 0}
                    />
                </div>
            </StepCardBody>
        </StepCard>
    );
};
