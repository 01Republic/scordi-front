import {useEffect, useState} from 'react';
import {UserDto} from '^types/user.type';
import {getUserSession} from '^api/sessionApi';

export function useCurrentUser() {
    const [currentUser, setCurrentUser] = useState<UserDto | null>(null);

    useEffect(() => {
        getUserSession().then((res) => setCurrentUser(res.data));
    }, []);

    return currentUser;
}
