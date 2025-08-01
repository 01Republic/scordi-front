import React, {useState} from 'react';
import {useFormContext} from 'react-hook-form';
import {Building, TriangleAlert, Dot} from 'lucide-react';
import cn from 'classnames';
import {CreateOrganizationRequestDto} from '^models/Organization/type';
import {validBizNoRegex} from '^utils/valildation';

export const BusinessRegistrationNumberSection = () => {
    const [isActive, setIsActive] = useState<boolean>(false);

    const {
        register,
        watch,
        setValue,
        formState: {errors},
    } = useFormContext<CreateOrganizationRequestDto>();

    const value = watch('bizInfo.bizNo');

    const {
        onBlur: registerOnBlur,
        onChange: registerOnChange,
        ...restRegister
    } = register('bizInfo.bizNo', {
        required: '사업자등록번호를 입력해주세요.',
        pattern: {
            value: validBizNoRegex,
            message: '사업자등록번호 형식이 올바르지 않습니다. (예: 000-00-00000)',
        },
        validate: (value = '') => {
            const digits = value.replace(/\D/g, '');
            return digits.length === 10 || '사업자등록번호는 숫자 10자리여야 합니다.';
        },
    });

    return (
        <>
            <label htmlFor="사업자등록번호" className="block relative">
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
                            const rawValue = e.target.value.replace(/[^0-9-]/g, '');
                            setValue('bizInfo.bizNo', rawValue, {shouldValidate: true});
                        }}
                        {...restRegister}
                        className={cn(
                            'w-full bg-white h-14 border text-sm text-gray-900 rounded-lg pl-12 pr-5 pt-3 focus:outline focus:outline-1',
                            {
                                'border-red-400 focus:outline-red-400': errors.bizInfo?.bizNo,
                                'border-gray-300 focus:outline-primaryColor-900': !errors.bizInfo?.bizNo,
                            },
                        )}
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 text-violet-200 text-20" />
                    </div>
                    <div
                        className={cn(
                            'absolute flex pl-12 left-0 pointer-events-none transition duration-700 ease text-gray-400',
                            isActive || value ? 'flex-col top-1 text-xs' : 'items-center inset-y-0 text-14',
                        )}
                    >
                        <span className="w-full flex items-center justify-center">
                            사업자등록번호
                            <Dot className={cn('text-[#f57453] text-lg', isActive || value ? 'hidden' : 'flex')} />
                        </span>
                    </div>
                </div>
            </label>
            {errors.bizInfo?.bizNo && (
                <section className="flex gap-1 text-red-400 w-full justify-start -mt-1">
                    <TriangleAlert className="text-red-400" />
                    <p className="font-normal text-12">{errors.bizInfo?.bizNo.message}</p>
                </section>
            )}
        </>
    );
};
