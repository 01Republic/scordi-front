import React, {memo} from 'react';
import {OrgAssetsCreateMethodSelectPageRoute} from '^pages/orgs/[id]/assets/new';
import {Plus} from 'lucide-react';
import {useRouter} from 'next/router';
import {useOrgIdParam} from '^atoms/common';

interface AddAssetButtonProps {
    //
}

export const AddAssetButton = memo((props: AddAssetButtonProps) => {
    const {} = props;
    const router = useRouter();
    const orgId = useOrgIdParam();

    return (
        <button
            tabIndex={0}
            className="btn btn-scordi gap-2 mb-1 no-animation btn-animation"
            onClick={() => router.push(OrgAssetsCreateMethodSelectPageRoute.path(orgId))}
        >
            <Plus />
            <span className="mr-1.5">자산 추가</span>
        </button>
    );
});
AddAssetButton.displayName = 'AddAssetButton';
