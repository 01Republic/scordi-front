import {orgIdParamState} from '^atoms/common';
import {useIntegrationWorkspaceInSettingPage} from '^models/IntegrationWorkspace/hook';
import {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {ConnectingResultScreen} from '../ConnectingResultScreen';
import {SlackBeforeConnectPage} from './SlackBeforeConnectPage';

export const SlackConnectorPage = memo(function SlackConnectorPage() {
    const orgId = useRecoilValue(orgIdParamState);
    const {findSlack} = useIntegrationWorkspaceInSettingPage(orgId);
    const slackConfig = findSlack();

    if (slackConfig) {
        return <ConnectingResultScreen onNext={() => {}} newMembers={[]} />;
    }

    return <SlackBeforeConnectPage />;
});
