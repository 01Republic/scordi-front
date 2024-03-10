import {memo} from 'react';
import {ReactComponentLike} from 'prop-types';
import {V3MainLayout} from '^v3/layouts/V3MainLayout';
import {LNBIndex} from '^v3/share/LeftNavBar';
import {NewInvoiceAccountModalInConnects} from './_localModals/NewInvoiceAccountModal';
import {ConnectsPageHeader} from './ConnectsPageHeader';
import {ConnectsPageBody} from './ConnectsPageBody';

const MODALS: ReactComponentLike[] = [
    NewInvoiceAccountModalInConnects, // 새로운 인보이스 계정 추가 모달
];

export const V3OrgConnectsPage = memo(() => {
    return (
        <V3MainLayout activeTabIndex={LNBIndex.Connects} modals={MODALS}>
            {/*<style dangerouslySetInnerHTML={{__html: `html { scroll-behavior: smooth; }`}} />*/}
            <ConnectsPageHeader />
            <ConnectsPageBody />
        </V3MainLayout>
    );
});
