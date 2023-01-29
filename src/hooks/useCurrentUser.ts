import {useEffect} from 'react';
import {getUserSession} from '^api/session.api';
import {useRecoilState} from 'recoil';
import {currentUserAtom} from '^atoms/currentUser.atom';

export function useCurrentUser() {
    const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);

    useEffect(() => {
        getUserSession().then((res) => setCurrentUser(res.data));
    }, []);

    return currentUser;
}
