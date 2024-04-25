import {memo, useState} from 'react';
import {GoogleSyncHistoryDto} from '^models/GoogleSyncHistory/type';
import {CardTableTR} from '^admin/share';
import {yyyy_mm_dd_hh_mm} from '^utils/dateTime';
import {GoogleProfile} from '^v3/V3OrgSettingsConnectsPage/WorkspaceSection/Buttons/GoogleProfile';
import {organizationConnectGoogleWorkspaceApi} from '^models/Organization/api';
import {useRecoilValue} from 'recoil';
import {adminOrgDetail} from '^admin/orgs/AdminOrgDetailPage';
import {plainToast as toast} from '^hooks/useToast';
import {useAlert} from '^hooks/useAlert';

interface GoogleSyncHistoryItemProps {
    googleSyncHistory: GoogleSyncHistoryDto;
    onFinish: () => any;
    borderBottom?: boolean;
}

export const GoogleSyncHistoryItem = memo((props: GoogleSyncHistoryItemProps) => {
    const [isSyncLoading, setSyncLoading] = useState(false);
    const [isDisConnectLoading, setDisConnectLoading] = useState(false);
    const {alert} = useAlert();

    const {googleSyncHistory, borderBottom = true, onFinish} = props;
    const {googleTokenData} = googleSyncHistory;
    const orgId = googleSyncHistory.organizationId;

    return (
        <CardTableTR gridClass="grid-cols-5" borderBottom={borderBottom}>
            {/* id */}
            <div>
                {googleSyncHistory.id} (token id: {googleTokenData.id})
            </div>

            {/* 계정 */}
            <div>
                <GoogleProfile tokenData={googleTokenData} />
            </div>

            {/* 실행 시각 */}
            <div>{yyyy_mm_dd_hh_mm(googleSyncHistory.createdAt)}</div>

            {/* token */}
            <div></div>

            {/* action */}
            <div className="flex gap-2 items-center justify-end">
                {/*<button className="btn btn-sm btn-error">삭제</button>*/}
            </div>
        </CardTableTR>
    );
});
GoogleSyncHistoryItem.displayName = 'GoogleSyncHistoryItem';
