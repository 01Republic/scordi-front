import {memo, ReactNode} from 'react';
import {LoadableBox} from '^components/util/loading';

interface ContentSectionProps {
    text: ReactNode;
    handleSelectAll?: () => void;
    isAllSelected?: boolean;
    isLoading?: boolean;
    children?: ReactNode;
}

export const ContentSection = memo((props: ContentSectionProps) => {
    const {text, handleSelectAll, isAllSelected = false, isLoading = false, children} = props;
    return (
        <section className="flex flex-col gap-5 ">
            <div className="flex items-center justify-between">
                <span className="text-xl text-gray-900 font-semibold">{text}</span>

                {handleSelectAll && (
                    <button
                        type="button"
                        onClick={handleSelectAll}
                        className="text-scordi cursor-pointer text-base hover:underline "
                    >
                        {isAllSelected ? '선택취소' : '전체선택'}
                    </button>
                )}
            </div>

            <LoadableBox
                isLoading={isLoading}
                loadingType={2}
                noPadding
                spinnerPos="center"
                loadingClass="animate-pulse"
            >
                {children}
            </LoadableBox>
        </section>
    );
});
