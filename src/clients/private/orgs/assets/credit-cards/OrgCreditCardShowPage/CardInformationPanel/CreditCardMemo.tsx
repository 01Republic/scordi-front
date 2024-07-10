import React, {memo} from 'react';
import {FormControl} from './FormControl';
import {EditableColumnProps} from './EditableColumnProps.interface';

export const CreditCardMemo = memo((props: EditableColumnProps<string>) => {
    const {value, defaultValue, onChange} = props;
    const {isEditMode, isLoading} = props;

    return (
        <FormControl label="비고">
            {isEditMode ? (
                <input
                    className={`input input-sm input-underline !bg-slate-100 w-full ${
                        isLoading ? 'opacity-50 pointer-events-none' : ''
                    }`}
                    defaultValue={defaultValue}
                    onChange={(e) => onChange(e.target.value)}
                    readOnly={isLoading}
                />
            ) : (
                <div className="flex items-center min-h-[33.5px]">
                    <span className="w-full whitespace-nowrap overflow-hidden text-ellipsis">{value}</span>
                </div>
            )}
            <span />
        </FormControl>
    );
});
