import React, {memo, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {useForm} from 'react-hook-form';
import {UserDto, UserLoginRequestDto} from '^types/user.type';
import {Modal} from '^components/Modal';
import {TextInput} from '^components/TextInput';
import {DefaultButton} from '^components/Button';
import {OrgHomeRoute} from '^pages/orgs/[id]/home';
import {UserSignUpPageRoute} from '^pages/users/signup';
import Link from 'next/link';
import {useCurrentUser} from '^hooks/useCurrentUser';
import {OrgSearchRoute} from '^pages/orgs/search';

export const UsersSignInPage = memo(() => {
    const router = useRouter();
    const {login, currentUser} = useCurrentUser(null);
    const form = useForm<UserLoginRequestDto>();
    const [isModalOpen, setIsModalOpen] = useState(false);

    function loginRedirect(user: UserDto) {
        // org check
        // org ? 대시보드로 이동
        // : search페이지로 이동
        if (user.orgId) {
            router.push(OrgHomeRoute.path(user.orgId));
        } else {
            router.push(OrgSearchRoute.path());
        }
    }

    if (currentUser) loginRedirect(currentUser);

    const submit = (data: UserLoginRequestDto) => {
        login(data)
            .then((user) => loginRedirect(user))
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
                <form onSubmit={form.handleSubmit(submit)} className={'space-y-4 p-4 m-auto'}>
                    <h1 className="text-4xl font-semibold">Sign in</h1>
                    <TextInput
                        label={'Email'}
                        type={'email'}
                        required={true}
                        placeholder={'Please enter your email.'}
                        {...form.register('email', {required: true})}
                    />
                    <TextInput
                        label={'Password'}
                        type={'password'}
                        required={true}
                        placeholder={'Please enter your password.'}
                        {...form.register('password', {required: true})}
                    />
                    <div className={'pt-[1rem] space-y-4'}>
                        <DefaultButton
                            type={'submit'}
                            text={'Start'}
                            onClick={() => null}
                            disabled={!form.watch('email') || !form.watch('password')}
                        />
                    </div>
                    <Link href={UserSignUpPageRoute.path()}>
                        <p className="text-right text-sm text-gray-400 cursor-pointer">Create new account</p>
                    </Link>
                    {/*<Link href={UserSignUpPageRoute.path()}>*/}
                    {/*    <p className="text-right text-sm text-gray-400 cursor-pointer">비밀번호 찾기</p>*/}
                    {/*</Link>*/}
                </form>
            </div>
        </>
    );
});
