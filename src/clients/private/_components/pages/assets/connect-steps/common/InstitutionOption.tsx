import {memo, useState} from 'react';
import cn from 'classnames';
import {Check, Link, Unlink} from 'lucide-react';
import {NextImage} from '^components/NextImage';

interface InstitutionOptionProps {
    logo: string;
    title: string;
    connect?: boolean;
    isSelected?: boolean;
    isAllSelected?: boolean;
    isDisabled?: boolean;
    onClick: () => void;
    onDisconnect?: () => void;
}

export const InstitutionOption = memo((props: InstitutionOptionProps) => {
    const {logo, title, connect = false, isSelected = false, isDisabled, isAllSelected, onClick, onDisconnect} = props;

    const [isHover, setIsHover] = useState(false);

    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                'card card-body p-5 bg-base-100 transition box-border no-selectable shadow-xl hover:shadow-2xl',
                {
                    'border border-scordi bg-scordi-50': isSelected,
                    'border border-white bg-white': !isSelected,
                    '!border !border-gray-500 !bg-gray-300': isAllSelected && isDisabled,
                },
            )}
        >
            <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                    <NextImage src={logo} alt={title} width={40} height={40} />
                    {isSelected && <Check className="w-5 h-5 text-scordi" />}
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-neutral-900 text-16 font-semibold whitespace-nowrap">{title}</span>
                    {isDisabled && <span className="text-12 font-normal text-gray-700">홈페이지 로그인 필요</span>}

                    {connect && (
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
