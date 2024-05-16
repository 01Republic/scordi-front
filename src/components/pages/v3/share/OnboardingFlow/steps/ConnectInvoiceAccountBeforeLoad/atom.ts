import {atom} from 'recoil';

export const connectInvoiceAccountCodeAtom = atom<string>({
    key: 'connectInvoiceAccountCodeAtom',
    default: '',
});

export enum GoogleErrorCode {
    invalid_request = 'invalid_request',
    access_denied = 'access_denied',
    unauthorized_client = 'unauthorized_client',
    unsupported_response_type = 'unsupported_response_type',
    invalid_scope = 'invalid_scope',
    server_error = 'server_error',
    temporarily_unavailable = 'temporarily_unavailable',
}

export function isGoogleError(code: string) {
    return Object.values<string>(GoogleErrorCode).includes(code);
}
