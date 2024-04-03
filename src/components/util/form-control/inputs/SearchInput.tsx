import React, {memo} from 'react';
import {FaSearch} from 'react-icons/fa';

interface SearchInputProps
    extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'className'> {
    scale?: 'xs' | 'sm' | 'md' | 'lg';
    bordered?: boolean;
}

export const SearchInput = memo((props: SearchInputProps) => {
    const {bordered = true, scale = 'md', ...attrs} = props;

    let iconSize;
    let paddingScale;
    switch (scale) {
        case 'xs':
            iconSize = 12;
            paddingScale = '25px';
            break;
        case 'sm':
            iconSize = 14;
            paddingScale = '30px';
            break;
        case 'md':
            iconSize = 16;
            paddingScale = '34px';
            break;
        case 'lg':
            iconSize = 20;
            paddingScale = '44px';
            break;
        default:
            iconSize = 16;
            paddingScale = '34px';
            break;
    }

    return (
        <div className="relative">
            <div className={`absolute top-0 bottom-0 w-[${paddingScale}] flex items-center justify-center`}>
                <FaSearch size={iconSize} className="text-gray-500" />
            </div>

            <input
                className={`input ${bordered ? 'input-bordered' : ''} input-${scale} pl-[${paddingScale}]`}
                {...attrs}
            />
        </div>
    );
});
SearchInput.displayName = 'SearchInput';
