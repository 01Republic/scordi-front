import React, {memo, useEffect, useRef} from 'react';
import {useForm} from 'react-hook-form';
import {CreateTeamMemberDto} from '^models/TeamMember';
import {debounce} from 'lodash';

interface CreateTeamMemberFormProps {
    defaultValues?: CreateTeamMemberDto;
    onEnter: (dto: CreateTeamMemberDto) => any;
    onRemove?: () => any;
}

export const CreateTeamMemberForm = memo((props: CreateTeamMemberFormProps) => {
    const {defaultValues, onEnter, onRemove} = props;
    const isEditForm = !!onRemove;
    const form = useForm<CreateTeamMemberDto>();
    const formRef = useRef<HTMLFormElement | null>(null);
    const nameInputRef = useRef<HTMLInputElement | null>(null);
    const nameInput = form.register('name', {required: true});
    const emailInput = form.register('email', {required: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/});

    useEffect(() => {
        if (defaultValues) {
            form.reset(defaultValues);
        }
    }, [defaultValues]);

    const resetForm = () => {
        form.reset();
        nameInputRef.current?.focus();
    };

    const submit = debounce(async (dto: CreateTeamMemberDto) => {
        const isValid = await form.trigger();
        if (isValid) {
            console.log('dto', dto);
            onEnter(dto);
            if (!isEditForm) resetForm();
        }
    }, 500);

    return (
        <form
            ref={formRef}
            onSubmit={form.handleSubmit(submit)}
            onKeyUp={(e) => {
                if (e.keyCode == 13) formRef.current?.requestSubmit();
            }}
        >
            <div className="grid grid-cols-5 border-b border-gray-200">
                <div className="col-span-2">
                    <input
                        type="text"
                        placeholder="이름"
                        className="input rounded-none p-0 text-14 w-full focus:outline-0"
                        {...nameInput}
                        required
                        ref={(e) => {
                            nameInput.ref(e);
                            nameInputRef.current = e;
                        }}
                        onChange={async (e) => {
                            await nameInput.onChange(e);
                            await form.trigger('name');
                            if (isEditForm) formRef.current?.requestSubmit();
                        }}
                    />
                </div>
                <div className="col-span-2">
                    <input
                        type="email"
                        placeholder="이메일"
                        className={`input rounded-none p-0 text-14 w-full focus:outline-0 ${
                            form.formState.errors.email ? 'text-red-500' : ''
                        }`}
                        {...emailInput}
                        required
                        onChange={async (e) => {
                            await emailInput.onChange(e);
                            await form.trigger('email');
                            if (isEditForm) formRef.current?.requestSubmit();
                        }}
                    />
                </div>
                {isEditForm ? (
                    <div className="flex items-center justify-end">
                        <button
                            type="button"
                            className="btn btn-xs normal-case !bg-white !border-gray-300 !text-gray-500 !rounded-md shadow hover:shadow-lg"
                            onClick={onRemove}
                        >
                            삭제
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center justify-end">
                        <button
                            type="button"
                            className="btn btn-xs normal-case !bg-white !border-gray-300 !text-gray-500 !rounded-md shadow hover:shadow-lg"
                            onClick={() => formRef.current?.requestSubmit()}
                        >
                            확인
                        </button>
                    </div>
                )}
            </div>
        </form>
    );
});
CreateTeamMemberForm.displayName = 'CreateTeamMemberForm';
