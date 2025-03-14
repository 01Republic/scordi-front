import React, {memo, useEffect, useRef, useState} from 'react';
import {ConnectMethodCard} from '^v3/V3OrgConnectsPage/ConnectsPageBody/ConnectMethodCard';
import {Connectors, V3OrgConnectorDetailPageRoute} from '^pages/v3/orgs/[orgId]/connects/[connectorName]';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {useCurrentOrg} from '^models/Organization/hook';
import {MoreDropdown} from '^v3/V3OrgSettingsConnectsPage/MoreDropdown';
import {useAlert} from '^hooks/useAlert';
import {GoogleSyncHistoryDto} from '^models/GoogleSyncHistory/type';
import {plainToast as toast} from '^hooks/useToast';
import {organizationConnectGoogleWorkspaceApi} from '^models/Organization/api';
import {OnboardingSkippedStore, SkippedStoreStatus} from '^v3/share/OnboardingFlow/SkipButton';
import {GoogleProfile} from '^v3/V3OrgSettingsConnectsPage/WorkspaceSection/Buttons/GoogleProfile';
import {MoreDropdownListItem} from '^v3/share/table/columns/SelectColumn/OptionItem/MoreDropdown/ListItem';
import {useRouter} from 'next/router';
import {ChevronDown, ChevronRight, Link, MoreHorizontal} from 'lucide-react';

export const GoogleWorkspaceConnector = memo(function GoogleWorkspaceConnector() {
    const orgId = useRecoilValue(orgIdParamState);
    const router = useRouter();
    const {currentOrg, reload} = useCurrentOrg(orgId);

    useEffect(() => {
        if (!orgId || isNaN(orgId)) return;
        reload();
    }, [router.isReady, orgId]);

    if (currentOrg?.lastGoogleSyncHistory) {
        return <GoogleWorkspaceConnectedCard lastSyncHistory={currentOrg.lastGoogleSyncHistory} />;
    } else {
        return (
            <ConnectMethodCard
                logo="https://fonts.gstatic.com/s/i/productlogos/admin_2020q4/v6/192px.svg"
                title="구글 워크스페이스"
                comment="관리자 연동"
                href={V3OrgConnectorDetailPageRoute.path(orgId, Connectors.googleWorkspace)}
            />
        );
    }
});

interface Props {
    lastSyncHistory: GoogleSyncHistoryDto;
}

const GoogleWorkspaceConnectedCard = memo((props: Props) => {
    const orgId = useRecoilValue(orgIdParamState);
    const {reload: reloadCurrentOrg, currentOrg} = useCurrentOrg(orgId);
    const [isSyncLoading, setSyncLoading] = useState(false);
    const [isDisConnectLoading, setDisConnectLoading] = useState(false);
    const {alert} = useAlert();
    const {lastSyncHistory} = props;
    const lastSyncAccount = lastSyncHistory.googleTokenData;
    const moreDropdownLabelRef = useRef<HTMLDivElement | null>(null);

    const onSync = () => {
        if (!orgId) return;
        if (!lastSyncAccount) return toast.error('연동된 계정이 없습니다.');

        setSyncLoading(true);
        const req = organizationConnectGoogleWorkspaceApi.sync(orgId);
        req.then(() => {
            reloadCurrentOrg();
            toast.success('동기화가 완료됐습니다.');
        });
        req.catch((err) => toast.error(err.response.data.message));
        req.finally(() => setSyncLoading(false));
    };

    const onDisConnect = () => {
        if (!orgId) return;
        if (!lastSyncAccount) return toast.error('연동된 계정이 없습니다.');

        const req = alert.destroy({
            title: '연동을 해제하시겠습니까?',
            onConfirm: () => organizationConnectGoogleWorkspaceApi.disconnect(orgId),
        });

        setDisConnectLoading(true);
        req.then((res) => {
            if (!res) return;

            reloadCurrentOrg();
            toast.success('삭제가 완료됐습니다.');
        });
        req.catch((err) => toast.error(err.response.data.message));
        req.finally(() => setDisConnectLoading(false));
    };

    if (!currentOrg) return <></>;

    return (
        <div className="relative">
            <ConnectMethodCard
                logo="https://fonts.gstatic.com/s/i/productlogos/admin_2020q4/v6/192px.svg"
                title="구글 워크스페이스"
                comment="관리자 연동"
                className="!opacity-100"
                connected
                preventAnim
                onClick={() => moreDropdownLabelRef?.current?.click()}
            />

            <div className="absolute top-0 bottom-0 right-4 flex items-center">
                <MoreDropdown
                    placement="right"
                    onSync={onSync}
                    onDelete={onDisConnect}
                    isSyncLoading={isSyncLoading}
                    isDisConnectLoading={isDisConnectLoading}
                    className="self-center"
                    Trigger={() => (
                        <div ref={moreDropdownLabelRef}>
                            <div className="cursor-pointer text-gray-500 text-14 flex gap-1 items-center">
                                <ChevronRight className="relative -top-[1px]" />
                            </div>
                        </div>
                    )}
                    Profile={() => (
                        <MoreDropdownListItem onClick={console.log}>
                            <div className="py-2 px-0">
                                <GoogleProfile tokenData={lastSyncAccount} />
                            </div>
                        </MoreDropdownListItem>
                    )}
                />
            </div>
        </div>
    );
});
