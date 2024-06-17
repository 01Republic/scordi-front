import {StylesConfig} from 'react-select';
import {Option} from '^components/util/react-select';

export const customStyle: StylesConfig<Option, false> = {
    loadingMessage: () => ({display: 'none'}),
    loadingIndicator: () => ({display: 'none'}),
    noOptionsMessage: () => ({display: 'none'}),
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
