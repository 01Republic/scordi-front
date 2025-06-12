import React, {useState} from 'react';
import {ChevronDown, Dot} from 'lucide-react';
import {TriangleAlert} from 'lucide-react';
import {BriefcaseBusiness} from 'lucide-react';
import {useFormContext} from 'react-hook-form';
import {CreateUserRequestDto, t_userJob, UserJob} from '^models/User/types';
import cn from 'classnames';

export const JobSection = () => {
    const [isActive, setIsActive] = useState<boolean>(false);

    const {
        register,
        watch,
        setValue,
        formState: {errors},
    } = useFormContext<CreateUserRequestDto>();

    const {onBlur: registerOnBlur} = register('job', {
        required: '하는 일을 선택해주세요.',
    });

    const selectedJob = watch('job') as UserJob;
    const jobOptions = Object.values(UserJob);

    const handleSelect = (job: UserJob) => {
        setValue('job', job, {shouldValidate: true});
        setIsActive(false);
    };

    return (
        <>
            <label htmlFor="하는 일" className="block relative">
                <div className="relative">
                    <input type="text" readOnly hidden {...register('job', {required: '하는 일을 선택해주세요.'})} />
                    <div
                        onClick={() => setIsActive(!isActive)}
                        onBlur={(e) => {
                            registerOnBlur(e);
                            if (!selectedJob) {
                                setIsActive(false);
                            }
                        }}
                        className="w-full bg-white pt-6 h-14 cursor-pointer border border-gray-300 text-sm text-neutral-900 rounded-lg pl-12 pr-5 focus:outline focus:outline-1 focus:outline-primaryColor-900"
                    >
                        {t_userJob(selectedJob)}
                    </div>
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <BriefcaseBusiness className="absolute left-4 top-1/2 transform -translate-y-1/2 text-violet-200 text-18" />
                    </div>
                    <div
                        className={cn(
                            'absolute flex pl-12 left-0 pointer-events-none transition duration-700 ease text-neutral-400',
                            isActive || selectedJob ? 'flex-col top-2 text-xs' : 'items-center inset-y-0 text-14',
                        )}
                    >
                        <span className="w-full flex items-center justify-center">
                            하는 일
                            <Dot
                                className={cn('text-[#f57453] text-lg', isActive || selectedJob ? 'hidden' : 'flex')}
                            />
                        </span>
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
                        {jobOptions.map((job) => (
                            <li
                                key={job}
                                className="px-4 py-3 hover:bg-neutral-100 active:bg-primaryColor-900 active:text-white cursor-pointer text-14"
                                onMouseDown={() => {
                                    handleSelect(job);
                                }}
                            >
                                {t_userJob(job)}
                            </li>
                        ))}
                    </ul>
                )}
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
