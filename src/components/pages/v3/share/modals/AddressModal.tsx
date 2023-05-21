import React, {memo} from 'react';
import DaumPostcode, {Address} from 'react-daum-postcode';
import {atom, useRecoilState, useSetRecoilState} from 'recoil';

export const addressModalIsShow = atom({
    key: 'v3/addressModalIsShow',
    default: false,
});

export const addressValueAtom = atom<string | null>({
    key: 'v2/addressValueAtom',
    default: null,
});

export const AddressModal = memo(() => {
    const [isShow, setIsShow] = useRecoilState(addressModalIsShow);
    const setAddressValueAtom = useSetRecoilState(addressValueAtom);

    const close = () => setIsShow(false);
    const prevent = (e: any) => {
        e.stopPropagation();
        e.preventDefault();
    };

    const onComplete = (data: Address) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }
        console.log(data);
        console.log(fullAddress);
        console.log(data.zonecode);
        setAddressValueAtom(fullAddress);
        setIsShow(false);
    };

    return (
        <div className={`modal cursor-pointer ${isShow ? 'modal-open' : ''}`} onClick={close}>
            <div className="modal-box px-0 py-4 cursor-default" onClick={prevent}>
                <DaumPostcode autoClose={false} onComplete={onComplete} />
            </div>
        </div>
    );
});
