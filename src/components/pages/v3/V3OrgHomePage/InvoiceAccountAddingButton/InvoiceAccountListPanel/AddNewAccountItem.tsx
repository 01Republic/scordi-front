import React, {memo} from 'react';
import {BsEnvelopePlus} from '../../../../../react-icons';
import {useSetRecoilState} from 'recoil';
import {isOpenNewInvoiceAccountModalAtom} from '../../NewInvoiceAccountModal';

export const AddNewAccountItem = memo(() => {
    const setModalShow = useSetRecoilState(isOpenNewInvoiceAccountModalAtom);
    return (
        <li>
            <a
                className="items-center gap-4 px-6 bg-base-100 active:bg-scordi-light-100 text-gray-700 hover:text-scordi"
                onClick={() => setModalShow(true)}
            >
                <BsEnvelopePlus className="w-7" />
                <span className="">다른 계정 추가</span>
            </a>
        </li>
    );
});
