import React, {memo, useRef} from 'react';
import {eventCut} from '^utils/event';
import {ApiError, errorToast} from '^api/api';

interface InviteEmailInputProps {
    defaultValue: string;
    validate?: (value: string) => boolean | Promise<boolean>;
    onSubmit: (value: string) => any | Promise<any>;
    onRemove?: (value: string) => any;
    resetFocus?: () => any;
    isLoading?: boolean;
}

export const InviteEmailInput = memo((props: InviteEmailInputProps) => {
    const {defaultValue, validate, onSubmit, onRemove, resetFocus, isLoading = false} = props;
    const isEditMode = !!onRemove;
    const formRef = useRef<HTMLFormElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <form
            ref={formRef}
            onSubmit={async (e) => {
                eventCut(e);
                if (!inputRef.current) return;
                const email = inputRef.current.value;
                try {
                    if (validate) await validate(email);
                    inputRef.current.checkValidity();
                    inputRef.current.reportValidity();
                    if (!email) {
                        return;
                    } else {
                        if (!isEditMode) {
                            inputRef.current.value = '';
                            inputRef.current.focus();
                        }
                        await onSubmit(email); // add or update
                        resetFocus && resetFocus();
                    }
                } catch (e) {
                    errorToast(e as ApiError);
                }
            }}
        >
            <div className="grid grid-cols-4 border-b border-gray-200">
                <div className="col-span-3">
                    <input
                        ref={inputRef}
                        type="email"
                        defaultValue={defaultValue}
                        className="input rounded-none p-0 text-14 w-full focus:outline-0 disabled:bg-white disabled:border-none disabled:opacity-30"
                        placeholder={defaultValue || `이메일`}
                        disabled={isLoading}
                        onBlur={(e) => {
                            const input = e.target;
                            const email = input.value;
                            if (isEditMode) {
                                onSubmit(email);
                            }
                        }}
                        required
                    />
                </div>

                <div className="flex items-center justify-end">
                    <button
                        type={isEditMode ? 'button' : 'button'}
                        className={`btn btn-xs normal-case !bg-white !border-gray-300 !text-gray-500 !rounded-md shadow hover:shadow-lg ${
                            isLoading ? 'opacity-30 pointer-events-none' : ''
                        }`}
                        onClick={() => {
                            isEditMode ? onRemove(defaultValue) : formRef.current?.requestSubmit();
                        }}
                    >
                        {isEditMode ? '삭제' : '추가'}
                    </button>
                </div>
            </div>
        </form>
    );
});
