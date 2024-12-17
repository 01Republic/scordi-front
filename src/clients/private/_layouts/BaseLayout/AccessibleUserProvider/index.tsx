import {memo, useEffect} from 'react';
import {WithChildren} from '^types/global.type';
import {Error404Page} from '^clients/errors/Error404';
import {useCurrentOrg2} from '^models/Organization/hook';
import {useCurrentUser} from '^models/User/hook';
import {useCurrentMembership} from '^models/Membership/hook';
import {myMembershipApi} from '^models/Membership/api';
import {SessionLoadingPage} from './SessionLoadingPage';

interface AccessibleUserProviderProps extends WithChildren {}

export const AccessibleUserProvider = memo((props: AccessibleUserProviderProps) => {
    const {children} = props;
    const {currentOrg} = useCurrentOrg2();
    const {currentUser} = useCurrentUser();
    const {currentMembership, setCurrentMembership} = useCurrentMembership();

    useEffect(() => {
        if (currentOrg && currentUser) {
            const signedMembership = currentUser.findMembershipByOrgId(currentOrg.id);

            setCurrentMembership((membership) => {
                if (!signedMembership) return null;
                if (!membership) return signedMembership;
                if (membership.id === signedMembership.id) return membership;

                myMembershipApi.update(signedMembership.id, {lastSignedAt: new Date()});

                return signedMembership;
            });
        }
    }, [currentOrg, currentUser]);

    /**
     * Render
     */

    if (!currentOrg || !currentUser) {
        return <SessionLoadingPage />;
    }

    if (!currentMembership || !currentMembership.userId) {
        return <Error404Page />;
    }

    return <>{children}</>;
});
