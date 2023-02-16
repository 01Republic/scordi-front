import React, {memo, useState} from 'react';
import {useRouter} from 'next/router';
import {toast} from 'react-toastify';
import {useForm} from 'react-hook-form';
import {TextInput} from '^components/TextInput';
import {postUser} from '^api/session.api';
import {UserSignUpRequestDto} from '^types/user.type';
import {errorNotify} from '^utils/toast-notify';
import {DefaultButton} from '^components/Button';
import {Modal} from '^components/Modal';
import {WelcomePageRoute} from '^pages/users/signup/welcome';
import {useCurrentUser} from '^hooks/useCurrentUser';

export const UserSignUpPage = memo(() => {
    const router = useRouter();
    const {currentUser, login, loginRedirect, authenticatedUserData} = useCurrentUser(null);
    const form = useForm<UserSignUpRequestDto>();
    const [modalOpen, setModalOpen] = useState(false);
    const [isCodeInput, setIsCodeInput] = useState(false);

    if (currentUser) loginRedirect(currentUser);

    const submit = (data: UserSignUpRequestDto) => {
        postUser(data)
            .then(() => {
                login({email: data.email, password: data.password})
                    .then(() => router.push(WelcomePageRoute.path()))
                    .catch(errorNotify);
            })
            .catch(errorNotify);
    };

    const onNext = () => {
        if (!!form.watch('name') && !!form.watch('phone') && !!form.watch('email')) {
            setModalOpen(true);
        } else {
            toast.info('모든 정보를 정확하게 입력해 주세요');
        }
    };

    const onComplete = () => {
        if (form.watch('isAgreeForServiceUsageTerm') && form.watch('isAgreeForPrivacyPolicyTerm')) {
            setModalOpen(false);
            submit(form.getValues());
        } else {
            toast.info('모든 약관에 동의해 주세요');
        }
    };

    const onShow = () => {
        setIsCodeInput(true);
    };

    console.log('⭐️⭐️⭐️', authenticatedUserData);

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
            <div className={'mx-auto py-20 w-full max-w-md space-y-5'} style={{height: '125vh'}}>
                <form onSubmit={form.handleSubmit(submit)} className={'p-4 m-auto'}>
                    <h1 className="text-7xl  mb-8 font-bold">Additional Information</h1>
                    <h5 className="text-2xl  mb-24">
                        Welcome to Scordi !<br />
                        Tell us about U :)
                    </h5>

                    <TextInput
                        label={'Name'}
                        type={'text'}
                        defaultValue={authenticatedUserData && authenticatedUserData.name}
                        required={true}
                        placeholder={'Enter Your Name'}
                        {...form.register('name', {required: true})}
                    />

                    <TextInput
                        label={'Phone Number'}
                        type={'number'}
                        required={true}
                        placeholder={'Enter Your Phone Number'}
                        {...form.register('phone', {required: true})}
                    />

                    <div className={'pt-[1rem] space-y-4 mb-16'}>
                        <DefaultButton
                            text={isCodeInput ? 'Resend' : 'Enter the Code'}
                            onClick={onShow}
                            disabled={false}
                        />
                    </div>

                    <div>
                        <TextInput
                            label={'Authentication Code'}
                            type={'password'}
                            required={true}
                            placeholder={'Enter the Authentication number'}
                            {...form.register('passwordConfirmation', {required: true})}
                        />
                        <div className={'pt-[1rem] space-y-4'}>
                            <DefaultButton text={'Next'} onClick={onNext} disabled={false} />
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
});
