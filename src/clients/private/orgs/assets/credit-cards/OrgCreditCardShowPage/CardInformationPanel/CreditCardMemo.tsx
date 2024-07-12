import React, {memo} from 'react';
import {EditableColumnProps} from './EditableColumnProps.interface';
import TextareaAutosize from 'react-textarea-autosize';

export const CreditCardMemo = memo((props: EditableColumnProps<string>) => {
    const {value, defaultValue, onChange} = props;
    const {isEditMode, isLoading} = props;

    return (
        <div className="text-14 mb-4 flex items-start relative">
            {isEditMode ? (
                <TextareaAutosize
                    className={`-m-2 p-2 min-h-[33.5px] outline-0 block flex-auto bg-slate-100 border-b border-b-slate-300 ${
                        isLoading ? 'opacity-50 pointer-events-none' : ''
                    }`}
                    defaultValue={defaultValue}
                    placeholder="설명을 입력해주세요"
                    onChange={(e) => {
                        onChange(e.target.value.trim());
                    }}
                    style={{resize: 'none'}}
                />
            ) : (
                <div className="-m-2 p-2 min-h-[37px] outline-0 block flex-auto whitespace-pre-line">{value}</div>
            )}

            {!isEditMode && !value && (
                <div className="text-14 text-gray-300 absolute top-0 bottom-0 flex items-center">
                    설명을 입력해주세요
                </div>
            )}
        </div>
    );
});
