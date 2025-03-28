import React, {memo} from 'react';
import {LinkTo} from '^components/util/LinkTo';
import {useSelectProducts} from '^models/Product/hook';
import {useRouter} from 'next/router';
import {OrgSubscriptionConnectsPageRoute} from '^pages/orgs/[id]/subscriptions/connects';
import {useOrgIdParam} from '^atoms/common';
import {ChevronLeft, ChevronRight} from 'lucide-react';

export const ActionButtons = memo(function ActionButtons() {
    const orgId = useOrgIdParam();
    const router = useRouter();
    const {selectedProducts} = useSelectProducts();
    const size = selectedProducts.length;

    return (
        <div className="flex items-center justify-between">
            <button className="btn gap-3 items-center px-6" onClick={() => router.back()}>
                <ChevronLeft className="size-5" />
                <span>이전</span>
            </button>

            <LinkTo
                href={OrgSubscriptionConnectsPageRoute.path(orgId)}
                className={`btn btn-scordi gap-3 items-center px-6 ${
                    size === 0 ? 'btn-disabled !bg-scordi !text-white opacity-40' : ''
                }`}
                loadingOnBtn
            >
                <span>다음</span>
                <ChevronRight className="size-5" />
            </LinkTo>
        </div>
    );
});
