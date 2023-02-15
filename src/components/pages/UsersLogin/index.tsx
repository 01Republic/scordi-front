import React, {memo, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {useForm} from 'react-hook-form';
import {UserLoginRequestDto} from '^types/user.type';
import {Modal} from '^components/Modal';
import {OrgHomeRoute} from '^pages/orgs/[id]/home';
import {useCurrentUser} from '^hooks/useCurrentUser';

export const UsersLoginPage = memo(() => {
    const router = useRouter();
    const {currentUser, setCurrentUser, login} = useCurrentUser();
    const form = useForm<UserLoginRequestDto>();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (currentUser?.orgId) {
            router.push(OrgHomeRoute.path(currentUser.orgId));
        }
    }, [currentUser]);

    const submit = (data: UserLoginRequestDto) => {
        login(data)
            .then((user) => router.push(OrgHomeRoute.path(user.orgId)))
            .catch(() => setIsModalOpen(true));
    };

    return (
        <>
            <Modal
                type={'info'}
                isOpen={isModalOpen}
                title={'Login failed'}
                description={'The email or password is not correct.'}
                buttons={[{text: 'Try again', onClick: () => setIsModalOpen(false)}]}
            />
            <div className={'mx-auto py-20 w-full max-w-md space-y-5'} style={{height: '100vh'}}>
                <form onSubmit={form.handleSubmit(submit)} className={' p-4 m-auto'}>
                    <h1 className="text-7xl  mb-8 font-bold">Login</h1>
                    <h5 className="text-4xl  mb-32">You can join us with Google account ! </h5>
                    <div>
                        <button className="w-full text-center py-3 my-3 border-2 flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-primary focus:bg-blue-50 active:bg-primary-100 transition duration-300 ">
                            <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-6 h-6" alt="" />
                            <span>Continue with Google</span>
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
});
