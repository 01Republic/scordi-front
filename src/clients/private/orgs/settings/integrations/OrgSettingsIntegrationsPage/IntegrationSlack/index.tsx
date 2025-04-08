import {memo, useState} from 'react';
import SlackLogo from '^public/images/logo/external/logo_slack.png';
import {IntegrationProviderItem} from '../IntegrationProviderItem';
import {slackScordiOauthApi} from '^models/_slack-bot/api';
import {OauthV2AccessResponse} from '@slack/web-api';
import {debounce} from 'lodash';
import {toast} from 'react-hot-toast';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {useIntegrationWorkspaceInSettingPage} from '^models/IntegrationWorkspace/hook';
import {OrgIntegrationSlackWorkspaceDetailPageRoute} from '^pages/orgs/[id]/settings/integrations/slack/[slackWorkspaceId]';

interface IntegrationSlackProps {
    //
}

export const IntegrationSlack = memo((props: IntegrationSlackProps) => {
    const {} = props;
    const orgId = useRecoilValue(orgIdParamState);
    const {refetch, findSlack, isLoading} = useIntegrationWorkspaceInSettingPage(orgId);
    const slackConfig = findSlack();

    return (
        <IntegrationProviderItem
            id="slack"
            name="슬랙"
            logo={SlackLogo}
            disabled={isLoading}
            isInstalled={!!slackConfig}
            href={slackConfig ? OrgIntegrationSlackWorkspaceDetailPageRoute.path(orgId, slackConfig.id) : undefined}
            install={debounce(() => {
                window.open(slackScordiOauthApi.authUrl(orgId), '_blank');
            }, 500)}
            onAuthorized={async (data: OauthV2AccessResponse) => {
                console.log('data', data);
                await refetch();
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
