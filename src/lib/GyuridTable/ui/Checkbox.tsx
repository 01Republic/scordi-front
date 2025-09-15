import {DetailedHTMLProps, InputHTMLAttributes} from 'react';
import {cn} from '^public/lib/utils';

/**
 * 기본 스타일이 적용된 재사용 가능한 체크박스 입력 컴포넌트입니다.
 *
 * HTML 표준 체크박스 속성들을 그대로 받아 렌더링하며, 내부에서 기본 Tailwind(유틸리티) 스타일과
 * 전달된 `className`을 병합하여 최종 클래스명을 결정합니다. 상태(checked, disabled)에 따른 스타일 변형을 포함하며
 * 내부 상태나 이벤트 처리를 직접 수행하지 않고 모든 나머지 속성(attrs)을 그대로 input에 전달합니다.
 *
 * @param props - 표준 HTMLInputElement 속성들(DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>).
 *                `className`은 기본값이 빈 문자열이며, 전달하면 기본 스타일에 추가/재정의됩니다.
 * @returns 체크박스 input 요소를 렌더링한 JSX.Element
 */
export function Checkbox(props: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
    const {className = '', ...attrs} = props;

    return (
        <input
            type="checkbox"
            className={cn(
                `checkbox checkbox-xs checkbox-primary rounded-[4px] disabled:cursor-pointer disabled:opacity-100 disabled:border-gray-200 disabled:bg-gray-100 checked:disabled:!border-indigo-500 checked:disabled:!bg-indigo-500`,
                className,
            )}
            {...attrs}
        />
    );
}
