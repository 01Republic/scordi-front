import {useEffect} from 'react';
import {useRecoilValue} from 'recoil';
import {stepByKey} from '^config/environments';
import {StepBy} from './StepBy.interface';
// import {currentOrgAtom} from '^models/Organization/atom';
import {currentUserAtom} from '^models/User/atom';

export const StepByInstall = () => {
    // const currentOrg = useRecoilValue(currentOrgAtom);
    const currentUser = useRecoilValue(currentUserAtom);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        // @ts-ignore
        const StepBy = window?.StepBy as StepBy | undefined;

        if (!stepByKey || !StepBy) return;

        StepBy.init(stepByKey);
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        // @ts-ignore
        const StepBy = window?.StepBy as StepBy | undefined;

        if (!stepByKey || !StepBy) return;
        if (!currentUser?.id) return;

        const userInfo = {
            id: currentUser.id.toString(),
            created_at: currentUser.createdAt.toISOString(),
        };
        StepBy.setUserProperties(userInfo);
    }, [currentUser?.id]);

    return <></>;
};
