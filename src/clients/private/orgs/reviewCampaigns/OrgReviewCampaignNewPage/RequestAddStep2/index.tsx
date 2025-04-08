import {useEffect} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {useRouter} from 'next/router';
import Image from 'next/image';
import SlackIcon from '^public/logo/icons/ic_slack.png';
import GoogleIcon from '^public/logo/icons/ic_google.png';
import {Button} from '^public/components/ui/button';
import {orgIdParamState} from '^atoms/common';
import {TeamMemberDto, useTeamMembers} from '^models/TeamMember';
import {createReviewCampaignRequestAtom, useReviewCampaignCreateStep} from '../atom';
import {SelectedTeamMemberListItem} from '^clients/private/orgs/reviewCampaigns/OrgReviewCampaignNewPage/RequestAddStep2/SelectedTeamMemberListItem';
import {TeamMemberSearch} from '^clients/private/orgs/reviewCampaigns/OrgReviewCampaignNewPage/RequestAddStep2/TeamMemberSearch';
import {StepCard, StepCardBody, StepSubmitButton} from '../components';

export const RequestAddStep2 = () => {
    const router = useRouter();
    const orgId = useRecoilValue(orgIdParamState);
    const {getStep, setFoldStep, changeStep} = useReviewCampaignCreateStep();
    const [formData, setFormData] = useRecoilState(createReviewCampaignRequestAtom);
    const {result, searchAndUpdateCounter} = useTeamMembers();
    const step = getStep(2);
    const teamMembers = result.items;

    const onReady = () => {
        searchAndUpdateCounter({
            relations: ['teams'],
            order: {id: 'DESC'},
            updateCounterCacheColumn: 'subscriptionCount',
            itemsPerPage: 0,
        });
    };

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

    const validTeamMemberIds = (ids: number[]) => {
        if (ids.length === 0) return false;
        return true;
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

                {/* TODO: 슬랙, 구글 불러오기 기능 추가 */}
                <div className={'space-y-2'}>
                    <div className={'flex justify-end items-center'}>
                        <div className={'flex items-center space-x-1 text-sm'}>
                            <span>불러오기:</span>
                            <Button size={'sm'} variant={'ghostGray'}>
                                <Image src={SlackIcon} alt={'Slack'} width={20} height={20} />
                                Slack
                            </Button>
                            <Button size={'sm'} variant={'ghostGray'}>
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
                        disabled={!validTeamMemberIds(formData.teamMemberIds || [])}
                    />
                </div>
            </StepCardBody>
        </StepCard>
    );
};
