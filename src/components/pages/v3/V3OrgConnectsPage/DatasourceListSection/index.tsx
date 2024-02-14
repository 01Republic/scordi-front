import {memo} from 'react';
import {WorkspacesSection} from '^v3/V3OrgConnectsPage/DatasourceListSection/WorkspacesSection';
import {InvoiceAccountsSection} from '^v3/V3OrgConnectsPage/DatasourceListSection/InvoiceAccountsSection';
import {CardsSection} from '^v3/V3OrgConnectsPage/DatasourceListSection/CardsSection';

export const DatasourceListSection = memo(() => {
    return (
        <section className="border w-full flex rounded-box bg-white">
            <WorkspacesSection />
            <InvoiceAccountsSection />
            <CardsSection />
        </section>
    );
});
