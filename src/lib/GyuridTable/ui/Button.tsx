import {ButtonHTMLAttributes} from 'react';
import {cn} from '^public/lib/utils';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    disabled?: boolean;
    pill?: boolean;
    ghost?: boolean;
    square?: boolean;
}

/**
 * 스타일 변형(기본, ghost, pill, square)을 지원하는 재사용 가능한 버튼 컴포넌트.
 *
 * 기본적으로 전달된 props를 그대로 native `<button>`에 전파하며, `type`이 지정되지 않으면 `'button'`으로 설정됩니다.
 * 전달된 `disabled` prop은 실제 HTML `disabled` 속성으로는 전달되지 않고(전파에서 제외됨) 스타일(`opacity-50` 및 `pointer-events-none`)로만 비활성화 상태를 표현합니다.
 *
 * @param disabled - true이면 시각적으로 비활성화된 스타일을 적용합니다(버튼의 동작 자체를 차단하려면 명시적으로 `disabled`를 버튼에 전달해야 합니다).
 * @param pill - true이면 버튼을 둥근(rounded-full) 형태로 렌더링합니다.
 * @param ghost - true이면 투명 배경과 muted 텍스트 스타일(ghost 테마)을 적용합니다.
 * @param square - true이면 고정된 정사각형 너비(w-[28px])를 적용합니다.
 * @returns 렌더링된 React 버튼 엘리먼트 (JSX.Element)
 */
export function Button(props: Props) {
    const {
        type,
        className = '',
        onClick,
        pill = false,
        ghost = false,
        square = false,
        disabled = false,
        ...res
    } = props;

    return (
        <button
            {...res}
            type={type || `button`}
            className={cn(
                `select-none !outline-none cursor-pointer btn-animation inline-flex items-center`, // btn
                `min-h-[28px] h-[28px] px-[8px] text-14 whitespace-nowrap transition-all duration-[20ms] ${
                    disabled ? 'opacity-50 pointer-events-none' : ''
                }`,
                square ? 'w-[28px]' : '',
                'bg-gray-150 hover:bg-gray-300 rounded-[6px]', // theme: default
                ghost ? 'text-gray-500 bg-transparent hover:bg-gray-200/70' : '', // theme: ghost
                pill ? 'rounded-[100px]' : '', // theme: pill
                className,
            )}
            onClick={onClick}
        />
    );
}
