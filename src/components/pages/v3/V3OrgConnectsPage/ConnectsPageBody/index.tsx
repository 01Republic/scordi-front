import {memo} from 'react';
import {ConnectMethodTabs} from '../ConnectsPageHeader/BorderedTabs';
import {ConnectWorkspaceSection} from './ConnectWorkspaceSection';
import {ConnectInvoiceEmailsSection} from './ConnectInvoiceEmailsSection';
import {ConnectCardAccountsSection} from './ConnectCardAccountsSection';

interface ConnectsPageBodyProps {
    //
}

export const ConnectsPageBody = memo((props: ConnectsPageBodyProps) => {
    const {} = props;

    return (
        <div className="py-16 px-12">
            <ConnectWorkspaceSection />

            <ConnectInvoiceEmailsSection />

            <ConnectCardAccountsSection />
        </div>
    );
});
ConnectsPageBody.displayName = 'ConnectsPageBody';
