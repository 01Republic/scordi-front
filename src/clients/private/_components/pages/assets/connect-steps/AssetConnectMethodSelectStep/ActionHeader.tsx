import {memo, useContext} from 'react';
import {useRouter} from 'next/router';
import {useRecoilValue} from 'recoil';
import {ArrowLeft} from 'lucide-react';
import {orgIdParamState, useOrgIdParam} from '^atoms/common';
import {OrgSubscriptionSelectPageRoute} from '^pages/orgs/[id]/subscriptions/select';
import {LinkTo} from '^components/util/LinkTo';
import {AssetConnectOptionContext} from '^_components/pages/assets/connect-steps';

export const ActionHeader = memo(() => {
    const router = useRouter();
    const {ConnectMethodAltActionButton} = useContext(AssetConnectOptionContext);

    return (
        <div className="flex w-full items-center justify-between font-normal text-gray-600">
            <LinkTo
                className="flex gap-1 items-center text-14 cursor-pointer text-gray-600 transition-all hover:text-gray-800 hover:font-semibold"
                onClick={() => router.back()}
                displayLoading={false}
            >
                <ArrowLeft />
                뒤로가기
            </LinkTo>

            {ConnectMethodAltActionButton && <ConnectMethodAltActionButton />}
        </div>
    );
});
