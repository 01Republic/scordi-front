import {ReactElement, ReactNode} from 'react';
import Tippy from '@tippyjs/react';
import {Button} from '^lib/GyuridTable/ui';

interface Props {
    Icon: () => JSX.Element;
    name: JSX.Element | ReactElement | ReactNode;
    onClick: () => any;
}

/**
 * 아이콘을 표시하는 작은 툴팁 버튼을 렌더링합니다.
 *
 * 툴팁은 버튼 위에 표시되며(위쪽, 화살표 없음, 오프셋 [0,5]) 버튼은 정사각형의 ghost 스타일입니다.
 *
 * @param Icon - 버튼 내부에 렌더링할 아이콘 컴포넌트 (JSX를 반환하는 컴포넌트)
 * @param name - 툴팁에 표시할 내용(문자열 또는 React 노드)
 * @param onClick - 버튼 클릭 시 호출되는 콜백
 * @returns 툴팁으로 감싼 아이콘 버튼의 JSX 요소
 */
export function IconButton(props: Props) {
    const {Icon, name, onClick} = props;

    return (
        <Tippy placement="top" arrow={false} offset={[0, 5]} content={name} className="text-12">
            <div>
                <Button ghost square className="" onClick={onClick}>
                    <Icon />
                </Button>
            </div>
        </Tippy>
    );
}
