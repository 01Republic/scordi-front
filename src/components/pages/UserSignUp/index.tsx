import React, {memo, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {WelcomePageRoute} from '^pages/users/signup/welcome';
import {toast} from 'react-toastify';
import {useForm} from 'react-hook-form';
import {TextInput} from '^components/TextInput';
import {SendPhoneAuthMessageDto, UserSocialSignUpRequestDto} from '^models/User/types';
import {errorNotify} from '^utils/toast-notify';
import {DefaultButton} from '^components/Button';
import {useCurrentUser} from '^models/User/hook';
import {patchPhoneAuthSession, postPhoneAuthSession} from '^api/authlization';
import {Timer} from './AuthenticationCode';
import {AgreeModal} from './AgreeModal';
import {userApi} from '^models/User/api/session';

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
    const [phoneNumberText, setPhoneNumberText] = useState('');
    const [authenticationCode, setAuthenticationCode] = useState('');

    if (currentUser) loginRedirect(currentUser);

    // 회원가입 & 리디렉션
    const submit = (data: UserSocialSignUpRequestDto) => {
        userApi.registration
            .create(data)
            .then(() => {
                socialLogin({provider: data.provider, uid: data.uid})
                    .then(() => router.push(WelcomePageRoute.path()))
                    .catch(errorNotify);
            })
            .catch(errorNotify);
    };

    const onCheckProfileLength = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (form.watch('name').length > 2 && form.watch('phone').length > 9) {
            setIsSendBtn(false);
        } else if (form.watch('name').length < 2 || e.target.value.length <= 9) {
            setIsSendBtn(true);
        }
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
        patchPhoneAuthSession(data)
            .then((res) => {
                console.log('🥶', res);
                if (res.status === 200) {
                    // 인증번호 완료되면 페이지 넘기는게 아니라 약관 동의받고 회원가입 처리 해야 됨.
                    // 즉, 여기서는 약관 모달 출현시킴.
                    setModalOpen(true);
                    setIsSendBtn(true);
                }
            })
            .catch((error) => {
                toast.info('인증번호를 확인해주세요');
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

    useEffect(() => {
        form.setValue('phone', phoneNumberText);
    }, [phoneNumberText]);

    return (
        <div className="bg-white">
            <AgreeModal
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                form={form}
                modalConfirmButtonClick={modalConfirmButtonClick}
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
                        <div className="form-control w-full mb-[20px]">
                            <label className="label">
                                <span className="label-text">
                                    Phone Number
                                    <span className="text-red-500"> *</span>
                                </span>
                            </label>
                            <input
                                className="input input-bordered w-full bg-slate-50 border-slate-100"
                                type="text"
                                required={true}
                                placeholder={'Enter Your Phone Number'}
                                value={phoneNumberText}
                                maxLength={11}
                                autoComplete={'off'}
                                onInput={onCheckProfileLength}
                                onChange={(e) => {
                                    const phoneInput = e.target.value;
                                    phoneInput.match(/^\d*$/i)
                                        ? setPhoneNumberText(phoneInput)
                                        : setPhoneNumberText(phoneNumberText);
                                }}
                            />
                        </div>

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
                            <div>
                                <div className="flex">
                                    <div className="form-control w-full mb-[20px]">
                                        <label className="label">
                                            <span className="label-text">
                                                Authentication Code
                                                <span className="text-red-500"> *</span>
                                            </span>
                                        </label>
                                        <input
                                            className="input input-bordered w-full bg-slate-50 border-slate-100"
                                            type="text"
                                            required={true}
                                            placeholder={'Enter Your Authentication Code'}
                                            value={authenticationCode}
                                            maxLength={6}
                                            autoComplete={'off'}
                                            onChange={(e) => {
                                                const codeInput = e.target.value;
                                                codeInput.length >= 6 ? setIsNextBtn(false) : setIsNextBtn(true);
                                                setAuthCode(codeInput);
                                                codeInput.match(/^\d*$/i)
                                                    ? setAuthenticationCode(codeInput)
                                                    : setAuthenticationCode(authenticationCode);
                                            }}
                                        />
                                    </div>
                                    <div className={'pt-[1rem] w-20 mb-16 ml-3 mt-8 font-bold text-[red]'}>
                                        {isCodeShow && <Timer />}
                                    </div>
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
