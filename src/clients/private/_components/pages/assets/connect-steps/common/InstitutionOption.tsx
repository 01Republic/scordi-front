import {memo, ReactNode, useState} from 'react';
import cn from 'classnames';
import {Check, Link, Unlink} from 'lucide-react';
import {NextImage} from '^components/NextImage';

interface InstitutionOptionProps {
    logo: string;
    title: string;
    isConnected?: boolean;
    isSelected?: boolean;
    isAllSelected?: boolean;
    isDisabled?: boolean;
    onClick: () => void;
    onDisconnect?: () => void;
    comment?: ReactNode;
}

export const InstitutionOption = memo((props: InstitutionOptionProps) => {
    const {logo, title, isConnected = false, isSelected = false, isAllSelected, onClick, onDisconnect, comment} = props;
    // const isDisabled = isConnected || props.isDisabled || false;
    const isDisabled = props.isDisabled || false;

    const [isHover, setIsHover] = useState(false);

    return (
        <button
            type="button"
            onClick={isDisabled ? undefined : onClick}
            className={cn(`card card-body p-5 bg-base-100 transition box-border no-selectable shadow-xl`, {
                'border border-scordi bg-scordi-50': isSelected,
                'border border-white bg-white': !isSelected,
                'hover:shadow-2xl': !isDisabled,
                'border !border-transparent !bg-gray-500/10 !cursor-default': isDisabled,
            })}
        >
            <div className="flex sm:flex-col gap-4 relative">
                {isSelected && (
                    <Check className="w-5 h-5 text-scordi absolute top-0 right-0 bottom-0 my-auto sm:mt-0" />
                )}
                <div className="flex items-start justify-between">
                    <NextImage
                        src={logo}
                        alt={title}
                        width={40}
                        height={40}
                        className={isDisabled ? 'opacity-40' : ''}
                    />

                    {comment && (
                        <div className={`text-12 font-normal ${isAllSelected ? 'text-gray-500' : 'text-gray-700'}`}>
                            {comment}
                        </div>
                    )}
                </div>
                <div className="flex items-center justify-between">
                    <span
                        className={`text-16 font-semibold whitespace-nowrap ${
                            isDisabled ? 'text-gray-500' : 'text-gray-900'
                        }`}
                    >
                        {title}
                    </span>

                    {isConnected && (
                        <div
                            onMouseEnter={() => setIsHover(true)}
                            onMouseLeave={() => setIsHover(false)}
                            onClick={(e) => {
                                e.stopPropagation();
                                if (onDisconnect) onDisconnect();
                            }}
                            className={cn(
                                'flex gap-1 py-0.5 px-1.5 rounded-sm text-12 font-normal text-neutral-800 whitespace-nowrap items-center justify-center',
                                {
                                    'bg-greenColor-200': !isHover,
                                    'bg-redColor-200': isHover,
                                },
                            )}
                        >
                            {isHover ? <Unlink className="size-3" /> : <Link className="size-3" />}
                            <span>{isHover ? '연결 해제' : '연결됨'}</span>
                        </div>
                    )}
                </div>
            </div>
        </button>
    );
});
