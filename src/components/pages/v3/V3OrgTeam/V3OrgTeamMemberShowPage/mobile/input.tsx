import {ReactNodeLike} from 'prop-types';
import {ForwardedRef, forwardRef, InputHTMLAttributes} from 'react';
import {atom, useRecoilState, useRecoilValue} from 'recoil';

interface MobileTeamMemberInfoInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: ReactNodeLike;
    defaultValue?: string;
}
export const MobileTeamMemberInfoInput = forwardRef((props: MobileTeamMemberInfoInputProps, ref: ForwardedRef<any>) => {
    const isEditable = useRecoilValue(isTeamMemberInfoEditableAtom);
    const border = isEditable ? 'input-bordered border-b-2' : 'input-ghost border-none';

    return (
        <div className="grid grid-cols-10 py-2">
            <label className="col-span-3">
                <span className="text-[16px]">{props.label}</span>
            </label>
            <input
                className={`col-span-5 col-start-6 bg-white font-bold ${border} text-right`}
                type="text"
                ref={ref}
                {...props}
                disabled={!isEditable}
            />
        </div>
    );
});

interface EditableInputProps extends InputHTMLAttributes<HTMLInputElement> {
    defaultValue?: string;
    inputClassName?: string;
}

export const EditTriggeredInput = forwardRef((props: EditableInputProps, ref: ForwardedRef<any>) => {
    const isEditable = useRecoilValue(isTeamMemberInfoEditableAtom);
    const border = isEditable ? 'input-bordered border-b-2' : 'input-ghost border-none';

    return (
        <>
            <input
                className={`bg-white ${border} ${props.inputClassName}`}
                type="text"
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
    const text = isEditable ? '완료' : '수정';

    return (
        <button
            onClick={(event) => {
                event.preventDefault();
                // 수정 가능한 상태였다면 onClick 이벤트 실행
                isEditable && onClick();
                // 다시 수정 불가능한 상태로 변경
                setIsEditable((editable) => !editable);
            }}
        >
            {text}
        </button>
    );
};

export const DeleteTriggerButton = (props: TriggerButtonProps) => {
    const {onClick} = props;
    return (
        <button
            onClick={(event) => {
                event.preventDefault();
                onClick();
            }}
        >
            삭제
        </button>
    );
};
