import {useState} from 'react';
import {inviteMembershipApi} from '^models/Membership/api';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {useAlert} from '^hooks/useAlert';

export const useSendInviteEmail = () => {
    const [isLoading, setIsLoading] = useState(false);
    const orgId = useRecoilValue(orgIdParamState);
    const {alert} = useAlert();

    async function sendEmail(email: string, teamMemberId?: number) {
        if (!orgId || isNaN(orgId) || !email.length) return;
        if (isLoading) return;

        setIsLoading(true);

        const req = inviteMembershipApi.create({organizationId: orgId, invitations: [{email, teamMemberId}]});

        req.catch((e) => alert.error('초대가 실패했습니다.', e));
        req.finally(() => setIsLoading(false));
        return req.then(() => {
            alert.success({title: '초대가 완료되었습니다.'});
        });
    }

    return {sendEmail};
};
