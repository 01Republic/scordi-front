import {useOrgIdParam} from '^atoms/common';
import {OrgAssetsCreateMethodSelectPageRoute} from '^pages/orgs/[id]/assets/new';
import {Plus} from 'lucide-react';
import {useTranslation} from 'next-i18next';
import {useRouter} from 'next/router';
import {memo} from 'react';

interface AddAssetButtonProps {
    //
}

export const AddAssetButton = memo((props: AddAssetButtonProps) => {
    const {} = props;
    const router = useRouter();
    const orgId = useOrgIdParam();
    const {t} = useTranslation('assets');

    return (
        <button
            tabIndex={0}
            className="btn btn-scordi gap-2 mb-1 no-animation btn-animation"
            onClick={() => router.push(OrgAssetsCreateMethodSelectPageRoute.path(orgId))}
        >
            <Plus />
            <span className="mr-1.5">{t('common.addAsset') as string}</span>
        </button>
    );
});
AddAssetButton.displayName = 'AddAssetButton';
