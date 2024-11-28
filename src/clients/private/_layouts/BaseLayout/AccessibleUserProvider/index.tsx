import {memo, useEffect} from 'react';
import {WithChildren} from '^types/global.type';
import {Error404Page} from '^clients/errors/Error404';
import {useCurrentOrg2} from '^models/Organization/hook';
import {useCurrentUser} from '^models/User/hook';
import {useCurrentMembership} from '^models/Membership/hook';
import {SessionLoadingPage} from './SessionLoadingPage';

interface AccessibleUserProviderProps extends WithChildren {}

export const AccessibleUserProvider = memo((props: AccessibleUserProviderProps) => {
    const {children} = props;
    const {currentOrg} = useCurrentOrg2();
    const {currentUser} = useCurrentUser();
    const {currentMembership, setCurrentMembership} = useCurrentMembership();

    useEffect(() => {
        if (currentOrg && currentUser) {
            setCurrentMembership(currentUser.findMembershipByOrgId(currentOrg.id) || null);
        }
    }, [currentOrg, currentUser]);

    if (!currentOrg || !currentUser) {
        return <SessionLoadingPage />;
    }

    if (!currentMembership || !currentMembership.userId) {
        return <Error404Page />;
    }

    return <>{children}</>;
});
