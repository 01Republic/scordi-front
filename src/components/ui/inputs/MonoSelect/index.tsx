import React, {useEffect, useState} from 'react';
import {enterToSpace} from '^components/util/keyDownLikeClick';
import {FaCaretDown, FaCheck} from 'react-icons/fa6';
import {SlideUpModal} from '^components/modals/_shared/SlideUpModal';
import {FaTimes} from 'react-icons/fa';
import {ModalLayoutProps} from '^components/modals/_shared/Modal.types';
import {ReactNodeElement, WithChildren} from '^types/global.type';
import {LoadableBox} from '^components/util/loading';
import {MonoSelectInput} from './MonoSelectInput';

interface MonoSelectProps<Option, Value> {
    id?: string;
    options?: Option[];
    isLoading?: boolean;
    defaultValue?: Value;
    onChange?: (selectedOption?: Option) => any;
    getLabel?: (option: Option) => ReactNodeElement;
    getValue?: (option: Option) => Value;
    OptionComponent?: (props: {option: Option}) => JSX.Element;
    modalTitle?: ReactNodeElement;
    placeholder?: ReactNodeElement;
    clearable?: boolean;
    size?: ModalLayoutProps['size'];
    minHeight?: string;
    maxHeight?: string;
    modalClassName?: string;
    scrollBoxHeight?: string;
    onModalShow?: () => any;
}

export const MonoSelect = <Option, Value>(props: MonoSelectProps<Option, Value> & WithChildren) => {
    const {
        id,
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
        size,
        minHeight,
        maxHeight,
        modalClassName = '',
        scrollBoxHeight = '',
        onModalShow,
    } = props;
    const [modalOpened, setModalOpened] = useState(false);
    const defaultOption = options.find((o) => getValue(o) === defaultValue);
    const [selectedOption, setSelectedOption] = useState(defaultOption);

    const unselectOption = () => {
        setSelectedOption(undefined);
        onChange();
    };

    useEffect(() => {
        if (modalOpened) {
            onModalShow && onModalShow();
        }
    }, [modalOpened]);

    return (
        <>
            <MonoSelectInput
                id={id}
                openModal={() => setModalOpened(true)}
                selectedOption={selectedOption}
                clearable={clearable}
                getLabel={getLabel}
                placeholder={placeholder}
                clearOption={unselectOption}
            />

            <SlideUpModal
                open={modalOpened}
                onClose={() => setModalOpened(false)}
                size={size}
                minHeight={minHeight}
                maxHeight={maxHeight}
                modalClassName={`${modalClassName}`}
            >
                {modalTitle && <h3 className="font-bold text-xl">{modalTitle}</h3>}

                <LoadableBox isLoading={isLoading} loadingType={2} spinnerPos="center" noPadding>
                    <div className="py-4 max-h-full">
                        <div
                            className="no-scrollbar overflow-auto -mx-4 px-4"
                            style={{
                                maxHeight: scrollBoxHeight,
                            }}
                        >
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
                    </div>
                </LoadableBox>

                {children}
            </SlideUpModal>
        </>
    );
};
MonoSelect.displayName = 'MonoSelect';
