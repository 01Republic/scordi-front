import {AnimatedModal} from '^components/modals/_shared/AnimatedModal';

interface EditUserProfileModalProps {
    isOpened: boolean;
    onClose: () => void;
}

/**
 TODO
 - modal-box 대신 tailwind로 스타일링
 */

export const EditUserProfileModal = (props: EditUserProfileModalProps) => {
    const {isOpened, onClose} = props;

    return (
        <AnimatedModal open={isOpened} onClose={onClose}>
            <div className="bg-white modal-box">프로필 수정 모달임</div>
        </AnimatedModal>
    );
};
