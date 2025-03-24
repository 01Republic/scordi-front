import React, {useState} from 'react';
import {useFormContext} from 'react-hook-form';
import {ChevronDown} from 'lucide-react';
import {TriangleAlert} from 'lucide-react';
import {BriefcaseBusiness} from 'lucide-react';
import cn from 'classnames';
import {CreateOrganizationRequestDto} from '^models/User/types';
import {StepButton} from '../StepButton';
import organizationSizeData from './organizationSize.json';

interface OrganizationSizeProps {
    setStep: (val: number) => void;
    onNext: () => void;
}

export const OrganizationSizeSection = (props: OrganizationSizeProps) => {
    const {setStep, onNext} = props;
    const [isActive, setIsActive] = useState<boolean>(false);

    const {
        register,
        watch,
        setValue,
        formState: {errors, isValid},
    } = useFormContext<CreateOrganizationRequestDto>();

    const {
        onBlur: registerOnBlur,
        onChange: registerOnChange,
        ...restRegister
    } = register('bizInfo.employeeScale', {
        required: '조직 규모을 선택해주세요.',
    });

    const organizationSize = watch('bizInfo.employeeScale');

    const handleSelect = (option: string) => {
        setValue('bizInfo.employeeScale', option);
        setIsActive(!isActive);
    };

    return (
        <>
            <label htmlFor="조직 규모" className="block relative">
                <div className="relative">
                    <input
                        type="organizationSize"
                        readOnly
                        onClick={() => {
                            setIsActive(!isActive);
                        }}
                        onBlur={(e) => {
                            registerOnBlur(e);
                            if (!organizationSize) {
                                setIsActive(false);
                            }
                        }}
                        onChange={(e) => {
                            registerOnChange(e);
                            const value = e.target.value;
                        }}
                        {...restRegister}
                        className="w-full bg-white h-12 cursor-pointer border border-neutral-300 text-sm text-neutral-900 rounded-lg pl-12 pr-5 pt-3 focus:outline focus:outline-1 focus:outline-primaryColor-900"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <BriefcaseBusiness className="absolute left-4 top-1/2 transform -translate-y-1/2 text-violet-200 text-20" />
                    </div>
                    <div
                        className={cn(
                            'absolute flex pl-12 left-0 pointer-events-none transition duration-700 ease text-neutral-400',
                            isActive || organizationSize ? 'flex-col top-1 text-xs' : 'items-center inset-y-0 text-md',
                        )}
                    >
                        <span>조직 규모</span>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={() => setIsActive(true)}
                    className="absolute inset-y-0 flex items-center right-4"
                >
                    <ChevronDown className="text-neutral-600 text-20" />
                </button>

                {isActive && (
                    <ul className="absolute z-10 bg-white border border-neutral-300 w-full mt-1 rounded-lg max-h-60 overflow-auto">
                        {organizationSizeData.organizationSize.map((size, index) => (
                            <li
                                key={index}
                                className="px-4 py-3 hover:bg-neutral-100 active:bg-primaryColor-900 active:text-white cursor-pointer text-14"
                                onMouseDown={() => handleSelect(size)}
                            >
                                {size}
                            </li>
                        ))}
                    </ul>
                )}
            </label>
            {errors.bizInfo?.employeeScale && (
                <section className="flex gap-1 text-red-400 w-full justify-start -mt-1">
                    <TriangleAlert className="text-red-400" />
                    <p className="font-normal text-12">{errors.bizInfo?.employeeScale?.message}</p>
                </section>
            )}
            <section className="w-full mt-10">
                <StepButton text="계속" disabled={isValid} onClick={onNext} />
            </section>
        </>
    );
};
