import React, {memo} from 'react';
import {enterToSpace} from '^components/util/keyDownLikeClick';
import {ReactNodeElement} from '^types/global.type';
import {ChevronDown, X} from 'lucide-react';

interface MonoSelectInputProps<Option> {
    id?: string;
    openModal?: () => any;
    selectedOption?: Option;
    clearable?: boolean;
    getLabel?: (option: Option) => ReactNodeElement;
    placeholder?: ReactNodeElement;
    clearOption?: () => any;
    readonly?: boolean;
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
        readonly = false,
    } = props;

    return (
        <div
            id={id}
            tabIndex={0}
            className="input border-gray-200 w-full bg-gray-100 text-16 flex items-center justify-between cursor-pointer"
            onKeyDown={enterToSpace(() => openModal && openModal())}
            onClick={() => !readonly && openModal && openModal()}
        >
            {!selectedOption && placeholder ? (
                <div className="text-gray-400">{placeholder}</div>
            ) : (
                <div>{selectedOption && getLabel(selectedOption)}</div>
            )}

            <div className="flex items-center gap-4">
                {selectedOption && clearable && (
                    <X
                        size={16}
                        className="cursor-pointer text-gray-400 hover:text-gray-800 transition-all"
                        onClick={(e) => {
                            clearOption && clearOption();
                            e.stopPropagation();
                            e.preventDefault();
                        }}
                    />
                )}
                <ChevronDown size={14} className="text-gray-400" />
            </div>
        </div>
    );
};
MonoSelectInput.displayName = 'MonoSelectInput';
