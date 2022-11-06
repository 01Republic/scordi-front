import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { TextInput } from '^components/TextInput';
import { postUser, postUserSession } from '^api/sessionApi';
import { UserSignUpRequestDto } from '^types/userTypes';
import Link from 'next/link';
import {
  redirectIfAlreadySignedIn,
  UserLoginPageRoute,
} from '^pages/users/login';
import { setToken } from '^api/api';
import { errorNotify } from '^utils/toast-notify';
import { useCurrentUser } from '^hooks/useCurrentUser';
import { PageRoute } from '^types/pageRoute.type';
import { NewMembershipPath } from '^pages/memberships/new';
import {DefaultButton} from "^components/Button";

export const UserSignUpPageRoute: PageRoute = {
  pathname: '/users/signup',
  path: () => UserSignUpPageRoute.pathname,
};

const SignUp = () => {
  const router = useRouter();
  const currentUser = useCurrentUser();
  const form = useForm<UserSignUpRequestDto | any>();

  // redirect home page if user already login
  useEffect(() => {
    redirectIfAlreadySignedIn(localStorage, router, currentUser);
  }, [currentUser]);

  const signUpComplete = (data: UserSignUpRequestDto) => {
    postUser(data)
      .then(() => {
        postUserSession({ email: data.email, password: data.password })
          .then((res) => {
            setToken(res.data.token);
            router.push(NewMembershipPath.path());
          })
          .catch(errorNotify);
      })
      .catch(errorNotify);
  };

  const onNext = () => {
  //  TODO: modal open
  }

  return (
    <>
      <div className={'mx-auto my-20 w-full max-w-md space-y-5'}>
        <form
          onSubmit={form.handleSubmit(signUpComplete)}
          className={'space-y-4 p-4 m-auto'}
        >
          <h1 className="text-3xl font-semibold">클로즈 베타 등록</h1>
            <p className={'text-[#6D7684] text-base'}>
                똑똑한 비용관리, 스코디에 오신것을 환영해요! <br/>
                클로즈 베타가 진행되는 동안 많은 관심과 피드백을
                부탁드릴게요 :)
            </p>
          <TextInput
            label={'이름'}
            type={'text'}
            required={true}
            placeholder={'이름을 입력해주세요'}
            {...form.register('name', { required: true })}
          />
          <TextInput
            label={'전화번호'}
            type={'number'}
            required={true}
            placeholder={'01012345678'}
            {...form.register('phone', { required: true })}
          />
          <TextInput
            label={'회사명'}
            type={'text'}
            required={true}
            placeholder={'회사 이름을 입력해 주세요'}
            {...form.register('company', { required: true })}
          />
          <TextInput
            label={'회사 이메일 (아이디)'}
            type={'email'}
            required={true}
            placeholder={'이메일을 입력해주세요'}
            {...form.register('email', { required: true })}
          />
          <TextInput
            label={'비밀번호'}
            type={'password'}
            required={true}
            placeholder={'비밀번호를 입력해주세요'}
            {...form.register('password', { required: true })}
          />
          <div className={'pt-[1rem] space-y-4'}>
            <DefaultButton text={'다음'} onClick={onNext} disabled={true}/>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
