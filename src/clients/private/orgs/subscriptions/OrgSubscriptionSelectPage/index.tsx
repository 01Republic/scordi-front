import React, {memo} from 'react';
import {SearchProductInput} from './SearchProductInput';
import {SelectableProductSection} from './SelectableProductSection';
import {SelectedProductTagSection} from './SelectedProductTagSection';
import {ActionButtons} from './ActionButtons';
import {SelectedStatusSection} from './SelectedStatusSection';
import {BaseLayout} from '^clients/private/_layouts/BaseLayout';

export const OrgSubscriptionSelectPage = memo(function OrgSubscriptionSelectPage() {
    return (
        <BaseLayout>
            <main className="w-full min-h-screen container max-w-4xl sm:pt-[80px] pb-8">
                <div className="px-4 pt-10 sm:px-0 sm:pt-0 sm:text-center">
                    <h1 className="text-xl sm:text-2xl mb-3 sm:mb-4">어떤 앱을 이용하고 있나요?</h1>
                    <p className="text-14 sm:text-16 mb-6 sm:mb-10">
                        We'll give you personalized workflow recommendations based on the apps you choose.
                    </p>
                </div>

                <div className="px-4 sm:px-0">
                    <SearchProductInput />
                    <SelectableProductSection />
                    <SelectedStatusSection />
                    <SelectedProductTagSection />
                </div>

                <div
                    className="p-4 sm:px-0 sticky bottom-0"
                    style={{
                        background: 'linear-gradient(0deg, #fafafa, #fafafa 80%, transparent)',
                    }}
                >
                    <ActionButtons />
                </div>
            </main>
        </BaseLayout>
    );
});
