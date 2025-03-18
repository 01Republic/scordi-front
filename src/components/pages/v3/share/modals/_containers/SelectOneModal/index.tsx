import React, {useEffect, useRef, useState} from 'react';
import {BottomUpModal, BottomUpModalProps} from '^v3/share/modals/_layouts/BottomUpModal';
import {ValueComponent} from '^v3/share/table/columns/SelectColumn/type';
import {Check} from 'lucide-react';

interface SelectOneModalProps<T> extends Omit<BottomUpModalProps, 'size' | 'children'> {
    title: string;
    size?: BottomUpModalProps['size'];
    getOptions: (keyword?: string) => T[] | Promise<T[]>;
    defaultValue: T | undefined;
    valueOfOption?: (option: T) => any;
    onSelect: (option: T) => any | Promise<any>;
    OptionComponent: ValueComponent<T, {selectedOption: T | null}>;
}

export const SelectOneModal = <T,>(props: SelectOneModalProps<T>) => {
    const {modalId, isShow, onClose, wrapperClassName, className} = props;
    const [options, setOptions] = useState<T[]>([]);
    const focusOriginRef = useRef<HTMLElement>();
    const focusRef = useRef<HTMLHeadingElement>(null);
    const {title, size = 'lg', getOptions, defaultValue, onSelect, OptionComponent, valueOfOption = (v) => v} = props;
    const selectedOption = defaultValue;

    useEffect(() => {
        if (isShow) {
            focusOriginRef.current = (document.activeElement as HTMLElement) || undefined;
            onOpen();
        }
    }, [isShow]);

    const onOpen = () => {
        setTimeout(() => focusRef.current?.focus(), 500);

        Promise.resolve(getOptions()).then(setOptions);
    };

    const clickOption = (option: T) => {
        return Promise.resolve(onSelect(option)).then(() => {
            setTimeout(() => focusOriginRef.current?.focus(), 500);
            onClose();
        });
    };

    return (
        <BottomUpModal
            modalId={modalId}
            size={size}
            isShow={isShow}
            onClose={onClose}
            wrapperClassName={wrapperClassName}
            className={className}
        >
            <div className="p-4 bg-scordi">
                <h3 ref={focusRef} tabIndex={0} className="font-bold text-lg text-white focus:outline-0">
                    {title}
                </h3>
            </div>

            <div className="pb-4 flex flex-col h-[50vh] overflow-y-auto no-scrollbar">
                <div className="flex-1 py-4 px-2 text-sm">
                    <ul>
                        {isShow &&
                            options.map((option, i) => {
                                const val = selectedOption ? valueOfOption(selectedOption) : selectedOption;
                                const isCurrent = valueOfOption(option) === val;

                                return (
                                    <li
                                        key={i}
                                        className="px-4 cursor-pointer group rounded-lg bg-white hover:bg-gray-300 hover:bg-opacity-30 active:bg-gray-200 focus:bg-gray-300 focus:bg-opacity-40 focus:outline-0 transition-all"
                                        tabIndex={0}
                                        onClick={() => clickOption(option)}
                                        onKeyDown={(e) => {
                                            const moveFocus = (index: number) => {
                                                const parent = e.target.parentElement;
                                                if (parent && parent.children) {
                                                    const target = parent.children[index] as HTMLElement;
                                                    if (target) target.focus();
                                                }
                                            };
                                            if (e.key == 'ArrowUp') moveFocus(i - 1);
                                            if (e.key == 'Enter') clickOption(option);
                                            if (e.key == 'ArrowDown') moveFocus(i + 1);
                                        }}
                                    >
                                        <div className="flex items-center text-inherit gap-2">
                                            <div className="flex-1">
                                                <OptionComponent
                                                    value={option}
                                                    selectedOption={selectedOption || null}
                                                />
                                            </div>
                                            <div>{isCurrent && <Check size={18} />}</div>
                                        </div>
                                    </li>
                                );
                            })}
                    </ul>
                </div>
            </div>

            {/* 하나를 선택하는 것이기 때문에, 옵션을 선택하면 굳이 확인버튼을 한 번 더 클릭 할 이유가 없다. */}
            {/*<div className="p-4 bg-white">*/}
            {/*    <button*/}
            {/*        // disabled={selectedIds.length < 1}*/}
            {/*        className="btn btn-lg btn-scordi btn-block rounded-box disabled:border-indigo-100 disabled:bg-indigo-100 disabled:text-indigo-300"*/}
            {/*        onClick={() => onClick()}*/}
            {/*    >*/}
            {/*        선택하기*/}
            {/*    </button>*/}
            {/*</div>*/}
        </BottomUpModal>
    );
};
SelectOneModal.displayName = 'SelectOneModal';
