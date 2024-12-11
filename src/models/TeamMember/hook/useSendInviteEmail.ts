import {useState} from 'react';
import {useRecoilValue} from 'recoil';
import {inviteMembershipApi} from '^models/Membership/api';
import {orgIdParamState} from '^atoms/common';
import {toast} from 'react-hot-toast';

export const useSendInviteEmail = () => {
    const [isLoading, setIsLoading] = useState(false);
    const orgId = useRecoilValue(orgIdParamState);

    async function sendEmail(email: string, teamMemberId?: number) {
        if (!orgId || isNaN(orgId) || !email.length) return;
        if (isLoading) return;

        setIsLoading(true);
        return inviteMembershipApi
            .create({organizationId: orgId, invitations: [{email, teamMemberId}]})
            .then(() => toast.success('구성원에게 초대 메일을 보냈어요.'))
            .catch((e) => {
                toast.error('구성원에게 초대 메일을 발송하지 못했어요.');
                console.warn(e);
            })
            .finally(() => setIsLoading(false));
    }

    return {sendEmail};
};
