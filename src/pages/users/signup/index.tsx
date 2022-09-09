import React, { useEffect } from 'react';
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { TextInput } from "^components/TextInput";
import { postUser, postUserSession } from '^api/sessionApi';
import { UserSignUpRequestDto } from "^types/userTypes";
import Link from 'next/link';
import { redirectIfAlreadySignedIn, UserLoginPageRoute } from '^pages/users/login';
import { setToken } from '^api/api';
import { errorNotify } from '^utils/toast-notify';
import { useCurrentUser } from '^hooks/useCurrentUser';
import { PageRoute } from '^types/pageRoute.type';
import { NewMembershipPath } from '^pages/memberships/new';

export const UserSignUpPageRoute: PageRoute = {
  pathname: '/users/signup',
  path: () => UserSignUpPageRoute.pathname,
}

const SignUp = () => {
  const router = useRouter();
  const currentUser = useCurrentUser();
  const form = useForm<UserSignUpRequestDto>();

  // redirect home page if user already login
  useEffect(() => {
    redirectIfAlreadySignedIn(localStorage, router, currentUser);
  }, [currentUser]);

  const signUpComplete = (data: UserSignUpRequestDto) => {
    postUser(data)
      .then(() => {
        postUserSession({ email: data.email, password: data.password })
          .then(res => {
            setToken(res.data.token);
            router.push(NewMembershipPath.path());
          })
          .catch(errorNotify);
      })
      .catch(errorNotify);
  };

  return (
    <>
      <div className={"mx-auto my-20 w-full max-w-md space-y-5"}>
        <form
          onSubmit={form.handleSubmit(signUpComplete)}
          className={"space-y-4 p-4 m-auto"}
        >
          <h1 className="text-4xl font-semibold">새 계정 만들기</h1>
          <TextInput
            label={"이름"}
            type={"text"}
            required={true}
            placeholder={"이름을 입력해주세요"}
            {...form.register("name", { required: true })}
          />
          <TextInput
            label={"이메일"}
            type={"email"}
            required={true}
            placeholder={"이메일을 입력해주세요"}
            {...form.register("email", { required: true })}
          />
          <TextInput
            label={"비밀번호"}
            type={"password"}
            required={true}
            placeholder={"비밀번호를 입력해주세요"}
            {...form.register("password", { required: true })}
          />
          <div className={"pt-[1rem] space-y-4"}>
            <button className="btn btn-primary btn-block" type={"submit"}>만들기</button>
          </div>
          <Link href={UserLoginPageRoute.path()}>
            <button className="text-sm text-center w-full" type={'button'}>돌아가기</button>
          </Link>
        </form>
      </div>
    </>
  );
};

export default SignUp;
