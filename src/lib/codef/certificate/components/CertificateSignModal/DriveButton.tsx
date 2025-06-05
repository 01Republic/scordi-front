import {memo} from 'react';

interface DriveButtonProps {
    isActive?: boolean;
    Icon: () => JSX.Element;
    name: string;
    onClick?: () => void;
    className?: string;
}

export const DriveButton = memo((props: DriveButtonProps) => {
    const {isActive = false, Icon, onClick, name, className = ''} = props;

    return (
        <button
            className={`w-full flex flex-col gap-2 items-center justify-center border py-5 rounded-lg transition-all text-gray-900 ${
                isActive
                    ? 'bg-scordi-50 border-scordi'
                    : 'bg-white border-gray-300 hover:bg-scordi-50 hover:border-scordi'
            } ${className}`}
            onClick={onClick}
        >
            <div className="size-16 flex items-center justify-center">
                <Icon />
            </div>
            <span>{name}</span>
        </button>
    );
});
DriveButton.displayName = 'DriveBox';
