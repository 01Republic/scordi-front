import {Button} from '^lib/GyuridTable/ui';
import {LoaderCircle, Rotate3D} from 'lucide-react';

interface Props {
    isLoading?: boolean;
}

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
