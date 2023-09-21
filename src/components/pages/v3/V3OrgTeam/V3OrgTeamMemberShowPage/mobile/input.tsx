import {ReactNodeLike} from 'prop-types';
import {ForwardedRef, forwardRef, InputHTMLAttributes, memo, useEffect, useState} from 'react';
import {BiSolidPencil} from 'react-icons/bi';

interface MobileInfoInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: ReactNodeLike;
    defaultValue?: string;
}
export const MobileInfoInputList = forwardRef((props: MobileInfoInputProps, ref: ForwardedRef<any>) => {
    const {label, defaultValue} = props;
    const [isEditable, setIsEditable] = useState(false);

    return (
        <div className="grid grid-cols-12 gap-0.5 w-full py-1">
            {label && (
                <label className="col-span-3">
                    <span className="text-[16px]">{label}</span>
                </label>
            )}
            <input
                className="col-span-6 col-start-6 bg-white font-bold text-right"
                type="text"
                ref={ref}
                defaultValue={defaultValue}
                {...props}
                disabled={!isEditable}
            />
            <button onClick={(e) => setIsEditable((editable) => !editable)}>
                <BiSolidPencil className="col-span-1 content-center justify-center" />
            </button>
        </div>
    );
});

interface EditableInputProps extends InputHTMLAttributes<HTMLInputElement> {
    defaultValue?: string;
    className?: string;
}

export const OnClickEditInput = forwardRef((props: EditableInputProps, ref: ForwardedRef<any>) => {
    const {defaultValue, className} = props;
    const [isEditable, setIsEditable] = useState(false);

    useEffect(() => {
        console.log(isEditable);
    }, [isEditable]);

    return (
        <>
            <input
                className={`bg-white ${className}`}
                type="text"
                ref={ref}
                defaultValue={defaultValue}
                {...props}
                disabled={!isEditable}
            />
        </>
    );
});
