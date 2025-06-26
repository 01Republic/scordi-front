import React, {memo, useState} from 'react';
import {useFormContext} from 'react-hook-form';
import {LockKeyhole, Eye, EyeOff, Dot, TriangleAlert} from 'lucide-react';
import cn from 'classnames';
import {CreateUserRequestDto} from '^models/User/types';
import {validPasswordRegex} from '^utils/valildation';

export const NoTokenPasswordSection = memo(() => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

    const {
        register,
        watch,
        formState: {errors},
    } = useFormContext<CreateUserRequestDto>();

    const {
        onBlur: registerOnBlur,
        onChange: registerOnChange,
        ...restRegister
    } = register('password', {
        required: '비밀번호를 입력해주세요.',
        pattern: {
            value: validPasswordRegex,
            message: '8~16자의 영문, 숫자, 특수문자를 사용해 주세요.',
        },
    });
    const password = watch('password');

    return (
        <>
            <label htmlFor="비밀번호" className="block relative">
                <div className="relative">
                    <input
                        type={isShowPassword ? 'text' : 'password'}
                        value={password}
                        onClick={() => setIsActive(true)}
                        onBlur={(e) => {
                            registerOnBlur(e);
                            if (!password) {
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
                                'border-red-400 focus:outline-red-400': errors.password,
                                'border-gray-300 focus:outline-primaryColor-900': !errors.password,
                            },
                        )}
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <LockKeyhole className="absolute left-4 top-1/2 transform -translate-y-1/2 text-violet-200 text-20" />
                    </div>
                    <div
                        className={cn(
                            'absolute flex pl-12 left-0 pointer-events-none transition duration-700 ease text-gray-400',
                            isActive || password ? 'flex-col top-1 text-xs' : 'items-center inset-y-0 text-14',
                        )}
                    >
                        <span className="flex items-center justify-center">
                            비밀번호
                            <Dot className={cn('text-[#f57453] text-lg', isActive || password ? 'hidden' : 'flex')} />
                        </span>
                    </div>
                    {(isActive || password) && (
                        <button
                            className="absolute pr-5 inset-y-0 right-0"
                            onClick={() => setIsShowPassword(!isShowPassword)}
                        >
                            {isShowPassword ? <Eye /> : <EyeOff />}
                        </button>
                    )}
                </div>
            </label>
            {errors.password && (
                <section className="flex gap-1 text-red-400 w-full justify-start -mt-1">
                    <TriangleAlert className="text-red-400" />
                    <p className="font-normal text-12">{errors.password.message}</p>
                </section>
            )}
        </>
    );
});
