import {memo} from 'react';
import {useConnectPrototypeModalState} from '^atoms/connectPrototypes.atom';
import {useRouter} from 'next/router';
import {OrgAppShowPageRoute} from '^pages/orgs/[id]/apps/[appId]';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {useRecoilValue} from 'recoil';

export const SuccessfullySubmitted = memo(() => {
    const router = useRouter();
    const orgId = useRecoilValue(orgIdParamState);
    const {createdApplicationId, closeModal} = useConnectPrototypeModalState();

    const completeBtnClick = () => {
        closeModal();
        router.replace(OrgAppShowPageRoute.path(orgId, createdApplicationId));
    };

    return (
        <div className="flex flex-col mb-4 gap-y-4">
            <h4>Successfully Submitted!</h4>
            <p>Please wait until connected.</p>
            <button className="btn btn-primary" onClick={completeBtnClick}>
                ok
            </button>
        </div>
    );
});
