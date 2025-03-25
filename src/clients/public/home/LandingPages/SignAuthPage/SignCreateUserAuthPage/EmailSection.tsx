import React, {memo, useState} from 'react';
import {useFormContext} from 'react-hook-form';
import cn from 'classnames';
import {Mail} from 'lucide-react';
import {CreateUserRequestDto} from '^models/User/types';

interface EmailSectionProps {}

export const EmailSection = memo((props: EmailSectionProps) => {
    const {} = props;
    const [isActive, setIsActive] = useState<boolean>(false);
    const {register, watch} = useFormContext<CreateUserRequestDto>();
    const value = watch('email');
    const {onBlur: registerOnBlur, ...restRegister} = register('email');

    return (
        <label htmlFor="이메일" className="block relative">
            <div className="relative">
                <input
                    disabled
                    readOnly
                    onClick={() => setIsActive(true)}
                    onBlur={(e) => {
                        registerOnBlur(e);
                        if (!value) {
                            setIsActive(false);
                        }
                    }}
                    {...restRegister}
                    className="w-full bg-neutral-100 h-12 border border-neutral-300 text-sm text-neutral-900 rounded-lg pl-12 pr-5 pt-3 focus:outline focus:outline-1 focus:outline-primaryColor-900"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-violet-200 text-[22px]" />
                </div>
                <div
                    className={cn(
                        'absolute flex pl-12 left-0 pointer-events-none transition duration-700 ease text-neutral-400',
                        isActive || value ? 'flex-col top-1 text-xs' : 'items-center inset-y-0 text-md',
                    )}
                >
                    <span>이메일</span>
                </div>
            </div>
        </label>
    );
});
