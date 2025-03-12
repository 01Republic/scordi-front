import {OptionItem} from '^v3/share/table/columns/SelectColumn/OptionItem';
import {CreatableItem} from '^v3/share/table/columns/SelectColumn/CreatableItem';
import {ContainerHeader} from '^v3/share/table/columns/SelectColumn/ContainerHeader';
import {ContainerBody} from '^v3/share/table/columns/SelectColumn/ContainerBody';
import {ValueComponent} from '^v3/share/table/columns/SelectColumn/type';
import {MultiOptionItem} from '^clients/private/_components/table/columns/MultiSelectColumn/MultiOptionItem';

interface MultiListingOptionsContainerProps<T> {
    value: T[] | undefined;
    options: T[];
    onSelect: (option: T) => Promise<any>;
    ValueComponent: ValueComponent<T>;
    isLoading: boolean;
    valueOfOption: (option: T) => any;

    searchKeyword: string;

    // 드롭다운 Content 상단 Input 에서, 검색어 입력시 매칭되는 옵션을 찾는 방법을 지정합니다.
    keywordFilter: (option: T, keyword: string) => boolean;

    // 옵션 생성을 요청합니다. (옵션이 관계형 데이터일때)
    onCreate?: (keyword: string) => Promise<any>;

    // 옵션 삭제를 요청합니다. (옵션이 관계형 데이터일때)
    destroyOption?: (option: T) => Promise<boolean>;

    // 컨테이너 상단 안내 문구
    boxTitle?: string;

    // 옵션의 클래스를 지정합니다.
    optionWrapperClass?: string;

    // Dropdown handlers
    dropdownHandler: {
        blurInput: () => any;
        refreshOptions: () => any;
        closeDropdown: () => any;
    };
}

export const MultiListingOptionsContainer = <T,>(props: MultiListingOptionsContainerProps<T>) => {
    const {
        value,
        options,
        onSelect,
        ValueComponent,
        isLoading,
        valueOfOption,

        searchKeyword,
        keywordFilter,

        onCreate,
        destroyOption,

        boxTitle = '옵션 선택 또는 생성',
        optionWrapperClass = '',

        dropdownHandler,
    } = props;

    const {blurInput, refreshOptions, closeDropdown} = dropdownHandler;

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

    return (
        <>
            <ContainerHeader title={boxTitle} className="mb-[8px]" />

            <ContainerBody entries={options} isLoading={isLoading}>
                {options.map((option, i) => (
                    <MultiOptionItem
                        key={i}
                        option={option}
                        selectedOption={value}
                        clickOption={clickOption}
                        ValueComponent={ValueComponent}
                        valueOfOption={valueOfOption}
                        className={optionWrapperClass}
                        destroyRequest={destroyOption}
                    />
                ))}

                {onCreate && searchKeyword && !options.find((o) => keywordFilter(o, searchKeyword)) && (
                    <CreatableItem onClick={() => createOption(searchKeyword)}>
                        <ValueComponent value={searchKeyword} />
                    </CreatableItem>
                )}
            </ContainerBody>
        </>
    );
};
MultiListingOptionsContainer.displayName = 'MultiListingOptionsContainer';
