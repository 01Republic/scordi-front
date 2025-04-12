import Image from 'next/image';
import {useRecoilState} from 'recoil';
import {UseFormReturn} from 'react-hook-form';
import {useIdParam} from '^atoms/common';
import {SelectedTeamMemberListItem} from '^clients/private/orgs/reviewCampaigns/OrgReviewCampaignNewPage/RequestAddStep2/SelectedTeamMemberListItem';
import {CreateReviewCampaignRequestDto} from '^models/ReviewCampaign/type';
import {integrationSlackWorkspaceApi} from '^models/integration/IntegrationSlackWorkspace/api';
import {organizationConnectGoogleWorkspaceApi} from '^models/Organization/api';
import {useCurrentOrg} from '^models/Organization/hook';
import {TeamMemberDto, useTeamMembers, useTeamMembersInReviewCampaignCreate} from '^models/TeamMember';
import {Button} from '^public/components/ui/button';
import GoogleIcon from '^public/logo/icons/ic_google.png';
import SlackIcon from '^public/logo/icons/ic_slack.png';
import {createReviewCampaignRequestAtom, useReviewCampaignCreateStep} from '../atom';
import {StepCard, StepCardBody, StepSubmitButton} from '../components';
import {TeamMemberSearch} from './TeamMemberSearch';
import {toast} from 'react-hot-toast';
import {IntegrationSlackWorkspaceDto} from '^models/integration/IntegrationSlackWorkspace/type/IntegrationSlackWorkspace.dto';
import {slackScordiOauthApi} from '^models/_slack-bot/api';
import {isDefinedValue, uniq} from '^utils/array';

const getSlack = async (orgId: number): Promise<IntegrationSlackWorkspaceDto | undefined> => {
    const res = await integrationSlackWorkspaceApi.index(orgId);
    return res.data.items[0] || undefined;
};

export const RequestAddStep2 = ({form}: {form: UseFormReturn<CreateReviewCampaignRequestDto, any>}) => {
    const orgId = useIdParam('id');
    const {getStep, setFoldStep, changeStep} = useReviewCampaignCreateStep();
    const {
        data: {items: teamMembers},
        refetch,
    } = useTeamMembersInReviewCampaignCreate(orgId, {
        relations: ['teams', 'slackMember'],
        order: {id: 'DESC'},
        updateCounterCacheColumn: 'subscriptionCount',
        itemsPerPage: 0,
    });
    const {currentOrg} = useCurrentOrg(orgId);
    const step = getStep(2);
    const selectedTeamMembers = (form.watch('teamMemberIds') || [])
        .map((id) => teamMembers.find((t) => t.id === id))
        .filter(isDefinedValue);

    const selectMember = (member: TeamMemberDto) => {
        const oldVal = form.getValues('teamMemberIds') || [];
        const newVal = [...oldVal, member.id];
        form.setValue('teamMemberIds', newVal);
    };

    const unSelectMember = (member: TeamMemberDto) => {
        const oldVal = form.getValues('teamMemberIds') || [];
        const newVal = oldVal.filter((val) => val !== member.id);
        form.setValue('teamMemberIds', newVal);
    };

    const onLoadSlackMembers = async () => {
        const workspace = await getSlack(orgId);
        if (!workspace) window.open(slackScordiOauthApi.authUrl(orgId), '_blank');
    };

    const onLoadGoogleMembers = () => {
        if (!currentOrg?.lastGoogleSyncHistory?.googleTokenData) {
            toast.error('구글 워크스페이스가 연결되어 있지 않습니다. 먼저 구글 워크스페이스를 연결해주세요.');
            return;
        }

        organizationConnectGoogleWorkspaceApi
            .sync(orgId)
            .then((res) => {
                // const googleMembers = res.data;
                refetch().then(() => toast.success('구글 워크스페이스에서 팀 멤버들을 불러왔어요.'));
            })
            .catch((error) => {
                if (error.response?.status === 422) {
                    toast.error('구글 워크스페이스 연동에 문제가 있습니다. 설정에서 연동 상태를 확인해주세요.');
                } else {
                    toast.error('팀 멤버를 불러오는 중 오류가 발생했습니다.');
                }
            });
    };

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

                    <TeamMemberSearch form={form} teamMembers={teamMembers} onSelectMember={selectMember} />
                </div>

                <div className="grid grid-cols-2 gap-2">
                    {selectedTeamMembers.map((teamMember) => (
                        <SelectedTeamMemberListItem
                            key={teamMember.id}
                            teamMember={teamMember}
                            onRemove={unSelectMember}
                        />
                    ))}
                </div>

                <div className={'flex justify-center space-x-4'}>
                    <StepSubmitButton
                        onClick={() => {
                            setFoldStep(2, true);
                            changeStep(3);
                        }}
                        disabled={selectedTeamMembers.length === 0}
                    />
                </div>
            </StepCardBody>
        </StepCard>
    );
};
