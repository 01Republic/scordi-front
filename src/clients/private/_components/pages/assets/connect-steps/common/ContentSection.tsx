import React, {memo} from 'react';
import {Loader} from 'lucide-react';

interface ContentSectionProps {
    text: string;
    handleSelectAll?: () => void;
    isAllSelected: boolean;
    isLoading: boolean;
    children?: React.ReactNode;
}

export const ContentSection = memo((props: ContentSectionProps) => {
    const {text, handleSelectAll, isAllSelected, isLoading, children} = props;
    return (
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
            {isLoading ? (
                <div className="flex items-center justify-center h-20">
                    <Loader className="animate-spin size-6" />
                </div>
            ) : (
                <>{children}</>
            )}
        </section>
    );
});
