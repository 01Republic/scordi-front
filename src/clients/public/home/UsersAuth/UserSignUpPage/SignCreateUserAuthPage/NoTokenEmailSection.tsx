import React, {useState, memo} from 'react';
import {useFormContext} from 'react-hook-form';
import cn from 'classnames';
import {Mail, TriangleAlert, Dot} from 'lucide-react';
import {CreateUserRequestDto} from '^models/User/types';
import {validateEmailRegex} from '^utils/valildation';

export const NoTokenEmailSection = memo(() => {
    const [isActive, setIsActive] = useState<boolean>(false);

    const {
        register,
        watch,
        formState: {errors},
    } = useFormContext<CreateUserRequestDto>();

    const value = watch('email');

    const {
        onBlur: registerOnBlur,
        onChange: registerOnChange,
        ...restRegister
    } = register('email', {
        required: '이메일을 입력해주세요.',
        pattern: {
            value: validateEmailRegex,
            message: '유효한 이메일 형식이 아닙니다.”',
        },
    });

    return (
        <>
            <label htmlFor="이메일" className="block relative">
                <div className="relative">
                    <input
                        type="text"
                        value={value}
                        onClick={() => setIsActive(true)}
                        onBlur={(e) => {
                            registerOnBlur(e);
                            if (!value) {
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
                                'border-red-400 focus:outline-red-400': errors.email,
                                'border-gray-300 focus:outline-primaryColor-900': !errors.email,
                            },
                        )}
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-violet-200 text-20" />
                    </div>
                    <div
                        className={cn(
                            'absolute flex pl-12 left-0 pointer-events-none transition duration-700 ease text-gray-400',
                            isActive || value ? 'flex-col top-1 text-xs' : 'items-center inset-y-0 text-14',
                        )}
                    >
                        <span className="w-full flex items-center justify-center">
                            이메일
                            <Dot className={cn('text-[#f57453] text-lg', isActive || value ? 'hidden' : 'flex')} />
                        </span>
                    </div>
                </div>
            </label>
            {errors.email && (
                <section className="flex gap-1 text-red-400 w-full justify-start -mt-1">
                    <TriangleAlert className="text-red-400" />
                    <p className="font-normal text-12">{errors.email.message}</p>
                </section>
            )}
        </>
    );
});
