import {ReactElement, ReactNode, useRef} from 'react';
import {TooltipContent} from '^lib/GyuridTable/ui';
import Tippy from '@tippyjs/react';

interface Props {
    Icon: () => JSX.Element;
    name: JSX.Element | ReactElement | ReactNode;
    tooltipTitle?: JSX.Element | ReactElement | ReactNode;
    tooltipDesc?: JSX.Element | ReactElement | ReactNode;
    onClick?: () => void;
}

export function ViewButton(props: Props) {
    const {Icon, name, tooltipTitle, tooltipDesc, onClick} = props;
    const ref = useRef(null);

    return (
        <>
            <button
                ref={ref}
                type="button"
                className="btn !outline-none no-animation btn-animation border-0 bg-gray-200/70 hover:bg-gray-500/20 text-gray-600 transition-all duration-[20ms] flex items-center gap-2 min-h-0 h-[32px] max-w-[220px] py-[6px] px-[12px] rounded-[20px] whitespace-nowrap text-14 "
                onClick={onClick}
            >
                <Icon />
                <span>{name}</span>
            </button>

            {tooltipTitle && (
                <Tippy
                    reference={ref}
                    placement="bottom-start"
                    arrow={false}
                    delay={[500, 0]}
                    duration={20}
                    offset={[0, 8]}
                    className="text-12 !rounded-[8px] [&_.tippy-content]:p-0"
                    content={<TooltipContent title={tooltipTitle} desc={tooltipDesc} />}
                />
            )}
        </>
    );
}
