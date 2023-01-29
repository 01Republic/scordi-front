import {toast} from 'react-toastify';

export const successNotify = (msg: string) => {
    toast.success(msg);
};

export const errorNotify = (err: any) => {
    const error = err?.response?.data || {message: '', code: ''};
    const message = error.message as string[] | string;
    const code = error.code as string;
    const toastKind = code === 'DUPLICATED_ENTITY' ? toast.info : toast.error;
    Array.isArray(message) ? toastKind(message[0]) : toastKind(message);
};
