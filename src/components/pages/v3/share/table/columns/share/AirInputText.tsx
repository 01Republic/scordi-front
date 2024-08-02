import {memo, useRef, useState} from 'react';
import {Spinner} from '^components/util/loading';
import {FaCheck} from 'react-icons/fa6';
import {FaTimes} from 'react-icons/fa';
import {delay} from '^components/util/delay';

interface AirInputTextProps {
    defaultValue?: string;
    onChange?: (value: string) => Promise<any>;
    placeholder?: string;
}

export const AirInputText = memo((props: AirInputTextProps) => {
    const {defaultValue = '', onChange, placeholder = '입력해주세요..'} = props;
    const [isEditMode, setIsEditMode] = useState(false);
    const [inProgress, setInProgress] = useState(0);

    const onSubmit = async (value: string) => {
        setInProgress(1); // ing
        const request = Promise.resolve(onChange && onChange(value));

        return request
            .then(() => {
                setInProgress(0); // success
            })
            .catch(() => {
                setInProgress(3); // failed
            });
    };

    return (
        <div className="relative">
            {isEditMode ? (
                <>
                    <input
                        type="text"
                        className="input px-1.5 py-1 rounded-md w-auto input-sm input-ghost h-[32px] leading-[32px] inline-flex items-center bg-slate-100 focus:outline-1 focus:outline-offset-0"
                        defaultValue={defaultValue}
                        onBlur={(e) => {
                            setIsEditMode(false);
                            defaultValue !== e.target.value && onSubmit(e.target.value);
                        }}
                        onKeyUp={(e) => {
                            if (e.key === 'Enter') {
                                return onSubmit(e.target.value);
                            }
                        }}
                        autoFocus={true}
                        placeholder={placeholder}
                    />
                    <div className="absolute -right-4 top-0 bottom-0 flex items-center justify-center">
                        {inProgress === 1 && <Spinner />}
                        {inProgress === 2 && <FaCheck className="text-green-500" />}
                        {inProgress === 3 && <FaTimes className="text-red-500" />}
                    </div>
                </>
            ) : (
                <div
                    className="group px-1.5 py-1 rounded-md w-inherit input-sm input-ghost h-[32px] leading-[32px] inline-flex items-center border-transparent border outline-transparent hover:bg-slate-100 transition-all cursor-pointer"
                    onClick={() => setIsEditMode(true)}
                >
                    {
                        <span
                            className={`min-w-[150px] ${
                                defaultValue ? '' : 'text-gray-300 group-hover:text-gray-400 transition-all'
                            }`}
                        >
                            {defaultValue || placeholder}
                        </span>
                    }
                </div>
            )}
        </div>
    );
});
AirInputText.displayName = 'AirInputText';
