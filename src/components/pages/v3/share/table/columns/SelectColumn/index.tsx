import {MemoExoticComponent, useEffect, useRef, useState} from 'react';
import {useDropdown} from '^hooks/useDropdown';
import {FcCheckmark} from 'react-icons/fc';
import {Placement} from '@popperjs/core';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {InputContainer} from './InputContainer';
import {CreatableItem} from './CreatableItem';
import {useInput} from '^v3/share/table/columns/SelectColumn/useInput';

type Component<T> = (props: {value: T | string}) => JSX.Element;
type ValueComponent<T> = Component<T> | MemoExoticComponent<Component<T>>;

interface SelectColumnProps<T> {
    value: T | undefined;
    getOptions: (keyword?: string) => Promise<T[]>;
    onSelect: (option: T) => Promise<any>;
    onCreate?: (keyword: string) => Promise<any>;
    ValueComponent?: ValueComponent<T>;
    valueOfOption?: (option: T) => any;
    contentMinWidth?: string;
    optionListBoxTitle?: string;
    placement?: Placement;
    inputDisplay?: boolean;
}

export const SelectColumn = <T,>(props: SelectColumnProps<T>) => {
    const {searchKeyword, setSearchKeyword, searchInputRef, clearInput, focusInput, blurInput} = useInput();
    const {openDropdown, closeDropdown, triggerRef, contentRef, styles, attributes} = useDropdown(
        props.placement || 'bottom-start',
    );

    const [focusableIndex, setFocusableIndex] = useState<number>(0);
    const [options, setOptions] = useState<T[]>([]);
    const {value, ValueComponent, getOptions, valueOfOption = (v) => v, onSelect, onCreate} = props;
    const {inputDisplay = true, contentMinWidth = '300px', optionListBoxTitle = '옵션 선택 또는 생성'} = props;

    const refreshOptions = () => {
        clearInput();
        getOptions().then(setOptions);
    };

    const onOpen = () => {
        // openDropdown();
        focusInput();
        refreshOptions();
    };

    const clickOption = async (option: T) => {
        await onSelect(option);
        blurInput();
        refreshOptions();
        closeDropdown();
    };

    const createOption = async (keyword: string) => {
        if (!onCreate) return; // check creatable
        await onCreate(keyword);
        blurInput();
        refreshOptions();
        closeDropdown();
    };

    const ValueUI = ValueComponent || ((p: {value: T | string}) => <TagUI>{`${p.value}`}</TagUI>);

    return (
        <div className="dropdown relative w-full">
            <div
                onFocus={() => onOpen()}
                ref={triggerRef}
                tabIndex={0}
                className="cursor-pointer flex py-[6px] px-[8px]"
            >
                {value ? <ValueUI value={value} /> : <div className="h-[20px] w-full inline-block" />}
            </div>

            <div
                ref={contentRef}
                style={styles.popper}
                {...attributes.popper}
                tabIndex={0}
                className={`dropdown-content w-full min-w-[${contentMinWidth}] !z-[1] border shadow-lg bg-base-100 rounded-[6px]`}
            >
                {/* Search Keyword Input Container */}
                {inputDisplay && (
                    <InputContainer
                        inputRef={searchInputRef}
                        onChange={(keyword) => {
                            setSearchKeyword(keyword || '');
                            getOptions(keyword).then(setOptions);
                        }}
                    >
                        {value && <ValueUI value={value} />}
                    </InputContainer>
                )}

                {/* Search Result Value List Container */}
                <div className="py-[6px]">
                    <div
                        className="flex px-[14px] mt-[6px] mb-[8px] text-[12px] font-[500] no-selectable leading-[120%]"
                        style={{
                            color: 'rgba(55, 53, 47, 0.65)',
                            fill: 'rgba(55, 53, 47, 0.45)',
                        }}
                    >
                        <div className="overflow-hidden whitespace-nowrap" style={{textOverflow: 'ellipsis'}}>
                            {optionListBoxTitle}
                        </div>
                    </div>
                    <ul className="menu py-0 block max-h-[300px] overflow-y-auto no-scrollbar">
                        {options.map((option, i) => {
                            const val = value ? valueOfOption(value) : value;
                            const isCurrent = valueOfOption(option) === val;
                            return (
                                <li
                                    key={i}
                                    onClick={() => clickOption(option)}
                                    className="cursor-pointer flex px-[4px] group"
                                    data-focusable="true"
                                >
                                    <div
                                        className={`flex rounded-[4px] items-center pt-[2px] px-[10px] pb-0 min-h-[28px] ${
                                            !isCurrent
                                                ? 'group-hover:bg-gray-300 group-hover:bg-opacity-30'
                                                : '!bg-opacity-0'
                                        }`}
                                    >
                                        <ValueUI key={i} value={option} />
                                        <div className="ml-auto">{isCurrent && <FcCheckmark />}</div>
                                    </div>
                                </li>
                            );
                        })}

                        {onCreate && searchKeyword && !options.find((o) => valueOfOption(o) === searchKeyword) && (
                            <CreatableItem onClick={() => createOption(searchKeyword)}>
                                <ValueUI value={searchKeyword} />
                            </CreatableItem>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};
SelectColumn.displayName = 'SelectColumn';
