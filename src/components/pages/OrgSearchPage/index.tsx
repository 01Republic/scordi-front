import React, {memo} from 'react';
import {useCurrentUser} from '^hooks/useCurrentUser';

export const OrgSearchPage = memo(() => {
    const {currentUser} = useCurrentUser();

    return <>hello</>;
});
