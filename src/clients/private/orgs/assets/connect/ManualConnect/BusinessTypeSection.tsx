import { memo } from "react";

interface BusinessTypeSectionProps {
    isPersonal: boolean;
    setIsPersonal: (value: boolean) => void;
}

export const BusinessTypeSection = memo(({ isPersonal, setIsPersonal }: BusinessTypeSectionProps) => {
    return (
        <section className="relative mb-12">
            <div className="mb-4">
                <h2 className="leading-none text-xl font-semibold mb-2">
                    어떤 사업자 형태이신가요?
                </h2>
                <p className="text-16 text-gray-500">
                    개인사업자의 경우 금융사마다 정의가 달라요. 두 항목 모두 시도해보세요.
                </p>
            </div>

            <div className="grid grid-cols-4 gap-2">
                {[
                    { label: '기업고객 (법인)', value: false },
                    { label: '개인고객 (개인)', value: true },
                ].map((option, i) => {
                    const active = isPersonal === option.value;
                    return (
                        <div key={i}>
                            <button
                                onClick={() => setIsPersonal(option.value)}
                                className={`btn no-animation btn-animation gap-4 btn-block rounded-md justify-start font-normal ${active
                                    ? '!bg-indigo-50 !border-scordi'
                                    : '!bg-white border-gray-200 hover:border-scordi'
                                    }`}
                            >
                                <span
                                    className={`w-[10px] h-[10px] rounded-full outline outline-1 outline-offset-2 ${active
                                        ? 'bg-indigo-400 outline-indigo-500'
                                        : 'bg-slate-300  outline-slate-300'
                                        }`}
                                ></span>
                                <span>{option.label}</span>
                            </button>
                        </div>
                    );
                })}
            </div>
        </section>
    );
});

BusinessTypeSection.displayName = 'BusinessTypeSection';
