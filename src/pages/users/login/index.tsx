import React, { useEffect, useState } from "react";
import {useForm} from "react-hook-form";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import {TextInput} from "^components/TextInput";
import {Modal} from "^components/Modal";
import { getUserSession, postUserSession } from '^api/sessionApi';
import { UserDto, UserLoginRequestDto } from '^types/user.type';
import { getToken, setToken } from "^api/api";
import { useCurrentUser } from '^hooks/useCurrentUser';
import { PageRoute } from '^types/pageRoute.type';
import { OrgHomeRoute } from '^pages/orgs/[id]/home';
import { NewMembershipPath } from '^pages/memberships/new';
import {DefaultButton} from "^components/Button";

// NOTE: PATH 들은 인라인 문자열로 중복 작성하지 않고 한 곳에서 정의하고 유지했우면 하는데 묘수가 없을까.
export const UserLoginPageRoute: PageRoute = {
  pathname: '/users/login',
  path: () => UserLoginPageRoute.pathname,
}

// TODO: 리디렉션들은 서버 실행 함수들을 통해서 실행해야 한다.
//  안그러면 페이지 로딩 실행 한 번 하고 리디렉션 되어서 사용자 눈에 페이지 거쳐가는게 다 보이네요,,,
export const redirectIfAlreadySignedIn = (storage: Storage, router: NextRouter, user: UserDto | null) => {
  if (user) {
    const orgId = user.orgId;
    orgId
      ? router.push(OrgHomeRoute.path(orgId))
      : router.push(NewMembershipPath.path());
  }
}

export const redirectLoginPageIfNotSignedIn = (storage: Storage, router: NextRouter) => {
  if (!getToken()) {
    router.push(UserLoginPageRoute.path());
  }
}

const LoginPage = () => {
    const router = useRouter();
    const currentUser = useCurrentUser();
    const form = useForm<UserLoginRequestDto>();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // redirect home page if user already login
    useEffect(() => {
      console.log(currentUser);
      setTimeout(() => {
        redirectIfAlreadySignedIn(localStorage, router, currentUser);
      }, 2000);
    }, [currentUser]);

    const login = (data: UserLoginRequestDto) => {
        postUserSession(data)
            .then(res => {
                setToken(res.data.token);
                getUserSession().then(({ data }) => {
                  redirectIfAlreadySignedIn(localStorage, router, data);
                });
            })
            .catch(() => setIsModalOpen(true))
    }

    return (
        <>
            <Modal type={'info'} isOpen={isModalOpen}
                   title={'로그인 실패'}
                   description={'아이디 또는 비밀번호가 일치하지 않습니다.'}
                   buttons={[
                     {text: '확인', onClick: () => setIsModalOpen(false)},
                   ]}
            />
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
                    <div className={"pt-[1rem] space-y-4"}>
                        <DefaultButton type={'submit'} text={'로그인'}
                                       onClick={() => null}
                                       disabled={!form.watch('email') && !form.watch('password')}
                        />
                        {/*<Link href={"/users/signup"}>*/}
                        {/*    <button className="btn btn-outline btn-primary btn-block" type={'button'}>회원가입</button>*/}
                        {/*</Link>*/}
                    </div>
                    <Link href={"/users/password/find"}>
                        <p className="text-right text-sm text-gray-400 cursor-pointer">
                            비밀번호 찾기
                        </p>
                    </Link>
                </form>
            </div>
        </>
    );
};

export default LoginPage;
