import {memo} from 'react';

interface DriveButtonProps {
    isActive?: boolean;
    Icon: () => JSX.Element;
    name: string;
    onClick?: () => void;
}

export const DriveButton = memo((props: DriveButtonProps) => {
    const {isActive = false, Icon, onClick, name} = props;

    return (
        <button
            className={`w-full flex flex-col gap-2 items-center justify-center border py-5 rounded-lg transition-all text-gray-900 ${
                isActive
                    ? 'bg-scordi-50 border-scordi'
                    : 'bg-white hover:bg-scordi-50 border-gray-300 hover:border-scordi'
            }`}
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
