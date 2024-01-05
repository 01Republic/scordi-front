import {useRef, useState} from 'react';

export const useInput = () => {
    const [searchKeyword, setSearchKeyword] = useState('');
    const searchInputRef = useRef<HTMLInputElement>(null);

    const clearInput = () => {
        if (!searchInputRef.current) return;
        searchInputRef.current.value = '';
        setSearchKeyword('');
    };

    const focusInput = () => {
        setTimeout(() => {
            if (searchInputRef.current) searchInputRef.current.focus();
        }, 200);
    };

    const blurInput = () => {
        if (!searchInputRef.current) return;
        searchInputRef.current.blur();
    };

    return {
        searchKeyword,
        setSearchKeyword,
        searchInputRef,
        clearInput,
        focusInput,
        blurInput,
    };
};
