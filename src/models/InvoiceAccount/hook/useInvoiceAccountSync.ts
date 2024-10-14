import {atom, useRecoilState} from 'recoil';
import {InvoiceAccountDto, ReConnectInvoiceAccountRequestDto} from '^models/InvoiceAccount/type';
import {invoiceAccountApi} from '^models/InvoiceAccount/api';
import {confirm2, swalHTML} from '^components/util/dialog';
import {toast} from 'react-hot-toast';
import {ApiError} from '^api/api';

const isSyncRunningAtom = atom({
    key: 'useInvoiceAccountSync/isSyncRunningAtom',
    default: false,
});

export function useInvoiceAccountSync() {
    const [isSyncRunning, setIsSyncRunning] = useRecoilState(isSyncRunningAtom);

    // 청구서 수신계정의 일반적인 동기화 업데이트 실행
    const syncAccount = async (orgId: number, invoiceAccount: InvoiceAccountDto) => {
        if (!orgId || isNaN(orgId)) return;

        setIsSyncRunning(true);

        const successCallback = <T>(res: T) => {
            toast.success(`${invoiceAccount.email} 동기화 완료!`);
            return res;
        };

        return invoiceAccountApi
            .syncV2(orgId, invoiceAccount.id)
            .then(successCallback)
            .catch((err) => {
                if (isTokenExpired(err)) {
                    throw err;
                } else {
                    catchError(err);
                }
            })
            .finally(() => setIsSyncRunning(false));
    };

    // 청구서 수신계정의 일반적인 동기화 업데이트 실행 확인창
    const syncAccountWithConfirm = (
        orgId: number,
        invoiceAccount: InvoiceAccountDto,
        option?: {
            onStart?: () => any;
            onError: (e: Error) => any;
        },
    ) => {
        const {onStart, onError} = option || {};

        return confirm2('이메일 동기화를 시작합니다', '약 3~4분 정도가 예상되는 작업이에요.\n지금 실행할까요?')
            .then((r) => {
                if (!r.isConfirmed) throw new Error('이메일 동기화를 취소했습니다');
            })
            .then(() => onStart && onStart())
            .then(() => syncAccount(orgId, invoiceAccount))
            .catch(onError ? onError : (e) => console.log(e.message));
    };

    // 청구서 수신계정의 구글 재인증을 포함한 동기화 업데이트 실행
    const renewAccount = async (
        orgId: number,
        invoiceAccount: InvoiceAccountDto,
        data: ReConnectInvoiceAccountRequestDto,
    ) => {
        if (!orgId || isNaN(orgId)) return;

        setIsSyncRunning(true);

        const successCallback = <T>(res: T) => {
            toast.success(`${invoiceAccount.email} 동기화 완료!`);
            return res;
        };

        return invoiceAccountApi
            .reConnect(orgId, invoiceAccount.id, data)
            .then(successCallback)
            .catch((err) => {
                if (isTokenExpired(err)) {
                    throw err;
                } else {
                    catchError(err);
                }
            })
            .finally(() => setIsSyncRunning(false));
    };

    // 청구서 수신계정의 구글 재인증을 포함한 동기화 업데이트 실행 확인창
    const renewAccountWithConfirm = (
        orgId: number,
        invoiceAccount: InvoiceAccountDto,
        data: ReConnectInvoiceAccountRequestDto,
        option?: {
            onStart?: () => any;
            onError: (e: Error) => any;
        },
    ) => {
        const {onStart, onError} = option || {};

        return confirm2('이메일 동기화를 시작합니다', '약 3~4분 정도가 예상되는 작업이에요.\n지금 실행할까요?')
            .then((r) => {
                if (!r.isConfirmed) throw new Error('이메일 동기화를 취소했습니다');
            })
            .then(() => onStart && onStart())
            .then(() => renewAccount(orgId, invoiceAccount, data))
            .catch(onError ? onError : (e) => console.log(e.message));
    };

    return {
        isSyncRunning,
        syncAccount,
        syncAccountWithConfirm,
        renewAccount,
        renewAccountWithConfirm,
    };
}

function catchError(err: ApiError) {
    const apiError = err.response?.data;
    console.log(err);

    if (!apiError) {
        toast.error('문제가 발생했습니다.');
        return;
    }

    toast.error(apiError.message);
    console.error(apiError);
}

function isTokenExpired(err: ApiError) {
    const apiError = err.response?.data;
    return apiError?.status === 422 && apiError.message.includes('Google Token Error / Invalid grant');
}
