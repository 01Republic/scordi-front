import {useMemo, useState} from 'react';
import {ActionMeta, SingleValue, StylesConfig} from 'react-select';
import AsyncCreatableSelect from 'react-select/async-creatable';
import {BasicOption} from '^components/util/react-select/Option';

interface CreatableSelectProps<Option extends BasicOption> {
    toOption: (value: any) => Option;
    loader: (inputValue?: string) => Promise<any[]>;
    onChangeCallbacks: {
        onCreate?: (option: Option) => void;
        onSelect?: (option: Option) => void;
        onRemove?: () => void;
        onClear?: () => void;
        selectOnCreate?: boolean;
    };
    style?: StylesConfig<Option>;
    // 적용방법 모르는 옵션들 (10.28)
    defaultOptions?: Option[];
    defaultValue?: Option;
}

export const CreatableSelect = <Option extends BasicOption>(props: CreatableSelectProps<Option>) => {
    const {toOption, loader, onChangeCallbacks, style} = props;
    const [defaultOptions, setDefaultOptions] = useState<Option[]>([]);
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);

    const value = useMemo(() => selectedOption, [selectedOption]);
    const loadOptions = async (inputValue?: string) => {
        return loader(inputValue).then((data) => {
            const options = data.map(toOption);
            setDefaultOptions(options);
            return options;
        });
    };

    const onChange = (option: SingleValue<Option>, actionType: ActionMeta<Option>) => {
        console.log('onChange option: ', option);
        const {onCreate, onSelect, onRemove, onClear, selectOnCreate = true} = onChangeCallbacks;

        switch (actionType.action) {
            case 'create-option':
                const newOption = actionType.option;
                if (!newOption || !newOption.__isNew__) return;

                onCreate && onCreate(newOption);
                setDefaultOptions((prev) => [...prev, newOption]);

                if (selectOnCreate) {
                    setSelectedOption(newOption);
                    onSelect && onSelect(newOption);
                }

                break;

            case 'select-option':
                const selectedOption = actionType.option;
                if (!selectedOption) return;

                setSelectedOption(selectedOption);
                onSelect && onSelect(selectedOption);

                break;

            case 'remove-value':
                setSelectedOption(null);
                onRemove && onRemove();

                break;

            case 'clear':
                setSelectedOption(null);
                onClear && onClear();

                break;

            // case 'deselect-option':
            // case 'pop-value':
            default:
                break;
        }
    };

    const defaultStyle: StylesConfig<Option> = {
        control: (styles) => ({
            ...styles,
            backgroundColor: 'rgb(248 250 252 / 1)',
            borderColor: 'rgb(241 245 249 / 1)',
            height: '3rem',
            borderWidth: '1px',
        }),
    };

    return (
        <AsyncCreatableSelect
            isMulti={false}
            cacheOptions
            defaultOptions={defaultOptions ?? true}
            defaultValue={props.defaultValue}
            value={value}
            loadOptions={loadOptions}
            onChange={onChange}
            isClearable={true}
            backspaceRemovesValue={true}
            styles={style ?? defaultStyle}
        />
    );
};
