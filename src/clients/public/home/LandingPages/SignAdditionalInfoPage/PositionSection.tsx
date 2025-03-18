import React, {memo, useState} from 'react';
import {ChevronDown} from 'lucide-react';
import {TriangleAlert} from 'lucide-react';
import {BriefcaseBusiness} from 'lucide-react';
import {useFormContext} from 'react-hook-form';
import {UserAdditionalInfoType} from '^models/User/types';
import cn from 'classnames';

export const PositionSection = () => {
    const [isActive, setIsActive] = useState<boolean>(false);

    const {
        register,
        watch,
        formState: {errors},
    } = useFormContext<UserAdditionalInfoType>();
    const job = watch('job');
    const {
        onBlur: registerOnBlur,
        onChange: registerOnChange,
        ...restRegister
    } = register('job', {
        required: '하는 일을 선택해주세요.',
    });

    return (
        <>
            <label htmlFor="하는 일" className="block relative">
                <div className="relative">
                    <input
                        type="job"
                        onClick={() => setIsActive(true)}
                        onBlur={(e) => {
                            registerOnBlur(e);
                            if (!job) {
                                setIsActive(false);
                            }
                        }}
                        onChange={(e) => {
                            registerOnChange(e);
                            const value = e.target.value;
                        }}
                        {...restRegister}
                        className="w-full bg-white h-12 border border-neutral-300 text-sm text-neutral-900 rounded-lg pl-12 pr-5 pt-3 focus:outline focus:outline-1 focus:outline-primaryColor-900"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <BriefcaseBusiness className="absolute left-4 top-1/2 transform -translate-y-1/2 text-violet-200 text-20" />
                    </div>
                    <div
                        className={cn(
                            'absolute flex pl-12 left-0 pointer-events-none transition duration-700 ease text-neutral-400',
                            isActive || job ? 'flex-col top-1 text-xs' : 'items-center inset-y-0 text-md',
                        )}
                    >
                        <span>하는 일</span>
                    </div>
                </div>
                <button className="absolute inset-y-0 flex items-center right-4">
                    <ChevronDown className="text-neutral-600 text-20" />
                </button>
            </label>
            {errors.job && (
                <section className="flex gap-1 text-red-400 w-full justify-start -mt-1">
                    <TriangleAlert className="text-red-400" />
                    <p className="font-normal text-12">{errors.job?.message}</p>
                </section>
            )}
        </>
    );
};
