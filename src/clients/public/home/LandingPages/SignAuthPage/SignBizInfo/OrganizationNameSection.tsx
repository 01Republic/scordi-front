import React, {useState} from 'react';
import {useFormContext} from 'react-hook-form';
import {Building, Dot, TriangleAlert} from 'lucide-react';
import cn from 'classnames';
import {CreateOrganizationRequestDto} from '^models/User/types';
import {StepButton} from '^clients/public/home/LandingPages/SignAuthPage/StepButton';

interface OrganizationNameSectionProps {
    setStep?: (val: number) => void;
    isDisabled?: boolean;
}

export const OrganizationNameSection = (props: OrganizationNameSectionProps) => {
    const {setStep, isDisabled = false} = props;
    const [isActive, setIsActive] = useState<boolean>(false);
    const {
        register,
        watch,
        formState: {errors, isValid},
    } = useFormContext<CreateOrganizationRequestDto>();
    const value = watch('name');
    const {onBlur: registerOnBlur, ...restRegister} = register('name', {
        required: '워크스페이스명을 입력해주세요.',
    });

    return (
        <>
            <label htmlFor="워크스페이스명" className="block relative">
                <div className="relative">
                    <input
                        disabled={isDisabled}
                        readOnly={isDisabled}
                        onClick={() => setIsActive(true)}
                        onBlur={(e) => {
                            registerOnBlur(e);
                            if (!value) {
                                setIsActive(false);
                            }
                        }}
                        {...restRegister}
                        className={cn(
                            'w-full h-12 border text-sm text-neutral-900 rounded-lg pl-12 pr-5 pt-3 focus:outline focus:outline-1',
                            {
                                'bg-gray-100': isDisabled,
                                'bg-white': !isDisabled,
                                'border-red-400 focus:outline-red-400': errors.name,
                                'border-neutral-300 focus:outline-primaryColor-900': !errors.name,
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
                        <span className="w-full flex items-center justify-center">
                            워크스페이스명
                            <Dot className={cn('text-[#f57453] text-lg', isActive || value ? 'hidden' : 'flex')} />
                        </span>
                    </div>
                </div>
            </label>
            {errors.name && (
                <section className="flex gap-1 text-red-400 w-full justify-start -mt-1">
                    <TriangleAlert className="text-red-400" />
                    <p className="font-normal text-12">{errors.name?.message}</p>
                </section>
            )}

            {setStep && (
                <section className="w-full mt-10">
                    <StepButton text="계속" disabled={isValid} onClick={() => setStep(2)} />
                </section>
            )}
        </>
    );
};
