import {useState} from 'react';
import {Option} from '^components/util/select/MultiSelect';
import {ActionMeta, MultiValue, StylesConfig} from 'react-select';

/**
 * defaultLoader handles the case when MultiSelect is rendered.
 * MultiSelect calls loader with empty input.
 * If the case is not handled, there is no option to select.
 *
 * If filter is provided, MultiSelect loads options
 * from defaultOptions fetched by defaultLoader.
 */
interface UseMultiSelectParams {
    mapper: (data: any) => Option;
    defaultLoader: () => Promise<any[]>;
    loader: (input: string) => Promise<any[]>;
    filter?: (option: Option, input: string) => boolean;
    onChangeCallbacks: {
        onCreate?: (option: Option) => void;
        onSelect?: (option: Option) => void;
        onRemove?: (option: Option) => void;
        onClear?: () => void;
    };
    style?: StylesConfig<Option>;
}

export function useMultiSelect(params: UseMultiSelectParams) {
    const {mapper, filter, defaultLoader, loader, onChangeCallbacks, style} = params;
    const [defaultOptions, setDefaultOptions] = useState<Option[]>([]);

    const loadOptions = async (input: string) => {
        if (input.length === 0) {
            return defaultLoader().then((data) => {
                const options = data.map(mapper);
                setDefaultOptions(options);
                return options;
            });
        }

        if (filter) {
            return new Promise<Option[]>((resolve) =>
                resolve(defaultOptions.filter((option) => filter(option, input))),
            );
        }

        return loader(input).then((data) => data.map(mapper));
    };

    const onChange = async (options: MultiValue<Option>, actionType?: ActionMeta<Option>) => {
        const {onCreate, onSelect, onRemove, onClear} = onChangeCallbacks;

        switch (actionType?.action) {
            case 'create-option':
                if (!onCreate) break;
                const newOption = actionType.option;
                if (!newOption.__isNew__) return;

                await onCreate(newOption);
                break;

            case 'select-option':
                if (!onSelect) break;

                const selectedOption = actionType.option;
                if (!selectedOption) return;

                onSelect(selectedOption);
                break;

            case 'remove-value':
                if (!onRemove) break;

                const {removedValue} = actionType;
                if (!removedValue) return;

                onRemove(removedValue);
                break;

            case 'clear':
                if (!onClear) break;

                const {removedValues} = actionType;
                if (removedValues.length > 0) onClear();

                break;

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

    return {loadOptions, onChange, style: style ?? defaultStyle, mapper};
}
