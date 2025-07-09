import {memo} from 'react';
import SlackLogo from '^public/images/logo/external/logo_slack.png';
import {IntegrationProviderItem} from '../IntegrationProviderItem';
import {slackScordiOauthApi} from '^models/_slack-bot/api';
import {OauthV2AccessResponse} from '@slack/web-api';
import {debounce} from 'lodash';
import {toast} from 'react-hot-toast';
import {useOrgIdParam} from '^atoms/common';
import {OrgIntegrationSlackWorkspaceDetailPageRoute} from '^pages/orgs/[id]/settings/integrations/slack/[slackWorkspaceId]';
import {IntegrationProvider, IntegrationWorkspaceDto} from '^models/IntegrationWorkspace/type';

interface IntegrationSlackProps {
    config: IntegrationWorkspaceDto<IntegrationProvider.slack> | undefined;
    reload: () => any;
    isLoading: boolean;
}

export const IntegrationSlack = memo((props: IntegrationSlackProps) => {
    const {config, reload, isLoading} = props;
    const orgId = useOrgIdParam();

    return (
        <IntegrationProviderItem
            id="slack"
            name="슬랙"
            logo={SlackLogo}
            disabled={isLoading}
            isInstalled={!!config}
            href={
                config ? OrgIntegrationSlackWorkspaceDetailPageRoute.path(config.organizationId, config.id) : undefined
            }
            install={() => window.open(slackScordiOauthApi.authUrl(orgId), '_blank')}
            onAuthorized={async (data: OauthV2AccessResponse) => {
                console.log('data', data);
                await reload();
            }}
            // onSuccess={async (data: OauthV2AccessResponse) => {
            // }}
            onFailure={(error) => {
                toast.error(error.message);
            }}
        />
    );
});
IntegrationSlack.displayName = 'IntegrationSlack';
