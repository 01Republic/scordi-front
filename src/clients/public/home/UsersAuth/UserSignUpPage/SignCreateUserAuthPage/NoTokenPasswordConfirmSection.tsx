import React, {memo, useState} from 'react';
import {useFormContext} from 'react-hook-form';
import {LockKeyhole, Dot, TriangleAlert} from 'lucide-react';
import cn from 'classnames';
import {CreateUserRequestDto} from '^models/User/types';

export const NoTokenPasswordConfirmSection = memo(() => {
    const [isActive, setIsActive] = useState<boolean>(false);

    const {
        register,
        watch,
        formState: {errors},
    } = useFormContext<CreateUserRequestDto>();
    const {
        onBlur: registerOnBlur,
        onChange: registerOnChange,
        ...restRegister
    } = register('passwordConfirmation', {
        required: '비밀번호를 확인해주세요',
        validate: (value) => {
            if (value !== watch('password')) {
                return '비밀번호가 일치하지 않습니다.';
            }
        },
    });

    const passwordConfirm = watch('passwordConfirmation');

    return (
        <>
            <label htmlFor="비밀번호 확인" className="block relative">
                <div className="relative">
                    <input
                        type="password"
                        value={passwordConfirm}
                        onClick={() => setIsActive(true)}
                        onBlur={(e) => {
                            registerOnBlur(e);
                            if (!passwordConfirm) {
                                setIsActive(false);
                            }
                        }}
                        onChange={(e) => {
                            registerOnChange(e);
                        }}
                        {...restRegister}
                        className={cn(
                            'w-full bg-white h-14 border text-sm text-gray-900 rounded-lg pl-12 pr-5 pt-3 focus:outline focus:outline-1',
                            {
                                'border-red-400 focus:outline-red-400': errors.passwordConfirmation,
                                'border-gray-300 focus:outline-primaryColor-900': !errors.passwordConfirmation,
                            },
                        )}
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <LockKeyhole className="absolute left-4 top-1/2 transform -translate-y-1/2 text-violet-200 text-20" />
                    </div>
                    <div
                        className={cn(
                            'absolute flex pl-12 left-0 pointer-events-none transition duration-700 ease text-gray-400',
                            isActive || passwordConfirm ? 'flex-col top-1 text-xs' : 'items-center inset-y-0 text-14',
                        )}
                    >
                        <span className="w-full flex items-center justify-center">
                            비밀번호 확인
                            <Dot
                                className={cn(
                                    'text-[#f57453] text-lg',
                                    isActive || passwordConfirm ? 'hidden' : 'flex',
                                )}
                            />
                        </span>
                    </div>
                </div>
            </label>
            {errors.passwordConfirmation && (
                <section className="flex gap-1 text-red-400 w-full justify-start -mt-1">
                    <TriangleAlert className="text-red-400" />
                    <p className="font-normal text-12">{errors.passwordConfirmation.message}</p>
                </section>
            )}
        </>
    );
});
