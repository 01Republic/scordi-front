import {ReactNodeLike} from 'prop-types';
import {ForwardedRef, forwardRef, InputHTMLAttributes, memo, useEffect, useState} from 'react';
import {atom, useRecoilState, useRecoilValue} from 'recoil';

interface MobileTeamMemberInfoInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: ReactNodeLike;
    defaultValue?: string;
}
export const MobileTeamMemberInfoInput = forwardRef((props: MobileTeamMemberInfoInputProps, ref: ForwardedRef<any>) => {
    const {label, defaultValue} = props;
    const isEditable = useRecoilValue(isTeamMemberInfoEditableAtom);
    const border = isEditable ? 'border-none' : 'border-b-1';

    return (
        <div className="grid grid-cols-10 py-2">
            <label className="col-span-3">
                <span className="text-[16px]">{label}</span>
            </label>
            <input
                className={`col-span-5 col-start-6 input-ghost bg-white font-bold ${border} text-right`}
                type="text"
                defaultValue={defaultValue}
                ref={ref}
                {...props}
                disabled={!isEditable}
            />
        </div>
    );
});

interface EditableInputProps extends InputHTMLAttributes<HTMLInputElement> {
    defaultValue?: string;
    className?: string;
}

export const EditTriggeredInput = forwardRef((props: EditableInputProps, ref: ForwardedRef<any>) => {
    const {defaultValue, className} = props;
    const isEditable = useRecoilValue(isTeamMemberInfoEditableAtom);
    const onEdit = isEditable ? 'input-bordered border-b-2 border-slate-100' : 'border-none';

    return (
        <>
            <input
                className={`input-ghost bg-white ${onEdit} ${className}`}
                type="text"
                defaultValue={defaultValue}
                ref={ref}
                {...props}
                disabled={!isEditable}
            />
        </>
    );
});

export const isTeamMemberInfoEditableAtom = atom<boolean>({
    key: 'isTeamMemberInfoEditableAtom',
    default: false,
});

interface TriggerButtonProps {
    onClick: () => void;
}

export const EditTriggerButton = (props: TriggerButtonProps) => {
    const {onClick} = props;
    const [isEditable, setIsEditable] = useRecoilState(isTeamMemberInfoEditableAtom);
    const text = isEditable ? '완료 /' : '수정 /';

    return (
        <button
            onClick={() => {
                setIsEditable((editable) => !editable);
                !isEditable && onClick();
            }}
        >
            {text}
        </button>
    );
};

export const DeleteTriggerButton = (props: TriggerButtonProps) => {
    const {onClick} = props;
    return <button onClick={() => onClick()}> 삭제</button>;
};
