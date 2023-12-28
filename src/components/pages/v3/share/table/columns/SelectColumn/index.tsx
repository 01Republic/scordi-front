import {MemoExoticComponent, useEffect, useRef, useState} from 'react';
import {useDropdown} from '^hooks/useDropdown';
import {FcCheckmark} from 'react-icons/fc';
import {Placement} from '@popperjs/core';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {InputContainer} from './InputContainer';
import {CreatableItem} from './CreatableItem';
import {useInput} from '^v3/share/table/columns/SelectColumn/useInput';
import {OptionItem} from '^v3/share/table/columns/SelectColumn/OptionItem';
import {ValueComponent} from './type';

interface SelectColumnProps<T> {
    value: T | undefined;
    getOptions: (keyword?: string) => Promise<T[]>;
    onSelect: (option: T) => Promise<any>;
    onCreate?: (keyword: string) => Promise<any>;
    ValueComponent?: ValueComponent<T>;

    // 옵션 중 기존의 값이 없을 때
    // 드롭다운 Trigger 에서 보여 줄 기본 UI
    // (기본값: "비어있음")
    EmptyComponent?: () => JSX.Element;

    valueOfOption?: (option: T) => any;
    contentMinWidth?: string;
    optionListBoxTitle?: string;

    // 드롭다운의 기본 방향 설정
    placement?: Placement;

    // 드롭다운 Content 상단에서 Input 을 노출 여부 (기본값: true)
    inputDisplay?: boolean;
}

export const SelectColumn = <T,>(props: SelectColumnProps<T>) => {
    const {searchKeyword, setSearchKeyword, searchInputRef, clearInput, focusInput, blurInput} = useInput();
    const {openDropdown, closeDropdown, triggerRef, contentRef, styles, attributes} = useDropdown(
        props.placement || 'bottom-start',
    );

    const [focusableIndex, setFocusableIndex] = useState<number>(0);
    const [options, setOptions] = useState<T[]>([]);
    const {
        value,
        ValueComponent = (p: {value: T | string}) => <TagUI>{`${p.value}`}</TagUI>,
        EmptyComponent = () => <TagUI className="text-gray-300 !px-0">비어있음</TagUI>,
        getOptions,
        valueOfOption = (v) => v,
        onSelect,
        onCreate,
    } = props;
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

    // const ValueUI = ValueComponent || ((p: {value: T | string}) => <TagUI>{`${p.value}`}</TagUI>);

    return (
        <div className="dropdown relative w-full">
            <div
                onFocus={() => onOpen()}
                ref={triggerRef}
                tabIndex={0}
                className="cursor-pointer flex py-[6px] px-[8px]"
            >
                {value ? <ValueComponent value={value} /> : <EmptyComponent />}
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
                        {value && <ValueComponent value={value} />}
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
                        {options.map((option, i) => (
                            <OptionItem
                                key={i}
                                option={option}
                                selectedOption={value}
                                clickOption={clickOption}
                                ValueComponent={ValueComponent}
                                valueOfOption={valueOfOption}
                            />
                        ))}

                        {onCreate && searchKeyword && !options.find((o) => valueOfOption(o) === searchKeyword) && (
                            <CreatableItem onClick={() => createOption(searchKeyword)}>
                                <ValueComponent value={searchKeyword} />
                            </CreatableItem>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};
SelectColumn.displayName = 'SelectColumn';
