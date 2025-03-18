import React, {useState} from 'react';
import {useFormContext} from 'react-hook-form';
import {toast} from 'react-hot-toast';
import {TriangleAlert} from 'lucide-react';
import {Check} from 'lucide-react';
import {Phone} from 'lucide-react';
import cn from 'classnames';
import {UserAdditionalInfoType} from '^models/User/types';
import {useCodeSend} from '../BetaSignPhoneAuthPage/BetaSignPhoneAuthPage.atom';
import {CodeSection} from './CodeSection';

export const PhoneNumberSection = () => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [isCodeConfirmed, setIsCodeConfirmed] = useState(false);

    const {
        register,
        watch,
        formState: {errors},
    } = useFormContext<UserAdditionalInfoType>();

    const {
        onBlur: registerOnBlur,
        onChange: registerOnChange,
        ...restRegister
    } = register('phoneNumber', {
        required: '전화번호를 입력해주세요.',
        maxLength: {
            value: 11,
            message: '전화번호는 최대 11자리입니다.',
        },
    });

    const phoneNumber = watch('phoneNumber');
    const disabled = phoneNumber?.length < 11 || !phoneNumber;

    const {mutate} = useCodeSend();

    const onCodeSend = () => {
        mutate(
            {phoneNumber},
            {
                onSuccess: () => {
                    setIsCodeSent(true);
                    toast.success('인증 번호를 발송해드렸어요.');
                },
            },
        );
    };

    return (
        <>
            <section className="grid grid-cols-4 items-center justify-center gap-3">
                <div className={cn(!isCodeConfirmed ? 'col-span-3' : 'col-span-4')}>
                    <label htmlFor="전화번호" className="block relative">
                        <div className="relative">
                            <input
                                type="number"
                                readOnly={isCodeConfirmed}
                                disabled={isCodeConfirmed}
                                onClick={() => setIsActive(true)}
                                onBlur={(e) => {
                                    registerOnBlur(e);
                                    if (!phoneNumber) {
                                        setIsActive(false);
                                    }
                                }}
                                onChange={(e) => {
                                    registerOnChange(e);
                                    const value = e.target.value;
                                    if (Number(value) > 11) {
                                        e.target.value = e.target.value.slice(0, 11);
                                    }
                                }}
                                {...restRegister}
                                className={cn(
                                    'w-full bg-white h-12 border text-sm text-neutral-900 rounded-lg pl-12 pr-5 pt-3 focus:outline focus:outline-1',
                                    {
                                        'bg-gray-100': isCodeConfirmed,
                                        'bg-white': !isCodeConfirmed,
                                        'border-red-400 focus:outline-red-400': errors.phoneNumber,
                                        'border-neutral-300 focus:outline-primaryColor-900': !errors.phoneNumber,
                                    },
                                )}
                            />
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-violet-200 text-20" />
                            </div>
                            <div
                                className={cn(
                                    'absolute flex pl-12 left-0 pointer-events-none transition duration-700 ease text-neutral-400',
                                    isActive || phoneNumber
                                        ? 'flex-col top-1 text-xs'
                                        : 'items-center inset-y-0 text-md',
                                )}
                            >
                                <span>전화번호</span>
                            </div>
                        </div>
                        {isCodeConfirmed && (
                            <div className="absolute inset-y-0 flex items-center right-4">
                                <Check className=" text-emerald-400 text-20" />
                            </div>
                        )}
                    </label>
                </div>
                {!isCodeConfirmed && (
                    <button
                        type="button"
                        onClick={onCodeSend}
                        className={cn('col-span-1 ', disabled ? 'btn-disabled' : 'btn bg-primaryColor-900 text-white')}
                    >
                        <p className="whitespace-nowrap">
                            {isCodeSent && !isCodeConfirmed ? '인증 재요청' : '인증 요청'}
                        </p>
                    </button>
                )}
            </section>
            {errors.phoneNumber && (
                <section className="flex gap-1 text-red-400 w-full justify-start -mt-1">
                    <TriangleAlert className="text-red-400" />
                    <p className="font-normal text-12">{errors.phoneNumber?.message}</p>
                </section>
            )}
            {isCodeConfirmed
                ? null
                : isCodeSent && <CodeSection setIsCodeSent={setIsCodeSent} setIsCodeConfirmed={setIsCodeConfirmed} />}
        </>
    );
};
