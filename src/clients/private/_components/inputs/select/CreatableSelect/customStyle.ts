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

export const customStyle2: StylesConfig<Option, false> = {
    loadingMessage: () => ({display: 'none'}),
    loadingIndicator: () => ({display: 'none'}),
    noOptionsMessage: () => ({display: 'none'}),
    container: (base) => ({
        ...base,
        padding: 0,
    }),
    indicatorSeparator: () => ({display: 'none'}),
    indicatorsContainer: (base) => ({
        ...base,
        padding: 0,
    }),
    control: (base) => ({
        ...base,
        height: '100%',
        minHeight: 'auto',
        minWidth: '143px',
        border: 'none',
        borderRadius: 'inherit',
        '&:hover': {},
        '& > div:first-child': {
            padding: '0 8px',
            '& > div:first-child[data-value]': {
                margin: 0,
                padding: 0,
            },
        },
        '& > div:last-child > div': {
            padding: '0 3px 0 0',
        },
    }),

    placeholder: (base) => ({
        ...base,
        '& + div': {
            margin: 0,
            padding: 0,
        },
    }),

    menu: (base) => ({
        ...base,
        width: 'auto',
        minWidth: '100%',
    }),

    menuList: (base) => ({
        ...base,
        width: 'auto',
        minWidth: '100%',
    }),

    option: (base) => ({
        ...base,
        padding: '0 4px',
        background: 'inherit !important',
        color: 'initial',
        '&:hover': {
            background: '#fefefe !important',
        },
        width: 'auto',
        minWidth: '100%',
    }),

    singleValue: (base) => ({
        ...base,
        '& + div': {
            margin: 0,
            padding: 0,
        },
    }),
};
