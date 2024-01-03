import {useMemo, useState} from 'react';
import {ActionMeta, SingleValue, StylesConfig} from 'react-select';
import AsyncCreatableSelect from 'react-select/async-creatable';
import {BasicOption} from '^components/util/react-select/Option';

interface CreatableSelectProps<Option extends BasicOption> {
    toOption: (value: any) => Option;
    loader: (inputValue?: string) => Promise<any[]>;
    defaultOptions?: Option[];
    onChangeCallbacks: {
        onCreate?: (option: Option) => void;
        onSelect?: (option: Option) => void;
        onRemove?: () => void;
        onClear?: () => void;
        selectOnCreate?: boolean;
    };
    style?: StylesConfig<Option, false>;
    // 적용방법 모르는 옵션들 (10.28)
    defaultValue?: Option;
}

export const CreatableSelect = <Option extends BasicOption>(props: CreatableSelectProps<Option>) => {
    const {toOption, loader, defaultOptions, onChangeCallbacks, style} = props;
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);

    const value = useMemo(() => selectedOption, [selectedOption]);

    const loadOptions = async (inputValue?: string) => {
        return loader(inputValue).then((data) => data.map(toOption));
    };

    const onChange = (option: SingleValue<Option>, actionType: ActionMeta<Option>) => {
        const {onCreate, onSelect, onRemove, onClear, selectOnCreate = true} = onChangeCallbacks;

        switch (actionType.action) {
            case 'create-option':
                if (!option || !option.__isNew__) return;

                onCreate && onCreate(option);
                // setDefaultOptions((prev) => [...prev, option]);/

                if (selectOnCreate) {
                    setSelectedOption(option);
                    onSelect && onSelect(option);
                }

                break;

            case 'select-option':
                if (!option) return;

                setSelectedOption(option);
                onSelect && onSelect(option);

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

    const defaultStyle: StylesConfig<Option, false> = {
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
            onChange={(newVal, actionMeta) => onChange(newVal, actionMeta)}
            isClearable={true}
            backspaceRemovesValue={true}
            styles={style ?? defaultStyle}
        />
    );
};
