import {useRef, useState} from 'react';
import {Search, X} from 'lucide-react';
import {debounce} from 'lodash';
import {IconButton} from '^lib/GyuridTable/ui';

interface SearchControlProps {
    onSearch: (value: string) => any;
}

/**
 * 검색 아이콘을 눌러 확장되는 입력 필드를 제공하고 입력값을 디바운스하여 콜백으로 전달하는 검색 컨트롤 컴포넌트입니다.
 *
 * 확장된 상태에서 입력한 값은 500ms 지연 후 onSearch에 전달됩니다. 검색 아이콘을 클릭하면 입력 필드가 확장되고 포커스가 이동하며,
 * 우측의 닫기(X) 버튼을 누르면 입력값이 지워지고 필드가 접힙니다. 입력은 uncontrolled 방식으로 DOM 값을 직접 읽고 초기화합니다.
 *
 * @param onSearch - 사용자가 입력한 검색어를 수신하는 콜백 (디바운스 500ms 적용)
 * @returns 검색 컨트롤의 React 요소
 */
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
