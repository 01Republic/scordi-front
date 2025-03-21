import {memo, useRef, useState} from 'react';
import {ValueComponent} from '^v3/share/table/columns/SelectColumn/type';
import {Placement} from '@popperjs/core';
import {useInput} from '^v3/share/table/columns/SelectColumn/useInput';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {DropdownContent} from '^v3/share/Dropdown';
import {InputContainer} from '^v3/share/table/columns/SelectColumn/InputContainer';
import {MultiListingOptionsContainer} from '^clients/private/_components/table/columns/MultiSelectColumn/MultiListingOptionsContainer';
import {MultiSelectedOpitonsContainer} from '^clients/private/_components/table/columns/MultiSelectColumn/MultiSelectedOpitonsContainer';

interface MultiSelectColumnProps<T> {
    value: T[] | undefined;
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

    // 트리거 버튼의 가로길이
    fullWidth?: boolean;

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

    // 옵션 연결 해제를 요청합니다. (옵션이 관계형 데이터일때)
    optionDetach?: (option: T) => Promise<boolean>;

    detachableOptionBoxTitle?: string;

    // 옵션 삭제를 요청합니다. (옵션이 관계형 데이터일때)
    optionDestroy?: (option: T) => false | Promise<boolean>;
}

export const MultiSelectColumn = <T,>(props: MultiSelectColumnProps<T>) => {
    const triggerRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    const openDropdown = () => setVisible(true);
    const closeDropdown = () => setVisible(false);

    const {searchKeyword, setSearchKeyword, searchInputRef, clearInput, focusInput, blurInput} = useInput();
    const [focusableIndex, setFocusableIndex] = useState<number>(0);
    const [options, setOptions] = useState<T[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const {
        value,
        ValueComponent = (p: {value: T | string}) => <TagUI>{`${p.value}`}</TagUI>,
        EmptyComponent = () => <TagUI className="text-gray-300 !px-0">비어있음</TagUI>,
        getOptions,
        valueOfOption = (v) => v,
        textOfOption = (v) => `${v}`,
        onSelect,
        onCreate,
        optionDetach,
        optionDestroy,
    } = props;

    const selectedValues = value || [];
    const isEmptyValue = selectedValues.length === 0;

    const keywordFilter = props.keywordFilter || ((o: T, keyword: string) => valueOfOption(o) === keyword);
    const {
        fullWidth = true,
        inputDisplay = true,
        inputPlainText = false,
        contentMinWidth = '300px',
        optionListBoxTitle = `옵션 선택${props.onCreate ? ' 또는 생성' : ''}`,
        optionWrapperClass = '',
        detachableOptionBoxTitle = '연결된 옵션',
    } = props;

    const fetchOptions = (keyword?: string) => {
        setIsLoading(true);
        return getOptions(keyword)
            .then(setOptions)
            .finally(() => setIsLoading(false));
    };

    const refreshOptions = () => {
        clearInput();
        fetchOptions();
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

    const listingOptions = options.filter((option) => {
        if (!selectedValues || selectedValues.length === 0) return true;
        return !selectedValues.some((selected) => valueOfOption(selected) === valueOfOption(option));
    });

    const selectedValue = selectedValues.map((item) => item);

    const renderTriggerValue = () => {
        if (isEmptyValue) return <EmptyComponent />;
        return (
            <div className="cursor-pointer flex py-[6px]">
                {selectedValues.length > 1 ? (
                    <>
                        <ValueComponent key={valueOfOption(selectedValues[0])} value={selectedValues[0]} />
                        <p>&nbsp;{` 외 ${selectedValues.length - 1}`}</p>
                    </>
                ) : (
                    <>
                        {selectedValues.map((item) => (
                            <ValueComponent key={valueOfOption(item)} value={item} />
                        ))}
                    </>
                )}
            </div>
        );
    };

    return (
        <div
            className={`dropdown relative ${fullWidth ? 'w-full' : ''}`}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}
        >
            <div onClick={() => onOpen()} ref={triggerRef} tabIndex={0} className="cursor-pointer flex py-[6px]">
                {renderTriggerValue()}
            </div>

            <DropdownContent
                visible={visible}
                hide={() => onClose()}
                triggerRef={triggerRef}
                backdrop
                allowScroll
                placement="bottom-start"
            >
                <div
                    style={{maxWidth: contentMinWidth, left: '-8px'}}
                    tabIndex={0}
                    className={`dropdown-portal-content w-full min-w-[${contentMinWidth}] !z-[1] border shadow-lg bg-base-100 rounded-[6px] relative`}
                >
                    {/* Search Result Value List Container */}
                    <div className="py-[6px]">
                        <MultiSelectedOpitonsContainer
                            selectedOptions={selectedValues}
                            ValueComponent={ValueComponent}
                            detachOption={withCallback(optionDetach)!}
                            boxTitle={detachableOptionBoxTitle}
                            optionWrapperClass={optionWrapperClass}
                        />

                        <MultiListingOptionsContainer
                            value={selectedValues}
                            options={listingOptions}
                            onSelect={onSelect}
                            ValueComponent={ValueComponent}
                            isLoading={isLoading}
                            valueOfOption={valueOfOption}
                            searchKeyword={searchKeyword}
                            keywordFilter={keywordFilter}
                            onCreate={onCreate}
                            destroyOption={withCallback(optionDestroy)}
                            boxTitle={optionListBoxTitle}
                            optionWrapperClass={optionWrapperClass}
                            dropdownHandler={{
                                blurInput,
                                refreshOptions,
                                closeDropdown,
                            }}
                        />
                    </div>
                </div>
            </DropdownContent>
        </div>
    );
};
MultiSelectColumn.displayName = 'MultiSelectColumn';
