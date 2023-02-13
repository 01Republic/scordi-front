import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {useForm} from 'react-hook-form';
import {TextInput} from '^components/TextInput';
import {postUser, postUserSession} from '^api/session.api';
import {UserSignUpRequestDto} from '^types/user.type';
import {setToken} from '^api/api';
import {errorNotify} from '^utils/toast-notify';
import {useCurrentUser} from '^hooks/useCurrentUser';
import {pathRoute} from '^types/pageRoute.type';
import {DefaultButton} from '^components/Button';
import {Modal} from '^components/Modal';
import {WelcomePageRoute} from '^pages/users/signup/welcome';
import Link from 'next/link';
import {toast} from 'react-toastify';
import {useRecoilState} from 'recoil';
import {currentUserAtom} from '^atoms/currentUser.atom';

export const UserSignUpPageRoute = pathRoute({
    pathname: '/users/signup',
    path: () => UserSignUpPageRoute.pathname,
});

const SignUp = () => {
    const router = useRouter();
    const [currentUser] = useRecoilState(currentUserAtom);
    const form = useForm<UserSignUpRequestDto>();
    const [modalOpen, setModalOpen] = useState(false);

    // redirect home page if user already login
    useEffect(() => {
        // redirectIfAlreadySignedIn(localStorage, router, currentUser);
    }, [currentUser]);

    const signUpComplete = (data: UserSignUpRequestDto) => {
        postUser(data)
            .then(() => {
                postUserSession({email: data.email, password: data.password})
                    .then((res) => {
                        setToken(res.data.token);
                        router.push(WelcomePageRoute.path());
                    })
                    .catch(errorNotify);
            })
            .catch(errorNotify);
    };

    const onNext = () => {
        if (
            !!form.watch('name') &&
            !!form.watch('phone') &&
            !!form.watch('email') &&
            form.watch('orgName') &&
            form.watch('password') === form.watch('passwordConfirmation')
        ) {
            setModalOpen(true);
        } else {
            toast.info('모든 정보를 정확하게 입력해 주세요');
        }
    };

    const onComplete = () => {
        if (form.watch('isAgreeForServiceUsageTerm') && form.watch('isAgreeForPrivacyPolicyTerm')) {
            setModalOpen(false);
            signUpComplete(form.getValues());
        } else {
            toast.info('모든 약관에 동의해 주세요');
        }
    };

    return (
        <>
            <Modal
                type={'info'}
                isOpen={modalOpen}
                title={'스코디 서비스 이용약관에 동의해주세요.'}
                children={
                    <>
                        <div className="flex items-center mt-4 mb-4 pb-4 border-b">
                            <input
                                id="all_check"
                                type="checkbox"
                                className="w-4 h-4 text-red-600 bg-gray-100 rounded border-0"
                                checked={
                                    form.watch('isAgreeForServiceUsageTerm') &&
                                    form.watch('isAgreeForPrivacyPolicyTerm')
                                }
                                onClick={() => {
                                    form.setValue('isAgreeForPrivacyPolicyTerm', true);
                                    form.setValue('isAgreeForServiceUsageTerm', true);
                                }}
                            />
                            <label
                                htmlFor="all_check"
                                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                전체 동의
                            </label>
                        </div>
                        <div className="flex items-center mb-4">
                            <input
                                id="terms_checkbox"
                                type="checkbox"
                                className="w-4 h-4 text-red-600 bg-gray-100 rounded border-0"
                                checked={form.watch('isAgreeForServiceUsageTerm')}
                                onClick={() =>
                                    form.setValue(
                                        'isAgreeForServiceUsageTerm',
                                        !form.watch('isAgreeForServiceUsageTerm'),
                                    )
                                }
                            />
                            <label
                                htmlFor="terms_checkbox"
                                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                [필수] 서비스 이용약관 동의
                                <a
                                    href={`${process.env.NEXT_PUBLIC_BASE_API}/terms/serviceUsageTerm-v20221101-1.txt`}
                                    target={'_blank'}
                                >
                                    <span className={'underline pl-2'}>보기</span>
                                </a>
                            </label>
                        </div>
                        <div className="flex items-center mb-4">
                            <input
                                id="privacy_checkbox"
                                type="checkbox"
                                className="w-4 h-4 text-red-600 bg-gray-100 rounded border-0"
                                checked={form.watch('isAgreeForPrivacyPolicyTerm')}
                                onClick={() =>
                                    form.setValue(
                                        'isAgreeForPrivacyPolicyTerm',
                                        !form.watch('isAgreeForPrivacyPolicyTerm'),
                                    )
                                }
                            />
                            <label
                                htmlFor="privacy_checkbox"
                                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                [필수] 개인정보 수집·이용 동의
                                <a
                                    href={`${process.env.NEXT_PUBLIC_BASE_API}/terms/개인정보처리방침-v20221101-1.html`}
                                    target={'_blank'}
                                >
                                    <span className={'underline pl-2'}>보기</span>
                                </a>
                            </label>
                        </div>
                    </>
                }
                buttons={[{text: '확인', onClick: onComplete}]}
            />
            <div className={'mx-auto my-20 w-full max-w-md space-y-5'}>
                <form onSubmit={form.handleSubmit(signUpComplete)} className={'space-y-4 p-4 m-auto'}>
                    <h1 className="text-3xl font-semibold">클로즈 베타 등록</h1>
                    <p className={'text-[#6D7684] text-base'}>
                        똑똑한 비용관리, 스코디에 오신것을 환영해요! <br />
                        클로즈 베타가 진행되는 동안 많은 관심과 피드백을 부탁드릴게요 :)
                    </p>
                    <TextInput
                        label={'이름'}
                        type={'text'}
                        required={true}
                        placeholder={'이름을 입력해주세요'}
                        {...form.register('name', {required: true})}
                    />
                    <TextInput
                        label={'전화번호'}
                        type={'number'}
                        required={true}
                        placeholder={'01012345678'}
                        {...form.register('phone', {required: true})}
                    />
                    <TextInput
                        label={'회사명'}
                        type={'text'}
                        required={true}
                        placeholder={'회사 이름을 입력해 주세요'}
                        {...form.register('orgName', {required: true})}
                    />
                    <TextInput
                        label={'회사 이메일 (아이디)'}
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
                    <TextInput
                        label={'비밀번호 확인'}
                        type={'password'}
                        required={true}
                        placeholder={'비밀번호를 입력해주세요'}
                        {...form.register('passwordConfirmation', {required: true})}
                    />
                    <div className={'pt-[1rem] space-y-4'}>
                        <DefaultButton text={'다음'} onClick={onNext} disabled={false} />
                    </div>
                </form>
            </div>
        </>
    );
};

export default SignUp;
