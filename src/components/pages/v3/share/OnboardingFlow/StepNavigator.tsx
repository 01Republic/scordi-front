import {memo} from 'react';
import {ConnectWorkspaceTab, ConnectInvoiceAccountTab, FinishTab} from '^v3/share/OnboardingFlow/tabs';

export const StepNavigator = memo(function StepNavigator() {
    return (
        <section data-component="StepNavigator" className="container max-w-2xl mt-[40px] mb-[150px]">
            <div className="tabs w-full grid grid-cols-3 gap-4">
                <ConnectWorkspaceTab />
                <ConnectInvoiceAccountTab />
                <FinishTab />
            </div>
        </section>
    );
});
