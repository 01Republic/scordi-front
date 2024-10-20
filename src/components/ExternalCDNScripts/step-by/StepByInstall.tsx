import {useEffect} from 'react';
import {useRecoilValue} from 'recoil';
import {stepByKey} from '^config/environments';
import {StepBy} from './StepBy.interface';
// import {currentOrgAtom} from '^models/Organization/atom';
import {currentUserAtom} from '^models/User/atom';

export const StepByInstall = () => {
    // const currentOrg = useRecoilValue(currentOrgAtom);
    const currentUser = useRecoilValue(currentUserAtom);

    // @ts-ignore
    const StepBy = window?.StepBy as StepBy | undefined;

    useEffect(() => {
        if (!stepByKey || !StepBy) return;

        console.log('StepBy.init()\t', stepByKey);
        StepBy.init(stepByKey);
    }, [StepBy]);

    useEffect(() => {
        if (!stepByKey || !StepBy) return;
        if (!currentUser?.id) return;

        const userInfo = {
            id: currentUser.id.toString(),
            created_at: currentUser.createdAt.toISOString(),
        };
        console.log('StepBy.setUserProperties()', userInfo);
        StepBy.setUserProperties(userInfo);
    }, [StepBy, currentUser?.id]);

    return <></>;
};
