import React, {memo} from 'react';
import {ConnectSubscriptionsLayout} from '^clients/private/_layouts/ConnectSubscriptionsLayout';
import {SearchProductInput} from './SearchProductInput';
import {SelectableProductSection} from './SelectableProductSection';
import {SelectedProductTagSection} from './SelectedProductTagSection';
import {ActionButtons} from './ActionButtons';
import {SelectedStatusSection} from './SelectedStatusSection';

export const OrgSubscriptionSelectPage = memo(function OrgSubscriptionSelectPage() {
    return (
        <ConnectSubscriptionsLayout>
            <main className="container max-w-4xl pt-[80px] pb-8">
                <div className="text-center">
                    <h1 className="text-2xl mb-4">어떤 앱을 이용하고 있나요?</h1>
                    <p className="text-16 mb-10">
                        We'll give you personalized workflow recommendations based on the apps you choose.
                    </p>
                </div>

                <div>
                    <SearchProductInput />
                    <SelectableProductSection />
                    <SelectedStatusSection />
                    <SelectedProductTagSection />
                </div>

                <ActionButtons />
            </main>
        </ConnectSubscriptionsLayout>
    );
});
