import React, {Dispatch, memo, SetStateAction} from 'react';
import {FaPen} from '@react-icons/all-files/fa/FaPen';

interface EditButtonProps {
    isEditMode: boolean;
    setIsEditMode: Dispatch<SetStateAction<boolean>>;
    onSubmit: () => any;
}

export const EditButton = memo((props: EditButtonProps) => {
    const {isEditMode, setIsEditMode, onSubmit} = props;

    return (
        <div className="flex items-center gap-2">
            {!isEditMode ? (
                <button
                    onClick={() => setIsEditMode(true)}
                    className="btn btn-xs border-transparent bg-transparent text-gray-500 hover:bg-gray-100 hover:border-gray-100 hover:text-black gap-1.5"
                >
                    <FaPen fontSize={10} />
                    <span>수정</span>
                </button>
            ) : (
                <>
                    <button onClick={() => setIsEditMode(false)} className="btn btn-xs btn-link no-underline">
                        취소
                    </button>

                    <button onClick={onSubmit} className="btn btn-xs btn-scordi">
                        저장
                    </button>
                </>
            )}
        </div>
    );
});
EditButton.displayName = 'EditButton';
