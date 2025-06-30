import React, {useState, ReactNode, memo, InputHTMLAttributes} from 'react';
import {useFormContext, FieldValues, Path, RegisterOptions} from 'react-hook-form';
import cn from 'classnames';
import {Dot, TriangleAlert, Eye, EyeOff} from 'lucide-react';

interface FormInputProps<TForm extends FieldValues> {
    name: Path<TForm>;
    label: string;
    icon: ReactNode;
    type: React.HTMLInputTypeAttribute;
    validation?: RegisterOptions<TForm, Path<TForm>>;
    showTogglePassword?: boolean;
    autoComplete: string;
}

function FormInputInner<TForm extends FieldValues = FieldValues>(props: FormInputProps<TForm>) {
    const {name, label, icon, type = 'text', autoComplete, validation, showTogglePassword = false} = props;

    const [isActive, setIsActive] = useState(false);
    const [showPwd, setShowPwd] = useState(false);

    const {
        register,
        watch,
        formState: {errors},
    } = useFormContext<TForm>();

    const value = watch(name) as string | undefined;
    const {onBlur, onChange, ...rest} = register(name, validation);
    const hasError = Boolean(errors[name]);

    return (
        <>
            <label htmlFor={label} className="block relative">
                <div className="relative">
                    <input
                        type={type === 'password' && showPwd ? 'text' : type}
                        autoComplete={autoComplete}
                        value={value || ''}
                        onClick={() => setIsActive(true)}
                        onFocus={() => setIsActive(true)}
                        onBlur={(e) => {
                            onBlur(e);
                            if (!value) setIsActive(false);
                        }}
                        onChange={onChange}
                        {...rest}
                        className={cn(
                            'w-full bg-white h-14 border text-sm text-gray-900 rounded-lg pl-12 pr-5 pt-3 focus:outline focus:outline-1',
                            {
                                'border-red-400 focus:outline-red-400': hasError,
                                'border-gray-300 focus:outline-primaryColor-900': !hasError,
                            },
                        )}
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">{icon}</div>
                    <div
                        className={cn(
                            'absolute flex pl-12 left-0 pointer-events-none transition duration-700 ease text-gray-400',
                            isActive || value ? 'flex-col top-1 text-xs' : 'items-center inset-y-0 text-14',
                        )}
                    >
                        <span className="flex items-center justify-center">
                            {label}
                            <Dot className={cn('text-[#f57453] text-lg', isActive || value ? 'hidden' : 'flex')} />
                        </span>
                    </div>
                    {showTogglePassword && (isActive || value) && (
                        <button
                            type="button"
                            tabIndex={-1}
                            className="absolute pr-5 inset-y-0 right-0"
                            onClick={() => setShowPwd((prev) => !prev)}
                        >
                            {showPwd ? <Eye /> : <EyeOff />}
                        </button>
                    )}
                </div>
            </label>
            {hasError && (
                <section className="flex gap-1 text-red-400 w-full justify-start -mt-1">
                    <TriangleAlert className="text-red-400" />
                    <p className="font-normal text-12">{(errors[name]?.message as string) || 'Invalid field'}</p>
                </section>
            )}
        </>
    );
}

export const FormInput = memo(FormInputInner) as <TForm extends FieldValues>(
    props: FormInputProps<TForm>,
) => JSX.Element;
