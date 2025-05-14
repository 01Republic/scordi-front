import React, {memo} from 'react';
import {useFormContext} from 'react-hook-form';
import cn from 'classnames';
import {CreateAccountRequestDto} from '^models/CodefAccount/type/create-account.request.dto';
import {CodefCustomerType} from '^models/CodefAccount/type/enums';

interface AssetEntitySelectorProps {}

export const BusinessTypeSelector = memo((props: AssetEntitySelectorProps) => {
    const {} = props;
    const {setValue, watch} = useFormContext<CreateAccountRequestDto>();

    const selectValue = watch('clientType') || CodefCustomerType.Business;
    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {[
                {label: '기업고객 (법인)', value: CodefCustomerType.Business},
                {label: '개인고객 (개인)', value: CodefCustomerType.Personal},
            ].map((option, i) => {
                const active = selectValue === option.value;
                return (
                    <button
                        key={i}
                        type="button"
                        onClick={() => setValue('clientType', option.value)}
                        className={`btn no-animation btn-animation p- gap-4 btn-block rounded-md justify-start font-normal  ${
                            active ? '!bg-indigo-50 !border-scordi' : '!bg-white border-gray-200 hover:border-scordi'
                        }`}
                    >
                        <span
                            className={`w-[10px] h-[10px] rounded-full outline outline-1 outline-offset-2 ${
                                active ? 'bg-indigo-400 outline-indigo-500' : 'bg-slate-300  outline-slate-300'
                            }`}
                        />
                        <span>{option.label}</span>
                    </button>
                );
            })}
        </div>
    );
});
