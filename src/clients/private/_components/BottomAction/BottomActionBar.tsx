import {memo, ReactNode} from 'react';
import {RotateCcw} from 'lucide-react';

interface BottomActionBarProps {
    itemCount?: number;
    onClear?: () => void;
    children: ReactNode;
}

export const BottomActionBar = memo((props: BottomActionBarProps) => {
    const {itemCount, onClear, children} = props;
    return (
        <div className="flex justify-center items-center w-full text-14">
            <div className="flex flex-row gap-3 items-center px-6 py-1 bg-white rounded-full border border-gray-300 shadow-lg min-w-md">
                <span className="text-gray-600">{itemCount}개 선택됨</span>

                {children}

                <RotateCcw className="text-gray-500 cursor-pointer hover:text-red-400" onClick={onClear} />
            </div>
        </div>
    );
});
