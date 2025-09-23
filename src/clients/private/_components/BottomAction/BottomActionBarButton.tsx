import React, {memo, ReactNode} from 'react';
import Tippy from '@tippyjs/react';

interface BottomActionBarButtonProps {
    Icon: ReactNode;
    buttonText: string;
    toolTipText?: string;
    onClick?: () => any;
    isPending?: boolean;
}

export const BottomActionBarButton = memo((props: BottomActionBarButtonProps) => {
    const {Icon, buttonText, toolTipText, onClick, isPending} = props;
    return (
        <>
            {toolTipText && !onClick ? (
                <Tippy content={toolTipText}>
                    <div className="flex gap-1 text-gray-400 bg-gray-200 btn btn-sm no-animation btn-animation hover:!bg-gray-150">
                        {Icon}
                        {buttonText}
                    </div>
                </Tippy>
            ) : (
                <button
                    className={`flex gap-1 btn btn-sm no-animation btn-animation btn-white ${
                        isPending ? 'link_to-loading' : ''
                    }`}
                    onClick={onClick}
                >
                    {Icon}
                    {buttonText}
                </button>
            )}
        </>
    );
});
