import {CreateAccountRequestDto} from '^models/CodefAccount/type/create-account.request.dto';
import {CodefCustomerType} from '^models/CodefAccount/type/enums';
import {useTranslation} from 'next-i18next';
import {memo} from 'react';
import {useFormContext} from 'react-hook-form';

interface AssetEntitySelectorProps {}

export const BusinessTypeSelector = memo((props: AssetEntitySelectorProps) => {
    const {t} = useTranslation('assets');
    const {} = props;
    const {setValue, watch} = useFormContext<CreateAccountRequestDto>();

    const selectValue = watch('clientType') || CodefCustomerType.Business;

    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {[
                {label: t('connectSteps.common.businessType.corporate'), value: CodefCustomerType.Business},
                {label: t('connectSteps.common.businessType.personal'), value: CodefCustomerType.Personal},
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
