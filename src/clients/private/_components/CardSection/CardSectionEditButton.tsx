import React, {memo} from 'react';

interface CardSectionEditButtonProps {
    isEditMode: boolean;
    setIsEditMode: (isEditMode: boolean) => void;
    isButtonText?: boolean;
}

export const CardSectionEditButton = memo((props: CardSectionEditButtonProps) => {
    const {isEditMode, setIsEditMode, isButtonText = false} = props;
    return (
        <div className="absolute right-0 top-0 px-8 py-8 flex items-center gap-4">
            <a className="link text-14" onClick={() => setIsEditMode(!isEditMode)}>
                {isEditMode ? '취소' : isButtonText ? '추가' : '수정'}
            </a>

            {isEditMode && <button className="btn btn-sm btn-scordi">저장</button>}
        </div>
    );
});
