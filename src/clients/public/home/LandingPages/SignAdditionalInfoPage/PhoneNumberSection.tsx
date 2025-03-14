import React, {memo, useState} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {CiWarning} from 'react-icons/ci';
import {FaCheck} from 'react-icons/fa6';
import {
    codeConfirmedState,
    codeSentState,
    phoneAuthDataState,
    phoneAuthReadyState,
    useSendCode,
} from '^clients/public/home/LandingPages/BetaSignPhoneAuthPage/BetaSignPhoneAuthPage.atom';
import {useTranslation} from 'next-i18next';
import {FaPhoneAlt} from 'react-icons/fa';
import {useFormContext} from 'react-hook-form';
import {UserAdditionalInfoType} from '^models/User/types';
import cn from 'classnames';
import {CodeSection} from '^clients/public/home/LandingPages/SignAdditionalInfoPage/CodeSection';

interface PhoneNumberSectionProps {}

export const PhoneNumberSection = memo((props: PhoneNumberSectionProps) => {
    const {} = props;
    const [isActive, setIsActive] = useState<boolean>(false);
    const codeConfirmed = useRecoilValue(codeConfirmedState);

    const {
        register,
        watch,
        formState: {errors},
    } = useFormContext<UserAdditionalInfoType>();
    const phoneNumber = watch('phoneNumber');
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

    const disabled = phoneNumber?.length < 11 || !phoneNumber;

    const codeSent = useRecoilValue(codeSentState);
    const sendCode = useSendCode();
    const {t} = useTranslation('sign');

    codeConfirmed;
    return (
        <>
            <section className="grid grid-cols-4 items-center justify-center gap-3">
                <div className={cn(!codeConfirmed ? 'col-span-3' : 'col-span-4')}>
                    <label htmlFor="전화번호" className="block relative">
                        <div className="relative">
                            <input
                                type="number"
                                readOnly={codeConfirmed}
                                disabled={codeConfirmed}
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
                                    'w-full h-12 border border-neutral-300 text-sm text-neutral-900 rounded-lg pl-12 pr-5 pt-3 focus:outline focus:outline-1 focus:outline-primaryColor-900',
                                    {
                                        'bg-gray-100': codeConfirmed,
                                        'bg-white': !codeConfirmed,
                                    },
                                )}
                            />
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <FaPhoneAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-violet-200 text-20" />
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
                        {codeConfirmed && (
                            <div className="absolute inset-y-0 flex items-center right-4">
                                <FaCheck className=" text-emerald-400 text-20" />
                            </div>
                        )}
                    </label>
                </div>
                {!codeConfirmed && (
                    <button
                        type="button"
                        onClick={() => sendCode({phoneNumber})}
                        className={cn('col-span-1 ', disabled ? 'btn-disabled' : 'btn bg-primaryColor-900 text-white')}
                    >
                        <p className="whitespace-nowrap">인증 요청</p>
                    </button>
                )}
            </section>
            {errors.phoneNumber && (
                <section className="flex gap-1 text-red-400 w-full justify-start -mt-1">
                    <CiWarning className="text-red-400" />
                    <p className="font-normal text-10">{errors.phoneNumber?.message}</p>
                </section>
            )}
            {codeConfirmed ? null : codeSent && <CodeSection />}
        </>
    );
});
