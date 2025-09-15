import {Button} from '^lib/GyuridTable/ui';
import {LoaderCircle, Rotate3D} from 'lucide-react';

interface Props {
    isLoading?: boolean;
}

/**
 * 로딩 중일 때 버튼 형태의 상태 표시 UI를 렌더링합니다.
 *
 * isLoading이 true면 회전하는 스피너 아이콘과 "실행중..." 텍스트를 가진 ghost 버튼을 반환하고,
 * false면 아무것도 렌더링하지 않습니다.
 *
 * @param props.isLoading - 로딩 상태 여부. true면 로딩 UI를 보여줍니다.
 * @returns 로딩 중이면 버튼 요소(JSX), 아니면 빈 프래그먼트
 */
export function LoadingStatus(props: Props) {
    const {isLoading = false} = props;

    if (!isLoading) return <></>;

    return (
        <Button className={`gap-1 ${isLoading ? '!pointer-events-none' : ''}`} ghost>
            <LoaderCircle className="animate-spin" />
            <span>실행중...</span>
        </Button>
    );
}
