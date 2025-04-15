import {atom, useRecoilState} from 'recoil';

export const isShowPageFlashAtom = atom({
    key: 'CreditCardPageFlashHandler/isShowPageFlashAtom',
    default: false,
});

export const useCreditCardPageFlashForExcelUpload = () => {
    const [isShowPageFlash, setIsShowPageFlash] = useRecoilState(isShowPageFlashAtom);

    return {isShowPageFlash, setIsShowPageFlash};
};
