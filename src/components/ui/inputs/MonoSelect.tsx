import React, {useState} from 'react';
import {enterToSpace} from '^components/util/keyDownLikeClick';
import {FaCaretDown, FaCheck} from 'react-icons/fa6';
import {SlideUpModal} from '^components/modals/_shared/SlideUpModal';
import {ReactNodeLike} from 'prop-types';
import {FaTimes} from 'react-icons/fa';
import {ModalLayoutProps} from '^components/modals/_shared/Modal.types';
import {WithChildren} from '^types/global.type';
import {LoadableBox} from '^components/util/loading';

interface MonoSelectProps<Option, Value> {
    options?: Option[];
    isLoading?: boolean;
    defaultValue?: Value;
    onChange?: (selectedOption?: Option) => any;
    getLabel?: (option: Option) => ReactNodeLike;
    getValue?: (option: Option) => Value;
    OptionComponent?: (props: {option: Option}) => JSX.Element;
    modalTitle?: ReactNodeLike;
    placeholder?: ReactNodeLike;
    clearable?: boolean;
    minHeight?: string;
    maxHeight?: string;
    size?: ModalLayoutProps['size'];
}

export const MonoSelect = <Option, Value>(props: MonoSelectProps<Option, Value> & WithChildren) => {
    const {
        children,
        options = [],
        isLoading = false,
        defaultValue,
        onChange = console.log,
        OptionComponent,
        getLabel = (v) => <>{v}</>,
        getValue = (v) => v,
        modalTitle,
        placeholder,
        clearable = false,
        minHeight,
        maxHeight,
        size,
    } = props;
    const [modalOpened, setModalOpened] = useState(false);
    const defaultOption = options.find((o) => getValue(o) === defaultValue);
    const [selectedOption, setSelectedOption] = useState(defaultOption);

    const unselectOption = () => {
        setSelectedOption(undefined);
        onChange();
    };

    return (
        <>
            <div
                tabIndex={0}
                className="input border-gray-200 w-full bg-gray-100 text-16 flex items-center justify-between cursor-pointer"
                onKeyDown={enterToSpace(() => setModalOpened(true))}
                onClick={() => setModalOpened(true)}
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
                                unselectOption();
                                e.stopPropagation();
                                e.preventDefault();
                            }}
                        />
                    )}
                    <FaCaretDown size={14} className="text-gray-400" />
                </div>
            </div>

            <SlideUpModal
                open={modalOpened}
                onClose={() => setModalOpened(false)}
                minHeight={minHeight}
                maxHeight={maxHeight}
                size={size}
            >
                {modalTitle && <h3 className="font-bold text-xl">{modalTitle}</h3>}

                <LoadableBox isLoading={isLoading} loadingType={2} spinnerPos="center" noPadding>
                    <div className="py-4 max-h-full no-scrollbar">
                        {options.map((option, i) => {
                            const selectOption = () => {
                                setSelectedOption(option);
                                onChange(option);
                                setModalOpened(false);
                            };

                            const isSelected = !!selectedOption && getValue(selectedOption) === getValue(option);

                            const onClick = () => {
                                if (clearable) {
                                    isSelected ? unselectOption() : selectOption();
                                } else {
                                    selectOption();
                                }
                            };

                            return (
                                <div
                                    tabIndex={0}
                                    key={i}
                                    className="-mx-4 px-4 py-2.5 cursor-pointer group hover:bg-gray-100 flex items-center justify-between rounded-box btn-animation"
                                    onKeyDown={enterToSpace(onClick)}
                                    onClick={onClick}
                                >
                                    <div>
                                        {OptionComponent ? (
                                            <OptionComponent option={option} />
                                        ) : (
                                            <p className="font-medium text-16">{getLabel && getLabel(option)}</p>
                                        )}
                                    </div>

                                    <div>{isSelected && <FaCheck className="text-scordi" />}</div>
                                </div>
                            );
                        })}
                    </div>
                </LoadableBox>
                {children}
            </SlideUpModal>
        </>
    );
};
MonoSelect.displayName = 'MonoSelect';
