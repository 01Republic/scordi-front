import React, {memo, useState} from 'react';
import {GoogleOAuthProvider} from '@react-oauth/google';
import {useForm} from 'react-hook-form';
import {UserLoginRequestDto} from '^types/user.type';
import {useCurrentUser} from '^hooks/useCurrentUser';
import {Modal} from '^components/Modal';
import {GoogleLoginButton} from './GoogleLoginButton';

export const UsersLoginPage = memo(() => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {login, currentUser, loginRedirect} = useCurrentUser();

    if (currentUser) loginRedirect(currentUser);

    // const submit = (data: UserLoginRequestDto) => {
    //     login(data)
    //         .then((user) => loginRedirect(user))
    //         .catch(() => setIsModalOpen(true));
    // };

    const googleOauthClientId = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID!;

    return (
        <>
            <GoogleOAuthProvider clientId={googleOauthClientId}>
                <Modal
                    type={'info'}
                    isOpen={isModalOpen}
                    title={'Login failed'}
                    description={'Create a Google Account'}
                    buttons={[{text: 'Try again', onClick: () => setIsModalOpen(false)}]}
                />
                <div className={'mx-auto py-20 w-full max-w-md space-y-5'} style={{height: '100vh'}}>
                    {/*<form onSubmit={form.handleSubmit(submit)}>*/}
                    <div className="p-4 m-auto">
                        <h1 className="text-7xl  mb-8 font-bold">Login</h1>
                        <h5 className="text-4xl  mb-32">You can join us with Google account ! </h5>
                        <div>
                            <GoogleLoginButton />
                        </div>
                    </div>
                    {/*</form>*/}
                </div>
            </GoogleOAuthProvider>
        </>
    );
});
