import DaumPostcode, {Address} from 'react-daum-postcode';
import React from 'react';

interface AddressSearchModalProps {
    isOpened: boolean;
    onClose: () => void;
    onComplete: (data: Address) => void;
}

export const AddressSearchModal: React.FC<AddressSearchModalProps> = ({isOpened, onClose, onComplete}) => {
    return (
        <div className={`modal modal-bottom ${isOpened ? 'modal-open' : ''}`} onClick={onClose}>
            <div className="modal-box p-4 bg-gray-100 max-w-lg space-y-4" onClick={(e) => e.stopPropagation()}>
                <div className={'space-y-4'}>
                    <div className={'text-lg font-bold'}>주소를 검색해주세요.</div>
                    <DaumPostcode onComplete={onComplete} autoClose={false} />
                </div>
                <button className="btn btn-lg btn-gray btn-block rounded-box" onClick={onClose}>
                    닫기
                </button>
            </div>
        </div>
    );
};
