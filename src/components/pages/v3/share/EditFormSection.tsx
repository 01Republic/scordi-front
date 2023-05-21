import {WithChildren} from '^types/global.type';
import React, {memo} from 'react';

interface EditFormSectionProps extends WithChildren {
    title: string;
    editMode: boolean;
    editButton?: {
        text?: string;
        onClick?: () => any;
    };
    onCancel?: () => any;
}

export const EditFormSection = memo((props: EditFormSectionProps) => {
    const {title, editMode, editButton = {}, onCancel, children} = props;

    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="flex justify-between">
                <p className="text-sm font-semibold">{title}</p>
                {editButton.onClick && !editMode && (
                    <a onClick={editButton.onClick} className="text-sm font-[500] no-underline link link-primary">
                        {editButton.text || '수정'}
                    </a>
                )}
            </div>

            <div className="flex flex-col gap-2 w-full">{children}</div>

            {editMode && (
                <div className="flex justify-end gap-3">
                    <button type="button" className="btn btn-link !no-underline" onClick={onCancel}>
                        취소
                    </button>
                    <button className="btn btn-scordi-500">저장하기</button>
                </div>
            )}
        </div>
    );
});
