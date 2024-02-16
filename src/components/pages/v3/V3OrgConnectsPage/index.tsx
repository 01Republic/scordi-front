import {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {ReactComponentLike} from 'prop-types';
import {useOnResize2} from '^components/util/onResize2';
import {V3ListPageLayout} from '^v3/layouts/V3ListPageLayout';
import {LNBIndex} from '^v3/share/LeftNavBar';
import {ConnectsPageTitle} from '^v3/V3OrgConnectsPage/ConnectsPageTitle';
import {DatasourceListSection} from '^v3/V3OrgConnectsPage/DatasourceListSection';
import {NewInvoiceAccountModalInConnects} from '^v3/V3OrgConnectsPage/_localModals/NewInvoiceAccountModal';
import {isWorkspaceConnectLoadingAtom} from '^v3/V3OrgConnectsPage/atom';
import {LoadingProgress} from '^v3/V3OrgSettingsConnectsPage/WorkspaceSection/LoadingProgress';

const MODALS: ReactComponentLike[] = [
    NewInvoiceAccountModalInConnects, // 새로운 인보이스 계정 추가 모달
];

export const V3OrgConnectsPage = memo(() => {
    const {isDesktop} = useOnResize2();
    const isLoading = useRecoilValue(isWorkspaceConnectLoadingAtom);

    if (isLoading) return <LoadingProgress />;

    if (isDesktop) {
        return (
            <V3ListPageLayout activeTabIndex={LNBIndex.Connects} modals={MODALS}>
                <ConnectsPageTitle />
                <DatasourceListSection />
            </V3ListPageLayout>
        );
    } else {
        return <></>;
    }
});
