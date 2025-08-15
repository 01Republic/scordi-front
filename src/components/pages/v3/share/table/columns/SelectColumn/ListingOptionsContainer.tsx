import {memo} from 'react';
import {Loading} from '^v3/share/Loading';
import {OptionItem} from '^v3/share/table/columns/SelectColumn/OptionItem';
import {CreatableItem} from '^v3/share/table/columns/SelectColumn/CreatableItem';
import {ValueComponent} from './type';
import {ContainerHeader} from '^v3/share/table/columns/SelectColumn/ContainerHeader';
import {ContainerBody} from '^v3/share/table/columns/SelectColumn/ContainerBody';
import {BankAccountDto} from '^models/BankAccount/type';
import {CreditCardDto} from '^models/CreditCard/type';

interface ListingOptionsContainerProps<T> {
    value: T | undefined;
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

export const ListingOptionsContainer = <T,>(props: ListingOptionsContainerProps<T>) => {
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
                {options.map((option, i) => {
                    const beforeOption: T | undefined = options[i - 1];
                    // @ts-ignore
                    const isDifferentType = !!beforeOption && beforeOption.constructor !== option.constructor;
                    const isCreditCard = option instanceof CreditCardDto;
                    const isBankAccount = option instanceof BankAccountDto;
                    const isFirstChild = i === 0;

                    return (
                        <div key={i}>
                            {isDifferentType && <hr className={'my-3'} />}
                            {(isFirstChild || isDifferentType) && (
                                <ContainerHeader
                                    title={isCreditCard ? '카드' : isBankAccount ? '계좌' : ''}
                                    className={'mb-1'}
                                />
                            )}
                            <OptionItem
                                key={i}
                                option={option}
                                selectedOption={value}
                                clickOption={clickOption}
                                ValueComponent={ValueComponent}
                                valueOfOption={valueOfOption}
                                className={optionWrapperClass}
                                destroyRequest={destroyOption}
                            />
                        </div>
                    );
                })}

                {onCreate && searchKeyword && !options.find((o) => keywordFilter(o, searchKeyword)) && (
                    <CreatableItem onClick={() => createOption(searchKeyword)}>
                        <ValueComponent value={searchKeyword} />
                    </CreatableItem>
                )}
            </ContainerBody>
        </>
    );
};
ListingOptionsContainer.displayName = 'ListingOptionsContainer';
