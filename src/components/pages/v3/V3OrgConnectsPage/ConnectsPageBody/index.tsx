import {memo} from 'react';
import {ConnectWorkspaceSection} from './ConnectWorkspaceSection';
import {ConnectInvoiceEmailsSection} from './ConnectInvoiceEmailsSection';
import {ConnectCardAccountsSection} from './ConnectCardAccountsSection';

export const ConnectsPageBody = memo(() => {
    return (
        <div className="py-16 px-12">
            <ConnectCardAccountsSection />
            <ConnectInvoiceEmailsSection />
            <ConnectWorkspaceSection />
        </div>
    );
});
ConnectsPageBody.displayName = 'ConnectsPageBody';
