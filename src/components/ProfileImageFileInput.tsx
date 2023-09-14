import React, {ChangeEventHandler, ForwardedRef, forwardRef, InputHTMLAttributes, useEffect, useState} from 'react';
import {useId} from 'react-id-generator';

interface ProfileImageFileInputProps extends InputHTMLAttributes<any> {
    imageUrl: string | undefined;
    fallbackLetter: string;
}

export const ProfileImageFileInput = forwardRef((props: ProfileImageFileInputProps, ref: ForwardedRef<any>) => {
    const {imageUrl, fallbackLetter, onChange, className = '', style = {}, ...form} = props;
    const [url, setUrl] = useState(imageUrl);
    const [isHover, setHovered] = useState(false);
    const [id] = useId(1, 'profileImageInput');

    useEffect(() => {
        setUrl(imageUrl);
    }, [imageUrl]);

    const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
        const uploadedFile = e.target.files![0];
        const tempUrl = (window.URL || window.webkitURL).createObjectURL(uploadedFile);
        setUrl(tempUrl);
        if (onChange) onChange(e);
    };

    const resetHandler = () => {
        const input = document.getElementById(id) as HTMLInputElement;
        // @ts-ignore
        input.value = null;
        setUrl(undefined);
    };

    return (
        <div className="relative w-fit">
            {url && !props.disabled && (
                <button
                    type="button"
                    className="btn btn-xs btn-error btn-circle text-xs text-white absolute"
                    style={{
                        left: 'calc(100% - 13px)',
                        top: '-10px',
                        zIndex: '1',
                    }}
                    onClick={resetHandler}
                >
                    X
                </button>
            )}
            <label
                htmlFor={id}
                onMouseOver={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="flex cursor-pointer"
            >
                {url ? (
                    <div className="avatar inline-flex">
                        <div className={`min-w-24 border rounded ${className}`} style={style}>
                            <img src={url} />
                        </div>
                    </div>
                ) : (
                    <div className="avatar inline-flex placeholder">
                        <div className="min-w-24 rounded bg-neutral-focus text-neutral-content">
                            <span className="text-2xl font-bold">{fallbackLetter}</span>
                        </div>
                    </div>
                )}
                {!props.disabled && (
                    <div
                        className={`${
                            isHover ? '' : 'hidden'
                        } absolute bottom-0 w-full h-fit bg-[#00000080] rounded-b text-center text-white font-bold flex items-center justify-center py-1`}
                    >
                        <span className="text-xs">Change</span>
                    </div>
                )}
            </label>

            <input
                id={id}
                type="file"
                ref={ref}
                className="hidden"
                accept="image/*"
                {...form}
                onChange={onChangeHandler}
            />
        </div>
    );
});
