import {useTranslation} from 'next-i18next';
import {memo} from 'react';

interface BusinessTypeSectionProps {
    isPersonal: boolean;
    setIsPersonal: (value: boolean) => void;
}

export const BusinessTypeSection = memo((props: BusinessTypeSectionProps) => {
    const {t} = useTranslation('assets');
    const {isPersonal, setIsPersonal} = props;

    return (
        <div className="grid grid-cols-4 gap-2">
            {[
                {label: t('createSteps.businessType.corporate') as string, value: false},
                {label: t('createSteps.businessType.personal') as string, value: true},
            ].map((option, i) => {
                const active = isPersonal === option.value;
                return (
                    <div key={i}>
                        <button
                            onClick={() => setIsPersonal(option.value)}
                            className={`btn no-animation btn-animation p- gap-4 btn-block rounded-md justify-start font-normal  ${
                                active
                                    ? '!bg-indigo-50 !border-scordi'
                                    : '!bg-white border-gray-200 hover:border-scordi'
                            }`}
                        >
                            <span
                                className={`w-[10px] h-[10px] rounded-full outline outline-1 outline-offset-2 ${
                                    active ? 'bg-indigo-400 outline-indigo-500' : 'bg-slate-300  outline-slate-300'
                                }`}
                            />
                            <span>{option.label}</span>
                        </button>
                    </div>
                );
            })}
        </div>
    );
});

BusinessTypeSection.displayName = 'BusinessTypeSection';
