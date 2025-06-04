import {useRecoilValue} from 'recoil';
import {useRouter} from 'next/router';
import {memo, useEffect, useState} from 'react';
import {orgIdParamState} from '^atoms/common';
import {integrationSlackMemberApi} from '^models/integration/IntegrationSlackMember/api';
import {useIntegrationWorkspaceInSettingPage} from '^models/IntegrationWorkspace/hook';
import {OrgOnboardingRequestPageRoute} from '^pages/orgs/[id]/onboarding/request';
import {ConnectingResultScreen, NewMember} from '../ConnectingResultScreen';
import {SlackBeforeConnectPage} from './SlackBeforeConnectPage';

interface SlackConnectorPageProps {
    onNext?: () => void;
}

export const SlackConnectorPage = memo(function SlackConnectorPage({onNext}: SlackConnectorPageProps) {
    const router = useRouter();
    const orgId = useRecoilValue(orgIdParamState);
    const {findSlack} = useIntegrationWorkspaceInSettingPage(orgId);
    const slackConfig = findSlack();
    const [newMembers, setNewMembers] = useState<NewMember[]>([]);

    useEffect(() => {
        if (slackConfig) {
            integrationSlackMemberApi
                .index(orgId, slackConfig.id, {
                    relations: ['teamMember'],
                    itemsPerPage: 0,
                })
                .then((res) => {
                    setNewMembers(
                        res.data.items
                            .filter((item) => !item.isDeleted)
                            .map(
                                (item): NewMember => ({
                                    profileImageUrl: item.imageUrl ?? undefined,
                                    name: item.displayName ?? '',
                                    email: item.email ?? '',
                                }),
                            ),
                    );
                });
        }
    }, [slackConfig]);

    if (slackConfig) {
        return (
            <ConnectingResultScreen
                onNext={() => (onNext ? onNext : router.push(OrgOnboardingRequestPageRoute.path(orgId)))}
                newMembers={newMembers}
            />
        );
    }

    return <SlackBeforeConnectPage />;
});
