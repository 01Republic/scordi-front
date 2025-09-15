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

/**
 * 아이콘과 레이블을 가진 원형 버튼을 렌더링하고, tooltipTitle이 제공되면 해당 버튼에 툴팁을 연결합니다.
 *
 * 버튼은 Icon 컴포넌트와 name 라벨을 표시하며 onClick 핸들러를 전달받아 호출합니다. tooltipTitle이 truthy일 경우 버튼 참조에 Tippy 툴팁을 연결하여 TooltipContent(title, desc)를 표시합니다.
 *
 * @param props - 컴포넌트 속성
 * @param props.Icon - 버튼에 렌더링할 아이콘 컴포넌트
 * @param props.name - 버튼에 표시할 레이블(JSX/문자열)
 * @param props.tooltipTitle - 툴팁에 표시할 제목(없으면 툴팁 비표시)
 * @param props.tooltipDesc - 툴팁에 표시할 설명(선택)
 * @param props.onClick - 버튼 클릭 시 호출되는 선택적 핸들러
 * @returns 버튼과(조건부) 툴팁을 포함한 JSX 요소
 */
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
