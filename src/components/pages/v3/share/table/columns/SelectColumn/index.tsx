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
import {Portal} from '^components/util/Partal';

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

    // inputPlainText 이 true 일 때에만 사용됩니다.
    textOfOption?: (option: T) => string;
    contentMinWidth?: string;
    optionListBoxTitle?: string;

    // 드롭다운의 기본 방향 설정
    placement?: Placement;

    // 드롭다운 Content 상단에서 Input 을 노출 여부 (기본값: true)
    inputDisplay?: boolean;

    // 드롭다운 Content 상단 Input 에서, UI 를 입히지 않고 Plain 텍스트만 취급 (기본값: false)
    inputPlainText?: boolean;

    // 드롭다운 Content 상단 Input 에서, 검색어 입력시 매칭되는 옵션을 찾는 방법을 지정합니다.
    keywordFilter?: (option: T, keyword: string) => boolean;

    // 드롭다운 Content 내 옵션의 클래스를 지정합니다.
    optionWrapperClass?: string;

    // 옵션 삭제를 요청합니다. (옵션이 관계형 데이터일때)
    optionDestroyRequest?: (option: T) => false | Promise<boolean>;
}

export const SelectColumn = <T,>(props: SelectColumnProps<T>) => {
    const {searchKeyword, setSearchKeyword, searchInputRef, clearInput, focusInput, blurInput} = useInput();
    const {dropdownId, openDropdown, closeDropdown, setTriggerRef, setContentRef, backdropRef, styles, attributes} =
        useDropdown(props.placement || 'bottom-start');

    const [focusableIndex, setFocusableIndex] = useState<number>(0);
    const [options, setOptions] = useState<T[]>([]);
    const {
        value,
        ValueComponent = (p: {value: T | string}) => <TagUI>{`${p.value}`}</TagUI>,
        EmptyComponent = () => <TagUI className="text-gray-300 !px-0">비어있음</TagUI>,
        getOptions,
        valueOfOption = (v) => v,
        textOfOption = (v) => `${v}`,
        onSelect,
        onCreate,
        optionDestroyRequest,
    } = props;
    const keywordFilter = props.keywordFilter || ((o: T, keyword: string) => valueOfOption(o) === keyword);
    const {
        inputDisplay = true,
        inputPlainText = false,
        contentMinWidth = '300px',
        optionListBoxTitle = '옵션 선택 또는 생성',
        optionWrapperClass = '',
    } = props;

    const refreshOptions = () => {
        clearInput();
        getOptions().then(setOptions);
    };

    const onOpen = () => {
        openDropdown();
        focusInput();
        refreshOptions();
    };

    const onClose = () => {
        blurInput();
        closeDropdown();
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

    const withCallback = (actionFn?: (option: T) => false | Promise<boolean>) => {
        // 입력받지 않은 기능함수는,
        // 이 함수로 감싸더라도 undefined 를 그대로 반환해줍니다.
        if (!actionFn) return undefined;

        // 속성으로 입력받은 기능함수라면,
        // 함수를 한 번 감싸서 콜백 함수까지 함께 실행되도록 기능을 보충한뒤 반환해줍니다. (mocking)
        return (option: T) => {
            return Promise.resolve(actionFn(option)).then((isSuccess) => {
                if (isSuccess) refreshOptions();
                return isSuccess;
            });
        };
    };

    // const ValueUI = ValueComponent || ((p: {value: T | string}) => <TagUI>{`${p.value}`}</TagUI>);
    const isEmptyValue = typeof value == 'undefined' || value === null;

    return (
        <div className="dropdown relative w-full" data-dropdown-id={dropdownId}>
            <div
                data-dropdown-target={dropdownId}
                onClick={() => onOpen()}
                ref={setTriggerRef}
                tabIndex={0}
                className="cursor-pointer flex py-[6px] px-[8px]"
            >
                {!isEmptyValue ? <ValueComponent value={value} /> : <EmptyComponent />}
            </div>

            <Portal>
                <div ref={backdropRef} className="dropdown-backdrop" onClick={() => onClose()} />
                <div
                    data-dropdown-content={dropdownId}
                    ref={setContentRef}
                    style={{
                        ...styles.popper,
                        maxWidth: contentMinWidth,
                    }}
                    {...attributes.popper}
                    tabIndex={0}
                    className={`dropdown-portal-content w-full min-w-[${contentMinWidth}] !z-[1] border shadow-lg bg-base-100 rounded-[6px]`}
                >
                    {/* Search Keyword Input Container */}
                    {inputDisplay && (
                        <InputContainer
                            data-dropdown-target={dropdownId}
                            inputRef={searchInputRef}
                            defaultValue={value && inputPlainText ? textOfOption(value) : undefined}
                            onChange={(keyword) => {
                                setSearchKeyword(keyword || '');
                                getOptions(keyword).then(setOptions);
                            }}
                        >
                            {value && !inputPlainText && <ValueComponent value={value} />}
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
                                    className={optionWrapperClass}
                                    destroyRequest={withCallback(optionDestroyRequest)}
                                />
                            ))}

                            {onCreate && searchKeyword && !options.find((o) => keywordFilter(o, searchKeyword)) && (
                                <CreatableItem onClick={() => createOption(searchKeyword)}>
                                    <ValueComponent value={searchKeyword} />
                                </CreatableItem>
                            )}
                        </ul>
                    </div>
                </div>
            </Portal>
        </div>
    );
};
SelectColumn.displayName = 'SelectColumn';
