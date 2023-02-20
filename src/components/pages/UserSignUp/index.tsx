import React, {memo, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {WelcomePageRoute} from '^pages/users/signup/welcome';
import {toast} from 'react-toastify';
import {useForm} from 'react-hook-form';
import {TextInput} from '^components/TextInput';
import {postUser} from '^api/session.api';
import {SendPhoneAuthMessageDto, UserSocialSignUpRequestDto} from '^types/user.type';
import {errorNotify} from '^utils/toast-notify';
import {DefaultButton} from '^components/Button';
import {Modal} from '^components/Modal';
import {useCurrentUser} from '^hooks/useCurrentUser';
import {patchPhoneAuthSession, postPhoneAuthSession} from '^api/authlization';

/**
 * 추가 정보 입력 페이지 (회원가입)
 *
 * 1. 이름과 전화번호를 입력하고 인증 버튼 클릭
 * 2. 인증번호 입력 창이 추가적으로 출현
 * 3. 인증번호 입력 후 인증번호 확인
 * 4. 인증번호가 확인 되면 약관 모달 출현
 * 5. 약관 모달의 약관이 모두 확인되면 모달 내 확인버튼을 클릭해 최종적으로 회원 가입 처리
 *      - 폼은 정보를 모으는 용도로만 쓴다.
 *      - submit 은 form 태그의 onSubmit 에서 실행하지 않는다.
 *      - submit 은 모달 내 확인버튼의 onClick 에서 실행한다.
 */
export const UserSignUpPage = memo(() => {
    const router = useRouter();
    const {currentUser, socialLogin, loginRedirect, authenticatedUserData} = useCurrentUser(null);
    const form = useForm<UserSocialSignUpRequestDto>();
    const [modalOpen, setModalOpen] = useState(false);
    const [authCode, setAuthCode] = useState('');
    const [isCodeShow, setIsCodeShow] = useState(false);
    const [isSendBtn, setIsSendBtn] = useState(true);
    const [isNextBtn, setIsNextBtn] = useState(true);

    if (currentUser) loginRedirect(currentUser);

    // 회원가입 & 리디렉션
    const submit = (data: UserSocialSignUpRequestDto) => {
        postUser(data)
            .then(() => {
                socialLogin({provider: data.provider, uid: data.uid})
                    .then(() => router.push(WelcomePageRoute.path()))
                    .catch(errorNotify);
            })
            .catch(errorNotify);
    };

    const onCheckProfileLength = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (form.watch('name').length > 2 && form.watch('phone').length >= 10) {
            setIsSendBtn(false);
        } else if (form.watch('name').length < 2 || form.watch('phone').length <= 10) {
            setIsSendBtn(true);
        }
    };

    const onCheckCodeLength = (code: string) => {
        if (code.length > 4) {
            setIsNextBtn(false);
        } else if (code.length <= 4) {
            setIsNextBtn(true);
        }
        setAuthCode(code);
    };

    // 인증번호 발급
    const onSend = (data: SendPhoneAuthMessageDto) => {
        if (!!form.watch('name') && !!form.watch('phone')) {
            setIsCodeShow(true);
        }

        postPhoneAuthSession(data).then((res) => console.log('🥰', res));
    };

    // 인증번호 확인
    const onNext = (data: SendPhoneAuthMessageDto) => {
        //TODO : 인증번호 확인 완료되면 페이지 넘기기
        patchPhoneAuthSession(data).then((res) => {
            console.log('🥶', res);

            if (res.status === 200) {
                // 인증번호 완료되면 페이지 넘기는게 아니라 약관 동의받고 회원가입 처리 해야 됨.
                // 즉, 여기서는 약관 모달 출현시킴.
                setModalOpen(true);
            }
        });
    };

    // 약관 동의 모달 완료
    const modalConfirmButtonClick = () => {
        if (!authenticatedUserData) {
            toast.info('구글 로그인 세션이 만료되었습니다. 다시 진행해주세요.');
            return;
        }

        if (form.watch('isAgreeForServiceUsageTerm') && form.watch('isAgreeForPrivacyPolicyTerm')) {
            form.setValue('provider', 'google');
            form.setValue('uid', authenticatedUserData.id);
            form.setValue('profileImageUrl', authenticatedUserData.picture);
            form.setValue('email', authenticatedUserData.email);
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
                buttons={[{text: '확인', onClick: modalConfirmButtonClick}]}
            />
            <div className={'mx-auto py-20 w-full max-w-md space-y-5'} style={{minHeight: '100vh'}}>
                <form className={'p-4 m-auto'}>
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
                                    onInput={(e) => {
                                        onCheckCodeLength(e.currentTarget.value);
                                    }}
                                />
                                {/*{...form.register('code', {required: true})}*/}
                                <div className={'pt-[1rem] w-20 mb-16 ml-3 mt-8 font-bold text-[red]'}>
                                    {isCodeShow && <Timer />}
                                </div>
                            </div>
                            <div className={'pt-[1rem] space-y-4'}>
                                <DefaultButton
                                    text={'Next'}
                                    disabled={isNextBtn}
                                    onClick={() =>
                                        onNext({
                                            phoneNumber: form.getValues('phone'),
                                            code: authCode,
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

export const Timer = memo(() => {
    const MINUTES_IN_MS = 3 * 60 * 1000;
    const INTERVAL = 1000;
    const [timeLeft, setTimeLeft] = useState<number>(MINUTES_IN_MS);

    const minutes = String(Math.floor((timeLeft / (1000 * 60)) % 60)).padStart(2, '0');
    const second = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, '0');

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - INTERVAL);
        }, INTERVAL);

        if (timeLeft <= 0) {
            clearInterval(timer);
            console.log('타이머가 종료되었습니다.');
        }

        return () => {
            clearInterval(timer);
        };
    }, [timeLeft]);

    return (
        <div>
            {minutes} : {second}
        </div>
    );
});
