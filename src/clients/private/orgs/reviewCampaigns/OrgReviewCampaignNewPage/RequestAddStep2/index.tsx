import {useIdParam} from '^atoms/common';
import {SelectedTeamMemberListItem} from '^clients/private/orgs/reviewCampaigns/OrgReviewCampaignNewPage/RequestAddStep2/SelectedTeamMemberListItem';
import {slackScordiOauthApi} from '^models/_slack-bot/api';
import {integrationSlackWorkspaceApi} from '^models/integration/IntegrationSlackWorkspace/api';
import {IntegrationSlackWorkspaceDto} from '^models/integration/IntegrationSlackWorkspace/type/IntegrationSlackWorkspace.dto';
import {organizationConnectGoogleWorkspaceApi} from '^models/Organization/api';
import {useCurrentOrg} from '^models/Organization/hook';
import {CreateReviewCampaignRequestDto} from '^models/ReviewCampaign/type';
import {TeamMemberDto, useTeamMembersInReviewCampaignCreate} from '^models/TeamMember';
import {Button} from '^public/components/ui/button';
import SlackIcon from '^public/logo/icons/ic_slack.png';
import {isDefinedValue} from '^utils/array';
import {useTranslation} from 'next-i18next';
import Image from 'next/image';
import {UseFormReturn} from 'react-hook-form';
import {toast} from 'react-hot-toast';
import {useReviewCampaignCreateStep} from '../atom';
import {StepCard, StepCardBody, StepSubmitButton} from '../components';
import {TeamMemberSearch} from './TeamMemberSearch';

const getSlack = async (orgId: number): Promise<IntegrationSlackWorkspaceDto | undefined> => {
    const res = await integrationSlackWorkspaceApi.index(orgId);
    return res.data.items[0] || undefined;
};

export const RequestAddStep2 = ({form}: {form: UseFormReturn<CreateReviewCampaignRequestDto, any>}) => {
    const orgId = useIdParam('id');
    const {t} = useTranslation('reviewCampaigns');
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
        if (workspace) return toast(t('step2.alreadyConnected'));
        const authUrl = (() => {
            const url = new URL(slackScordiOauthApi.authUrl(orgId));
            const redirectUrl = new URL(url.searchParams.get('redirect') || '');
            redirectUrl.searchParams.set('closeWindowOnReady', '1');
            url.searchParams.set('redirect', redirectUrl.toString());
            return url.toString();
        })();
        window.open(authUrl, '_blank');
    };

    const onLoadGoogleMembers = () => {
        if (!currentOrg?.lastGoogleSyncHistory?.googleTokenData) {
            toast.error(t('step2.googleNotConnected'));
            return;
        }

        organizationConnectGoogleWorkspaceApi
            .sync(orgId)
            .then((res) => {
                // const googleMembers = res.data;
                refetch().then(() => toast.success(t('step2.googleLoadSuccess')));
            })
            .catch((error) => {
                if (error.response?.status === 422) {
                    toast.error(t('step2.googleSyncError'));
                } else {
                    toast.error(t('step2.loadError'));
                }
            });
    };

    return (
        <StepCard
            title={t('step2.title')}
            isHidden={!!step?.hidden}
            isCurrent={!!step?.isFocused}
            isFolded={!!step?.folded}
            setIsFolded={(isFolded) => setFoldStep(2, isFolded)}
        >
            <StepCardBody>
                <div className={'text-14'}>{t('step2.description')}</div>

                <div className={'space-y-2'}>
                    <div className={'flex justify-end items-center'}>
                        <div className={'flex items-center space-x-1 text-sm'}>
                            <span>{t('step2.loadLabel')}</span>
                            <Button type="button" size={'sm'} variant={'ghostGray'} onClick={onLoadSlackMembers}>
                                <Image src={SlackIcon} alt={'Slack'} width={20} height={20} />
                                {t('step2.slack')}
                            </Button>
                            {/*<Button type="button" size={'sm'} variant={'ghostGray'} onClick={onLoadGoogleMembers}>*/}
                            {/*    <Image src={GoogleIcon} alt={'Google Workspace'} width={20} height={20} />*/}
                            {/*    Google Workspace*/}
                            {/*</Button>*/}
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
                        type="button"
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
