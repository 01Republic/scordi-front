import React, {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {Loader} from 'lucide-react';

interface ContentSectionProps extends WithChildren {
    text: string;
    handleSelectAll?: () => void;
    isAllSelected: boolean;
    isLoading: boolean;
}

export const ContentSection = memo((props: ContentSectionProps) => {
    const {text, handleSelectAll, isAllSelected, isLoading, children} = props;
    return (
        <>
            {isLoading ? (
                <div className=" min-h-5">
                    <div className="animate-spin">
                        <Loader />
                    </div>
                </div>
            ) : (
                <section className="flex flex-col gap-5 ">
                    <div className="flex items-center justify-between">
                        <span className="text-xl text-gray-900 font-semibold">{text}</span>

                        <button
                            type="button"
                            onClick={handleSelectAll}
                            className="text-scordi cursor-pointer text-base hover:underline "
                        >
                            {isAllSelected ? '선택취소' : '전체선택'}
                        </button>
                    </div>

                    {children}
                </section>
            )}
        </>
    );
});
