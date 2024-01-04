import {memo} from 'react';
import {TopRightButton} from '^v3/share/modals';

interface DeleteButtonProps {
    isShow: boolean;
    onClick: () => any;
}

export const DeleteButton = memo(function DeleteButton(props: DeleteButtonProps) {
    const {isShow, onClick} = props;

    if (!isShow) return <></>;

    return <TopRightButton text="삭제" onClick={() => onClick()} />;
});
