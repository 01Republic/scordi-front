import React, {memo} from 'react';
import axios from 'axios';
import {useRouter} from 'next/router';
import {useGoogleLogin} from '@react-oauth/google';
import {useCurrentUser} from '^hooks/useCurrentUser';
import {GoogleSignedUserData} from '^atoms/currentUser.atom';
import {UserSignUpPageRoute} from '^pages/users/signup';

export const GoogleLoginBtn = memo(() => {
    const router = useRouter();
    const {setAuthenticatedUserData} = useCurrentUser(null);

    const loginButtonOnClick = useGoogleLogin({
        onSuccess: (response) => {
            axios
                .get<GoogleSignedUserData>(
                    `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${response.access_token}`,
                    {
                        headers: {
                            Authorization: `Bearer ${response.access_token}`,
                            Accept: 'application/json',
                        },
                    },
                )
                .then((res) => {
                    setAuthenticatedUserData(res.data);
                    router.push(UserSignUpPageRoute.path());
                })
                .catch((err) => console.log(err));
        },
        onError: (error) => {
            console.log(error);
        },
    });

    return (
        <button
            onClick={() => loginButtonOnClick()}
            className="btn btn-block btn-lg btn-outline shadow font-medium normal-case mb-3 space-x-4 bg-white border-slate-200 text-slate-700 hover:bg-white hover:border-primary hover:text-slate-700 focus:bg-blue-50 active:bg-primary-100"
        >
            <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-6 h-6" alt="" />
            <span>Continue with Google</span>
        </button>
    );
});
