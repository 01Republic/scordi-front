import React, {useState} from 'react';
import {useFormContext} from 'react-hook-form';
import {Building, TriangleAlert} from 'lucide-react';
import cn from 'classnames';
import {WorkspacesAndCompanyInfoType} from '^models/User/types';

export const BusinessRegistrationNumberSection = () => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const {
        register,
        watch,
        formState: {errors},
    } = useFormContext<WorkspacesAndCompanyInfoType>();
    const value = watch('businessRegistrationNumber');
    const {
        onBlur: registerOnBlur,
        onChange: registerOnChange,
        ...restRegister
    } = register('businessRegistrationNumber', {
        required: '사업자등록번호를 입력해주세요.',
        minLength: {
            value: 10,
            message: '사업자등록번호는 10자리입니다.',
        },
        maxLength: {
            value: 10,
            message: '사업자등록번호는 10자리입니다.',
        },
    });

    return (
        <>
            <label htmlFor="사업자등록번호" className="block relative">
                <div className="relative">
                    <input
                        onClick={() => setIsActive(true)}
                        onBlur={(e) => {
                            registerOnBlur(e);
                            if (!value) {
                                setIsActive(false);
                            }
                        }}
                        onChange={(e) => {
                            registerOnChange(e);
                            const value = e.target.value;
                            if (Number(value) > 10) {
                                e.target.value = e.target.value.slice(0, 10);
                            }
                        }}
                        {...restRegister}
                        className={cn(
                            'w-full bg-white h-12 border text-sm text-neutral-900 rounded-lg pl-12 pr-5 pt-3 focus:outline focus:outline-1',
                            {
                                'border-red-400 focus:outline-red-400': errors.businessRegistrationNumber,
                                'border-neutral-300 focus:outline-primaryColor-900': !errors.businessRegistrationNumber,
                            },
                        )}
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 text-violet-200 text-[22px]" />
                    </div>
                    <div
                        className={cn(
                            'absolute flex pl-12 left-0 pointer-events-none transition duration-700 ease text-neutral-400',
                            isActive || value ? 'flex-col top-1 text-xs' : 'items-center inset-y-0 text-md',
                        )}
                    >
                        <span>사업자등록번호</span>
                    </div>
                </div>
            </label>
            {errors.businessRegistrationNumber && (
                <section className="flex gap-1 text-red-400 w-full justify-start -mt-1">
                    <TriangleAlert className="text-red-400" />
                    <p className="font-normal text-12">{errors.businessRegistrationNumber?.message}</p>
                </section>
            )}
        </>
    );
};
