import React, {useState} from 'react';
import {useFormContext} from 'react-hook-form';
import {toast} from 'react-hot-toast';
import {Dot, TriangleAlert} from 'lucide-react';
import {Check} from 'lucide-react';
import {Phone} from 'lucide-react';
import cn from 'classnames';
import {CreateUserRequestDto} from '^models/User/types';
import {CodeSection} from './CodeSection';
import {useCodeSend} from '^clients/public/home/LandingPages/SignAuthPage/SignAuthPage.atom';

interface PhoneNumberSectionProps {
    isCodeConfirmed: boolean;
    setIsCodeConfirmed: (val: boolean) => void;
}

export const PhoneNumberSection = (props: PhoneNumberSectionProps) => {
    const {isCodeConfirmed, setIsCodeConfirmed} = props;
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('string');
    const validPhoneRegex = /^(010)(-?\d{4})(-?\d{4})$/;

    const {
        register,
        watch,
        formState: {errors},
    } = useFormContext<CreateUserRequestDto>();

    const {
        onBlur: registerOnBlur,
        onChange: registerOnChange,
        ...restRegister
    } = register('phone', {
        required: '전화번호를 입력해주세요.',
        pattern: {
            value: validPhoneRegex,
            message: '전화번호 형식이 올바르지 않습니다. (예: 010-0000-0000)',
        },
        validate: (value) => {
            const digits = value.replace(/-/g, '');
            return digits.length === 11 || '전화번호는 숫자 11자리여야 합니다.';
        },
    });

    const phone = watch('phone');
    const disabled = !phone || !validPhoneRegex.test(phone);

    const {mutate} = useCodeSend();

    const onCodeSend = () => {
        setIsCodeConfirmed(false);
        mutate(
            {phoneNumber: phone},
            {
                onSuccess: () => {
                    setPhoneNumber(phone);
                    setIsCodeSent(true);
                    toast.success('인증 번호를 발송해드렸어요.');
                },
            },
        );
    };

    return (
        <>
            <label htmlFor="전화번호" className="block relative">
                <div className="relative">
                    <input
                        type="text"
                        readOnly={isCodeConfirmed}
                        disabled={isCodeConfirmed}
                        onClick={() => setIsActive(true)}
                        onBlur={(e) => {
                            registerOnBlur(e);
                            if (!phone) {
                                setIsActive(false);
                            }
                        }}
                        onChange={(e) => {
                            e.target.value = e.target.value.replace(/[^0-9-]/g, '');
                            registerOnChange(e);
                        }}
                        {...restRegister}
                        className={cn(
                            'w-full bg-white h-14 border text-sm text-neutral-900 rounded-lg pl-12 pr-5 pt-3 focus:outline focus:outline-1',
                            {
                                'bg-gray-100': isCodeConfirmed,
                                'bg-white': !isCodeConfirmed,
                                'border-red-400 focus:outline-red-400': errors.phone,
                                'border-neutral-300 focus:outline-primaryColor-900': !errors.phone,
                            },
                        )}
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-violet-200 text-20" />
                    </div>
                    <div
                        className={cn(
                            'absolute flex pl-12 left-0 pointer-events-none transition duration-700 ease text-neutral-400',
                            isActive || phone ? 'flex-col top-2 text-xs' : 'items-center inset-y-0 text-14',
                        )}
                    >
                        <span className="w-full flex items-center justify-center">
                            전화번호
                            <Dot className={cn('text-[#f57453] text-lg', isActive || phone ? 'hidden' : 'flex')} />
                        </span>
                    </div>
                </div>
                {isCodeConfirmed ? (
                    <div className="absolute inset-y-0 flex items-center right-4">
                        <Check className=" text-emerald-400 text-18" />
                    </div>
                ) : (
                    <div className="absolute inset-y-0 flex items-center right-4 ">
                        <button
                            type="button"
                            onClick={onCodeSend}
                            className={cn(
                                'btn btn-sm',
                                disabled
                                    ? 'btn-disabled2'
                                    : isCodeSent && !isCodeConfirmed
                                    ? 'btn-white'
                                    : 'btn-scordi',
                            )}
                        >
                            <p className="whitespace-nowrap">
                                {isCodeSent && !isCodeConfirmed ? '인증 재요청' : '인증 요청'}
                            </p>
                        </button>
                    </div>
                )}
            </label>

            {errors.phone && (
                <section className="flex gap-1 text-red-400 w-full justify-start -mt-1">
                    <TriangleAlert className="text-red-400" />
                    <p className="font-normal text-12">{errors.phone?.message}</p>
                </section>
            )}
            {isCodeConfirmed
                ? null
                : isCodeSent && (
                      <CodeSection
                          setIsCodeSent={setIsCodeSent}
                          setIsCodeConfirmed={setIsCodeConfirmed}
                          phoneNumber={phoneNumber}
                      />
                  )}
        </>
    );
};
