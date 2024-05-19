import React, {memo} from 'react';
import {enterToSpace} from '^components/util/keyDownLikeClick';
import {FaTimes} from 'react-icons/fa';
import {FaCaretDown} from 'react-icons/fa6';
import {ReactNodeLike} from 'prop-types';

interface MonoSelectInputProps<Option> {
    id?: string;
    openModal?: () => any;
    selectedOption?: Option;
    clearable?: boolean;
    getLabel?: (option: Option) => ReactNodeLike;
    placeholder?: ReactNodeLike;
    clearOption?: () => any;
}

export const MonoSelectInput = <Option,>(props: MonoSelectInputProps<Option>) => {
    const {
        id,
        openModal,
        clearable = false,
        selectedOption,
        getLabel = (v) => <>{v}</>,
        placeholder,
        clearOption,
    } = props;

    return (
        <div
            id={id}
            tabIndex={0}
            className="input border-gray-200 w-full bg-gray-100 text-16 flex items-center justify-between cursor-pointer"
            onKeyDown={enterToSpace(() => openModal && openModal())}
            onClick={() => openModal && openModal()}
        >
            {!selectedOption && placeholder ? (
                <div className="text-gray-400">{placeholder}</div>
            ) : (
                <div>{selectedOption && getLabel(selectedOption)}</div>
            )}

            <div className="flex items-center gap-4">
                {selectedOption && clearable && (
                    <FaTimes
                        size={16}
                        className="cursor-pointer text-gray-400 hover:text-gray-800 transition-all"
                        onClick={(e) => {
                            clearOption && clearOption();
                            e.stopPropagation();
                            e.preventDefault();
                        }}
                    />
                )}
                <FaCaretDown size={14} className="text-gray-400" />
            </div>
        </div>
    );
};
MonoSelectInput.displayName = 'MonoSelectInput';
