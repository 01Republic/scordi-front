import {useRef, useState} from 'react';
import {Search, X} from 'lucide-react';
import {debounce} from 'lodash';
import {IconButton} from '^lib/GyuridTable/ui';

interface SearchControlProps {
    onSearch: (value: string) => any;
}

export function SearchControl(props: SearchControlProps) {
    const {onSearch} = props;
    const [isActive, setIsActive] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const search = debounce(onSearch, 500);

    return (
        <div className="flex items-center">
            <IconButton
                Icon={() => <Search fontSize={14} />}
                name="검색"
                onClick={() => {
                    setIsActive(true);
                    inputRef.current?.focus();
                }}
            />
            <div
                className={`flex items-center overflow-hidden gap-1.5 relative ${
                    isActive ? 'min-w-max max-w-[150px]' : 'max-w-0'
                } transition-all duration-[20ms]`}
            >
                <input
                    ref={inputRef}
                    autoFocus
                    type="search"
                    placeholder="검색어를 입력하세요."
                    className="border-b grow bg-transparent [&::-webkit-search-cancel-button]:hidden [&::-ms-reveal]:hidden"
                    onChange={(e) => search(e.target.value || '')}
                />

                <button
                    type="button"
                    className="peer-empty:hidden btn btn-ghost no-animation btn-animation p-0 w-[16px] min-h-[16px] h-[16px] whitespace-nowrap rounded-full inline-flex items-center justify-center text-14 bg-gray-200 hover:bg-gray-400"
                    onClick={() => {
                        setIsActive(false);
                        if (inputRef.current) inputRef.current.value = '';
                    }}
                >
                    <X fontSize={10} />
                </button>
            </div>
        </div>
    );
}
