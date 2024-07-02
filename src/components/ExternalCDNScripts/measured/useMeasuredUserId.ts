import {useRecoilValue} from 'recoil';
import {currentUserAtom} from '^models/User/atom';
import {useEffect} from 'react';
import {measure} from '@measured-im/browser';
import {padStart} from 'lodash';

export const useMeasuredUserId = () => {
    const currentUser = useRecoilValue(currentUserAtom);

    useEffect(() => {
        if (currentUser) {
            const measuredUserId = padStart(`${currentUser.id}`, 5, '0');
            measure('User ID', measuredUserId);
            measure('UserName', currentUser.name);
        }
    }, [currentUser]);
};
