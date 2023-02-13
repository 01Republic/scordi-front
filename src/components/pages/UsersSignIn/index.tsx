import React, {memo, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {useRecoilState} from 'recoil';
import {currentUserAtom} from '^atoms/currentUser.atom';
import {useForm} from 'react-hook-form';
import {UserLoginRequestDto} from '^types/user.type';
import {getToken, setToken} from '^api/api';
import {getUserSession, postUserSession} from '^api/session.api';
import {Modal} from '^components/Modal';
import {TextInput} from '^components/TextInput';
import {DefaultButton} from '^components/Button';
import {OrgHomeRoute} from '^pages/orgs/[id]/home';
import {UserSignUpPageRoute} from '^pages/users/signup';

export const UsersSignInPage = memo(() => {
    const router = useRouter();
    const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);
    const [userChecked, setUserChecked] = useState(false);
    const form = useForm<UserLoginRequestDto>();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // redirect home page if user already login
    useEffect(() => {
        const token = getToken();
        if (!!token) {
            getUserSession()
                .then((res) => setCurrentUser(res.data))
                .catch(() => setUserChecked(true));
        } else {
            setUserChecked(true);
        }
    }, []);

    useEffect(() => {
        if (currentUser?.orgId) {
            router.push(OrgHomeRoute.path(currentUser.orgId));
        }
    }, [currentUser]);

    const login = (data: UserLoginRequestDto) => {
        postUserSession(data)
            .then((res) => {
                setToken(res.data.token);
                getUserSession().then(({data}) => {
                    setCurrentUser(data);
                });
            })
            .catch(() => setIsModalOpen(true));
    };

    if (!userChecked) return null;
    return (
        <>
            <Modal
                type={'info'}
                isOpen={isModalOpen}
                title={'로그인 실패'}
                description={'아이디 또는 비밀번호가 일치하지 않습니다.'}
                buttons={[{text: '확인', onClick: () => setIsModalOpen(false)}]}
            />
            <div className={'mx-auto my-20 w-full max-w-md space-y-5'}>
                <form onSubmit={form.handleSubmit(login)} className={'space-y-4 p-4 m-auto'}>
                    <h1 className="text-4xl font-semibold">로그인</h1>
                    <TextInput
                        label={'이메일'}
                        type={'email'}
                        required={true}
                        placeholder={'이메일을 입력해주세요'}
                        {...form.register('email', {required: true})}
                    />
                    <TextInput
                        label={'비밀번호'}
                        type={'password'}
                        required={true}
                        placeholder={'비밀번호를 입력해주세요'}
                        {...form.register('password', {required: true})}
                    />
                    <div className={'pt-[1rem] space-y-4'}>
                        <DefaultButton
                            type={'submit'}
                            text={'로그인'}
                            onClick={() => null}
                            disabled={!form.watch('email') || !form.watch('password')}
                        />
                        <DefaultButton text={'회원가입'} onClick={() => router.push(UserSignUpPageRoute.path())} />
                        {/*<Link href={"/users/signup"}>*/}
                        {/*    <button className="btn btn-outline btn-primary btn-block" type={'button'}>회원가입</button>*/}
                        {/*</Link>*/}
                    </div>
                    {/*<Link href={"/users/password/find"}>*/}
                    {/*    <p className="text-right text-sm text-gray-400 cursor-pointer">*/}
                    {/*        비밀번호 찾기*/}
                    {/*    </p>*/}
                    {/*</Link>*/}
                </form>
            </div>
        </>
    );
});
