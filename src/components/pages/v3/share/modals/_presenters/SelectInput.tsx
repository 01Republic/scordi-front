import {memo, ReactNode} from 'react';
import Select, {GroupBase, components, StylesConfig} from 'react-select';
import {SelectComponentsConfig} from 'react-select/dist/declarations/src/components';
import {OptionProps} from 'react-select/dist/declarations/src/components/Option';
import {WithChildren} from '^types/global.type';
import CreatableSelect from 'react-select/creatable';
import {MoreDropdownInSelectTeam} from '^v3/share/modals/_presenters/MoreDropdownInSelectTeam';

interface SelectInputProps<Option> {
    options: Option[];
    defaultValue?: Option;
    onSelect: (selectedOption?: Option) => any;
    onMenuOpen?: () => any;
    components?: SelectComponentsConfig<Option, false, GroupBase<Option>>;

    placeholder?: string;
    required?: boolean;
    autoFocus?: boolean;
    noOptionsMessage?: (obj: {inputValue: string}) => ReactNode;
    openMenuOnFocus?: boolean;
    closeMenuOnSelect?: boolean;
}

export const SelectInput = <Option,>(props: SelectInputProps<Option>) => {
    const {options, components, onSelect, onMenuOpen, defaultValue} = props;
    const {
        placeholder = '선택해주세요...',
        required = false,
        autoFocus,
        noOptionsMessage = () => <p>결과를 찾을 수 없습니다 :(</p>,
        openMenuOnFocus = true,
        closeMenuOnSelect = true,
    } = props;

    const customStyles: StylesConfig<Option, false> = {
        control: (base) => ({
            ...base,
            height: '100%',
            border: 'none',
            borderRadius: 'inherit',
            '&:hover': {},
        }),
        option: (base) => ({
            ...base,
            padding: 0,
            background: 'inherit !important',
            color: 'initial',
            '&:hover': {},
        }),
    };

    return (
        // 새로운 팀 추가 위해 기존 Select 컴포넌트에서
        // CreatableSelect 컴포넌트로 변경

        <CreatableSelect
            components={components}
            options={options}
            defaultValue={defaultValue}
            placeholder={placeholder}
            styles={customStyles}
            className="input input-bordered px-0"
            onMenuOpen={onMenuOpen}
            onChange={(option) => (option ? onSelect(option) : onSelect())}
            required={required}
            autoFocus={autoFocus}
            noOptionsMessage={noOptionsMessage}
            openMenuOnFocus={openMenuOnFocus}
            closeMenuOnSelect={closeMenuOnSelect}
            isClearable
        />
    );
};
SelectInput.displayName = 'SelectInput';

/**
 * SelectOption 컴포넌트 프리셋
 */
export interface SelectOptionProps<Option> extends OptionProps<Option, false> {}
type d = Pick<SelectOptionProps<any>, 'isFocused' | 'isSelected'>;
export const SelectOptionNotionStyledLayout = memo((props: SelectOptionProps<any> & WithChildren) => {
    const {isFocused, isSelected, children, data} = props;

    return (
        <components.Option {...props}>
            <div className="px-[8px]">
                <div
                    className={`flex items-center py-1.5 px-2 rounded-md cursor-pointer transition-all btn-animation ${
                        isFocused ? 'bg-gray-100' : ''
                    } hover:bg-gray-100 active:bg-sky-100 group`}
                >
                    <div className="">{children}</div>
                    <div className="ml-auto">
                        <MoreDropdownInSelectTeam isCurrent={isSelected} data={data} />
                    </div>
                </div>
            </div>
        </components.Option>
    );

    // return (
    //     <div className="px-[8px]">
    //         <div
    //             className={`flex items-center py-1.5 px-2 rounded-md cursor-pointer transition-all btn-animation ${
    //                 isFocused ? 'bg-gray-100' : ''
    //             } hover:bg-gray-100`}
    //         >
    //             <div className="">{children}</div>
    //             <div className="ml-auto px-2">{isSelected && <FcCheckmark />}</div>
    //         </div>
    //     </div>
    // );
});
