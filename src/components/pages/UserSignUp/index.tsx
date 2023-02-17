import React, {memo, useRef, useState} from 'react';
import axios from 'axios';
import {useRouter} from 'next/router';
import {WelcomePageRoute} from '^pages/users/signup/welcome';
import {toast} from 'react-toastify';
import {useForm} from 'react-hook-form';
import {TextInput} from '^components/TextInput';
import {postUser} from '^api/session.api';
import {SendPhoneAuthMessageDto, UserSignUpRequestDto} from '^types/user.type';
import {errorNotify} from '^utils/toast-notify';
import {DefaultButton} from '^components/Button';
import {Modal} from '^components/Modal';
import {useCurrentUser} from '^hooks/useCurrentUser';
import {patchPhoneAuthSession, postPhoneAuthSession} from '^api/authlization';

export const UserSignUpPage = memo(() => {
    const router = useRouter();
    const {currentUser, login, loginRedirect, authenticatedUserData} = useCurrentUser(null);
    const form = useForm<UserSignUpRequestDto>();
    const [modalOpen, setModalOpen] = useState(false);
    const [isCodeShow, setIsCodeShow] = useState(false);
    const [isSendBtn, setIsSendBtn] = useState(true);
    const [isNextBtn, setIsNextBtn] = useState(true);
    // const [seconds, setSeconds] = useState(5);
    const [minutes, setMinutes] = useState(5);
    const [seconds, setSeconds] = useState(0);
    const timer = useRef();

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

    const onCheckProfileLength = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (form.watch('name').length > 2 && form.watch('phone').length > 9) {
            setIsSendBtn(false);
        } else if (form.watch('name').length < 2 || form.watch('phone').length < 9) {
            setIsSendBtn(true);
        }
    };

    const onCheckCodeLength = () => {
        if (form.watch('code').length > 4) {
            setIsNextBtn(false);
        } else if (form.watch('code').length <= 4) {
            setIsNextBtn(true);
        }
    };

    const onSend = (data: SendPhoneAuthMessageDto) => {
        if (!!form.watch('name') && !!form.watch('phone')) {
            setIsCodeShow(true);
        }

        postPhoneAuthSession(data).then((res) => console.log('🥰', res));

        // timer.current = setInterval(() => {
        //     let s = seconds;
        //     let m = minutes;
        //     if (s > 0) {
        //         setSeconds(--s);
        //     }

        //     if (s === 0) {
        //         if (m === 0) {
        //             clearInterval(timer.current);
        //         } else {
        //             setMinutes(--m);
        //             setSeconds(59);
        //             s = 59;
        //         }
        //     }
        // }, 1000);
    };

    const onNext = (data: SendPhoneAuthMessageDto) => {
        //TODO : 인증번호 확인 완료되면 페이지 넘기기
        patchPhoneAuthSession(data).then((res) => {
            console.log('🥶', res);

            if (res.status === 200) {
                router.push(WelcomePageRoute.path());
            }
        });
    };

    const onComplete = () => {
        if (form.watch('isAgreeForServiceUsageTerm') && form.watch('isAgreeForPrivacyPolicyTerm')) {
            setModalOpen(true);
            submit(form.getValues());
        } else {
            toast.info('모든 약관에 동의해 주세요');
        }
    };

    return (
        <div className="bg-white">
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
            <div className={'mx-auto py-20 w-full max-w-md space-y-5'} style={{minHeight: '100vh'}}>
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
                        onInput={onCheckProfileLength}
                        autoComplete={'off'}
                    />
                    <div className="flex">
                        <TextInput
                            label={'Phone Number'}
                            type={'number'}
                            required={true}
                            placeholder={'Enter Your Phone Number'}
                            maxLength={11}
                            {...form.register('phone', {required: true})}
                            onInput={onCheckProfileLength}
                            autoComplete={'off'}
                        />

                        <div className={'pt-[1rem] space-y-4 mb-16 ml-2.5 mt-5'}>
                            <DefaultButton
                                text={isCodeShow ? 'Resend' : 'Send'}
                                onClick={() => onSend({phoneNumber: form.getValues('phone')})}
                                disabled={isSendBtn}
                            />
                        </div>
                    </div>

                    <div className={isCodeShow ? 'opacity-100  ease-in duration-300' : ' opacity-0'}>
                        <div>
                            <div className="flex">
                                <TextInput
                                    label={'Authentication Code'}
                                    type={'number'}
                                    required={true}
                                    placeholder={'Code'}
                                    maxLength={6}
                                    {...form.register('code', {required: true})}
                                    onInput={onCheckCodeLength}
                                />
                                <div className={'pt-[1rem] w-20 mb-16 ml-3 mt-8 font-bold text-[red]'}>
                                    {minutes} : {('0' + seconds).slice(-2)}
                                </div>
                            </div>
                            <div className={'pt-[1rem] space-y-4'}>
                                <DefaultButton
                                    text={'Next'}
                                    disabled={isNextBtn}
                                    onClick={() =>
                                        onNext({
                                            phoneNumber: form.getValues('phone'),
                                            code: form.getValues('code'),
                                        })
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
});
