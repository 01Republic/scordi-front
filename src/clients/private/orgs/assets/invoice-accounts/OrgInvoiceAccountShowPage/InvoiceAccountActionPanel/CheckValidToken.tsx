import {memo, useEffect} from 'react';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {invoiceAccountIsValidTokenAtom, useCurrentInvoiceAccountCheckValidToken} from '../atom';
import {atom, useSetRecoilState} from 'recoil';
import {useRouter} from 'next/router';
import {invoiceAccountApi} from '^models/InvoiceAccount/api';

interface CheckValidTokenProps {
    invoiceAccount: InvoiceAccountDto;
}

export const invoiceAccountIsValidTokenCacheAtom = atom<Record<string, boolean>>({
    key: 'OrgInvoiceAccountShowPage/invoiceAccountIsValidTokenCacheAtom',
    default: {},
});
//
// export const invoiceAccountIsValidTokenAtom = atom({
//     key: 'OrgInvoiceAccountShowPage/invoiceAccountIsValidTokenAtom',
//     default: true,
// });

export const CheckValidToken = memo((props: CheckValidTokenProps) => {
    const {invoiceAccount} = props;
    const router = useRouter();
    // const {checkIsValidToken} = useCurrentInvoiceAccountCheckValidToken();
    // const setCache = useSetRecoilState(invoiceAccountIsValidTokenCacheAtom);
    const setIsValidToken = useSetRecoilState(invoiceAccountIsValidTokenAtom);

    useEffect(() => {
        if (router.isReady && typeof window !== 'undefined') {
            console.log(invoiceAccount.id, '\n');
            invoiceAccountApi
                .isValidToken(invoiceAccount.organizationId, invoiceAccount.id)
                .then((res) => setIsValidToken(() => res.data));
        }
    }, [router.isReady]);
    // setCache((oldValue) => {
    //     const id = invoiceAccount.id.toString();
    //     if (typeof oldValue[id] != 'boolean') {
    //         const newValue = {...oldValue};
    //         newValue[id] = true;
    //         new Promise((resolve, reject) => {
    //             checkIsValidToken(invoiceAccount).then(setIsValidToken);
    //             resolve(1);
    //         });
    //         return newValue;
    //     } else {
    //         return oldValue;
    //     }
    // });

    return <></>;
});
