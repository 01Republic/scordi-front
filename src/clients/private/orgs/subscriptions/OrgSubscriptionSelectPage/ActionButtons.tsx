import React, {memo} from 'react';
import {LinkTo} from '^components/util/LinkTo';
import {useSelectProducts} from '^models/Product/hook';
import {useRouter} from 'next/router';
import {OrgSubscriptionConnectsPageRoute} from '^pages/orgs/[id]/subscriptions/connects';
import {useOrgIdParam} from '^atoms/common';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import {OrgOnboardingSubscriptionConnectionManualConnectsPageRoute} from '^pages/orgs/[id]/onboarding/subscription/connection/manual/connects';
import {OrgOnboardingSubscriptionConnectionManualSelectPageRoute} from '^pages/orgs/[id]/onboarding/subscription/connection/manual/select';

export const ActionButtons = memo(function ActionButtons() {
    const orgId = useOrgIdParam();
    const router = useRouter();
    const {selectedProducts} = useSelectProducts();
    const size = selectedProducts.length;

    const redirect =
        router.pathname === OrgOnboardingSubscriptionConnectionManualSelectPageRoute.pathname
            ? OrgOnboardingSubscriptionConnectionManualConnectsPageRoute.path(orgId)
            : OrgSubscriptionConnectsPageRoute.path(orgId);

    return (
        <div className="flex items-center justify-between">
            <button className="btn gap-3 items-center px-6" onClick={() => router.back()}>
                <ChevronLeft className="size-5" />
                <span>이전</span>
            </button>

            <LinkTo
                href={redirect}
                className={`btn btn-scordi gap-3 items-center px-6 ${
                    size === 0 ? 'btn-disabled !bg-gray-100 !text-gray-300 border-0' : ''
                }`}
                loadingOnBtn
            >
                <span>다음</span>
                <ChevronRight className="size-5" />
            </LinkTo>
        </div>
    );
});
