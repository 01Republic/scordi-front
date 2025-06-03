import React, {memo, useState} from 'react';
import {useFormContext} from 'react-hook-form';
import {TriangleAlert} from 'lucide-react';
import {KeyRound, Dot} from 'lucide-react';
import cn from 'classnames';
import {PhoneAuthConfirmDto} from '^models/User/types';
import {Timer} from '^components/pages/UserSignUp/AuthenticationCode';
import {useCodeConfirm, useCodeSend} from '^clients/public/home/LandingPages/SignAuthPage/SignAuthPage.atom';

interface CodeSectionProps {
    setIsCodeSent: (val: boolean) => void;
    setIsCodeConfirmed: (val: boolean) => void;
    phoneNumber: string;
}

export const CodeSection = memo((props: CodeSectionProps) => {
    const {setIsCodeSent, setIsCodeConfirmed, phoneNumber} = props;
    const [isActive, setIsActive] = useState<boolean>(false);

    const {
        register,
        watch,
        setValue,
        setError,
        formState: {errors},
    } = useFormContext<PhoneAuthConfirmDto>();

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

    const code = watch('code');
    const disabled = (code && code?.length < 6) || !code;

    const {mutate: codeSentMutate} = useCodeSend();
    const {mutate} = useCodeConfirm();

    const onCodeConfirm = () => {
        if (disabled) return;
        mutate(
            {phoneNumber, code},
            {
                onSuccess: () => {
                    setIsCodeSent(false);
                    setIsCodeConfirmed(true);
                    setValue('code', '');
                },
                onError: () => {
                    setIsCodeConfirmed(false);
                    setError('code', {type: 'manual', message: '인증번호를 확인해주세요'});
                },
            },
        );
    };

    return (
        <>
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
                        className={cn(
                            'w-full bg-white h-14 border text-sm text-gray-900 rounded-lg pl-12 pr-5 pt-3 focus:outline focus:outline-1',
                            errors.code
                                ? 'border-red-400 focus:outline-red-400'
                                : 'border-neutral-300 focus:outline-primaryColor-900',
                        )}
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <KeyRound className="absolute left-4 top-1/2 transform -translate-y-1/2 text-violet-200 text-18" />
                    </div>
                    <div
                        className={cn(
                            'absolute flex pl-12 left-0 pointer-events-none transition duration-700 ease text-neutral-400',
                            isActive || code ? 'flex-col top-1 text-xs' : 'items-center inset-y-0 text-md text-14',
                        )}
                    >
                        <span className="w-full flex items-center justify-center">
                            인증번호
                            <Dot className={cn('text-[#f57453] text-lg', isActive || code ? 'hidden' : 'flex')} />
                        </span>
                    </div>

                    <div className="absolute inset-y-0 flex gap-2 items-center right-4 text-sm text-neutral-900">
                        <Timer
                            sec={3 * 60}
                            onFinish={({reset}) => {
                                const confirmMessage = '인증 번호가 만료되었습니다.\n새 인증 번호를 보낼까요?';

                                const isOkClicked = confirm(confirmMessage);
                                if (isOkClicked) {
                                    codeSentMutate({phoneNumber});
                                    setValue('code', '');
                                    setIsCodeConfirmed(false);
                                    reset();
                                } else {
                                    setIsCodeSent(false);
                                    setValue('code', '');
                                    setIsCodeConfirmed(false);
                                }
                            }}
                            resettable
                        />
                        <button
                            type="button"
                            onClick={onCodeConfirm}
                            className={cn('btn btn-sm', disabled ? 'btn-disabled2' : 'btn-scordi')}
                        >
                            <p className="whitespace-nowrap">인증 확인</p>
                        </button>
                    </div>
                </div>
            </label>

            {errors.code && (
                <section className="flex items-center gap-1 text-red-400 w-full justify-start -mt-1">
                    <TriangleAlert className="text-red-400" />
                    <p className="font-normal text-12">{errors.code?.message}</p>
                </section>
            )}
        </>
    );
});
