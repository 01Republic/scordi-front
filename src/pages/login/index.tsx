import React, { useEffect, useState } from "react";
import {useForm} from "react-hook-form";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import {NavBar} from "^components/NavBar";
import {TextInput} from "^components/TextInput";
import {Modal} from "^components/Modal";
import {postUserSession} from "^api/sessionApi";
import {UserLoginRequestDto} from "^types/userTypes";
import { getToken, setToken } from "^api/api";

const AFTER_LOGIN_REDIRECT_PATH = '/home';

const redirectIfAlreadySignedIn = (storage: Storage, router: NextRouter) => {
  if (getToken()) {
    router.push(AFTER_LOGIN_REDIRECT_PATH);
  }
}

export const redirectLoginPageIfNotSignedIn = (storage: Storage, router: NextRouter) => {
  if (!getToken()) {
    router.push('/login');
  }
}

const LoginPage = () => {
    const router = useRouter();
    const form = useForm<UserLoginRequestDto>();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // redirect home page if user already login
    useEffect(() => {
      redirectIfAlreadySignedIn(localStorage, router);
    }, []);

    const login = (data: UserLoginRequestDto) => {
        postUserSession(data)
            .then(res => {
                setToken(res.data.token);
                router.push(AFTER_LOGIN_REDIRECT_PATH);
            })
            .catch(() => setIsModalOpen(true))
    }

    return (
        <>
            <Modal type={'info'} isOpen={isModalOpen}
                   title={'로그인 실패'}
                   description={'아이디 또는 비밀번호가 일치하지 않습니다.'}
                   button1={{text: '확인', onClick: () => setIsModalOpen(false)}}
            />
            <NavBar/>
            <div className={"mx-auto my-20 w-full max-w-md space-y-5"}>
                <form onSubmit={form.handleSubmit(login)} className={"space-y-4 p-4 m-auto"}>
                    <h1 className="text-4xl font-semibold">로그인</h1>
                    <TextInput label={"이메일"}
                               type={'email'}
                               required={true}
                               placeholder={"이메일을 입력해주세요"}
                               {...form.register('email', {required: true})}
                    />
                    <TextInput label={"비밀번호"}
                               type={'password'}
                               required={true}
                               placeholder={"비밀번호를 입력해주세요"}
                               {...form.register('password', {required: true})}
                    />
                    <Link href={"/password/find"}>
                        <p className="text-right text-sm text-gray-600 cursor-pointer">
                            비밀번호 찾기
                        </p>
                    </Link>
                    <div className={"pt-[1rem] space-y-4"}>
                        <button className="btn btn-primary btn-block" type={'submit'}>로그인</button>
                        <Link href={"/signup"}>
                            <button className="btn btn-outline btn-primary btn-block" type={'button'}>회원가입</button>
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
};

export default LoginPage;
