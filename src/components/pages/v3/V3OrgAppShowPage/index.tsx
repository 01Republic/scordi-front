import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {currentOrgAtom} from '^atoms/organizations.atom';
import {useTranslation} from 'next-i18next';
import {useOnResize2} from '^components/util/onResize2';
import {V3ModalLikeLayoutMobile} from '^v3/layouts/V3ModalLikeLayout.mobile';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {InformationPanel} from './InformationPanel';
import {BillingHistoryContentPanel} from './BillingHistoryContentPanel';

export const V3OrgAppShowPage = memo(() => {
    const currentOrg = useRecoilValue(currentOrgAtom);
    const {t} = useTranslation('org-home');
    const {isDesktop} = useOnResize2();

    return (
        <V3ModalLikeLayoutMobile>
            <MobileSection.List className="h-full">
                <InformationPanel />
                <BillingHistoryContentPanel />
            </MobileSection.List>
        </V3ModalLikeLayoutMobile>
    );
});
