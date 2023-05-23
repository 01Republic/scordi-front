import React, {memo} from 'react';
import DaumPostcode, {Address} from 'react-daum-postcode';
import {atom, useSetRecoilState} from 'recoil';
import {useModal} from '^v3/share/modals/useModal';

export const addressModalIsShow = atom({
    key: 'v3/addressModalIsShow',
    default: false,
});

export const addressValueAtom = atom<string | null>({
    key: 'v2/addressValueAtom',
    default: null,
});

export const AddressModal = memo(() => {
    const {setIsShow, Modal} = useModal({isShowAtom: addressModalIsShow});
    const setAddressValueAtom = useSetRecoilState(addressValueAtom);

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
        <Modal className="px-0 py-4">
            <DaumPostcode autoClose={false} onComplete={onComplete} />
        </Modal>
    );
});
