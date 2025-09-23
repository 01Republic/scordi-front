import {ReactElement, ReactNode} from 'react';

interface Props {
    title?: JSX.Element | ReactElement | ReactNode;
    desc?: JSX.Element | ReactElement | ReactNode;
}

/**
 * 툴팁 내부에 표시할 제목과(선택적) 설명을 렌더링하는 컴포넌트.
 *
 * title은 항상 상단에 흰색 텍스트로 출력되며, desc가 전달된 경우 그 아래에 약간 투명한 흰색(`text-white/80`)으로 표시됩니다.
 *
 * @param title - 렌더링할 제목(ReactNode). undefined나 null이면 아무 내용도 출력되지 않습니다.
 * @param desc - 선택적 설명(ReactNode). 존재할 때만 두번째 줄로 렌더링됩니다.
 * @returns Tooltip 내용이 담긴 JSX.Element
 */
export function TooltipContent(props: Props) {
    const {title, desc} = props;

    return (
        <div className="text-12 flex flex-col py-1 px-1.5">
            <div className="text-white">{title}</div>
            {desc && <div className="text-white/80">{desc}</div>}
        </div>
    );
}
