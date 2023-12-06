import {ForwardedRef, forwardRef, InputHTMLAttributes} from 'react';
import {useRecoilValue} from 'recoil';
import {ReactNodeLike} from 'prop-types';
import {isTeamMemberEditModeAtom} from '^v3/V3OrgTeam/modals/TeamMemberShowModal';

interface MobileTeamMemberInfoInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: ReactNodeLike;
    defaultValue?: string;
}
export const MobileTeamMemberInfoInput = forwardRef((props: MobileTeamMemberInfoInputProps, ref: ForwardedRef<any>) => {
    const isEditable = useRecoilValue(isTeamMemberEditModeAtom);
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
    className?: string;
}

export const EditTriggeredInput = forwardRef((props: EditableInputProps, ref: ForwardedRef<any>) => {
    const isEditable = useRecoilValue(isTeamMemberEditModeAtom);
    const border = isEditable ? 'input-bordered border-b-2' : 'input-ghost border-none';

    return (
        <>
            <input className={`${border} ${props.className}`} type="text" ref={ref} {...props} disabled={!isEditable} />
        </>
    );
});
