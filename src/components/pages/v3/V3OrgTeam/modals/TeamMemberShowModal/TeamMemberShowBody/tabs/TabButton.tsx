import React, {memo} from 'react';

interface TabButtonProps {
    label: string;
    isActive: boolean;
    onClick: () => any;
}

export const TabButton = memo((props: TabButtonProps) => {
    const {label, isActive, onClick} = props;

    return (
        <div
            className={`flex items-center justify-center transition-all ${
                isActive
                    ? 'text-black bg-white border-b-4 border-scordi'
                    : 'text-gray-500 border-b-4 border-gray-100 hover:text-gray-800 hover:bg-gray-100 cursor-pointer'
            }`}
            onClick={onClick}
        >
            <p className="text-16 font-semibold">{label}</p>
        </div>
    );
});
TabButton.displayName = 'TabButton';
