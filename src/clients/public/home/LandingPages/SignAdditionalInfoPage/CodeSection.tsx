import React, {memo, useState} from 'react';
import {FaPhoneAlt} from 'react-icons/fa';
import cn from 'classnames';
import {CiWarning} from 'react-icons/ci';
import {useFormContext} from 'react-hook-form';
import {UserAdditionalInfoType} from '^models/User/types';
import {
    codeConfirmedState,
    codeSentState,
    useConfirmCode,
    useSendCode,
} from '^clients/public/home/LandingPages/BetaSignPhoneAuthPage/BetaSignPhoneAuthPage.atom';
import {Timer} from '^components/pages/UserSignUp/AuthenticationCode';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {useTranslation} from 'next-i18next';

interface CodeSectionProps {}

export const CodeSection = memo((props: CodeSectionProps) => {
    const {} = props;
    const [isActive, setIsActive] = useState<boolean>(false);
    const setCodeSent = useSetRecoilState(codeSentState);
    const setCodeConfirmed = useSetRecoilState(codeConfirmedState);
    const codeConfirmed = useRecoilValue(codeConfirmedState);
    const sendCode = useSendCode();
    const confirmCode = useConfirmCode();
    const {t} = useTranslation('sign');

    const {
        register,
        watch,
        setError,
        formState: {errors},
    } = useFormContext<UserAdditionalInfoType>();

    const {
        onBlur: registerOnBlur,
        onChange: registerOnChange,
        ...restRegister
    } = register('code', {
        required: '인증번호를 입력해주세요.',
        maxLength: {
            value: 6,
            message: '인증번호는 6자리입니다.',
        },
    });

    const phoneNumber = watch('phoneNumber');
    const code = watch('code');
    const disabled = code?.length < 6 || !code;

    const onCodeConfirm = async () => {
        try {
            await confirmCode({phoneNumber, code}).then(() => {
                setCodeSent(false);
                setCodeConfirmed(true);
            });
        } catch (error: any) {
            setError('code', {type: 'manual', message: error.message});
        }
    };

    return (
        <>
            <section className="grid grid-cols-4 items-center justify-center gap-3">
                <div className="col-span-3">
                    <label htmlFor="인증번호" className="block relative">
                        <div className="relative">
                            <input
                                type="number"
                                onClick={() => setIsActive(true)}
                                onBlur={(e) => {
                                    registerOnBlur(e);
                                    if (!code) {
                                        setIsActive(false);
                                    }
                                }}
                                onChange={(e) => {
                                    registerOnChange(e);
                                    const value = e.target.value;
                                    if (Number(value) > 6) {
                                        e.target.value = e.target.value.slice(0, 6);
                                    }
                                }}
                                {...restRegister}
                                className="w-full bg-white h-12 border border-neutral-300 text-sm text-neutral-900 rounded-lg pl-12 pr-5 pt-3 focus:outline focus:outline-1 focus:outline-primaryColor-900"
                            />
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <FaPhoneAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-violet-200 text-20" />
                            </div>
                            <div
                                className={cn(
                                    'absolute flex pl-12 left-0 pointer-events-none transition duration-700 ease text-neutral-400',
                                    isActive || code ? 'flex-col top-1 text-xs' : 'items-center inset-y-0 text-md',
                                )}
                            >
                                <span>인증번호</span>
                            </div>
                            <p className="absolute inset-y-0 flex items-center right-4 text-sm text-neutral-900">
                                <Timer
                                    sec={3 * 60}
                                    onFinish={({reset}) => {
                                        const confirmMessage = `${t(
                                            'phone_auth.code_input.code_has_been_expired',
                                        )}\n${t('phone_auth.code_input.shall_i_send_new_code')}`;

                                        const isOkClicked = confirm(confirmMessage);
                                        if (isOkClicked) {
                                            sendCode({phoneNumber});
                                            reset();
                                        } else {
                                            setCodeSent(false);
                                        }
                                    }}
                                    resettable
                                />
                            </p>
                        </div>
                    </label>
                </div>
                <button
                    type="button"
                    onClick={onCodeConfirm}
                    className={cn('col-span-1 ', disabled ? 'btn-disabled' : 'btn bg-primaryColor-900 text-white')}
                >
                    <p className="whitespace-nowrap">인증 확인</p>
                </button>
            </section>
            <div className="flex items-center justify-between -mt-1">
                <div>
                    {errors.code && (
                        <section className="flex gap-1 text-red-400 w-full justify-start">
                            <CiWarning className="text-red-400" />
                            <p className="font-normal text-10">{errors.code?.message}</p>
                        </section>
                    )}
                </div>
            </div>
        </>
    );
});
