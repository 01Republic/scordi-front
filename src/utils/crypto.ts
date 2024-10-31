import * as CryptoJS from 'crypto-js';
import {networkSignKey} from '^config/environments';

export const cryptoUtil = {
    encrypt(message: string, key = networkSignKey) {
        return CryptoJS.AES.encrypt(message, key).toString();
    },

    decrypt(ciphertext: string, key = networkSignKey) {
        return CryptoJS.AES.decrypt(ciphertext, key).toString(CryptoJS.enc.Utf8);
    },

    jsonEncrypt<T>(data: T, key = networkSignKey): string {
        return this.encrypt(JSON.stringify(data), key);
    },

    jsonDecrypt<R>(cipherJsonText: string, key = networkSignKey): R {
        return JSON.parse(this.decrypt(cipherJsonText, key));
    },

    encryptUri(message: string, key = networkSignKey) {
        return encodeURI(this.encrypt(message, key).replaceAll('/', '__').replaceAll('+', '____'));
    },

    decryptUri(cipher: string, key = networkSignKey) {
        return this.decrypt(cipher.replaceAll('____', '+').replaceAll('__', '/'), key);
    },
};

export class CryptoService {
    encrypt(value: string, key = networkSignKey) {
        return cryptoUtil.encrypt(value, key);
    }

    decrypt(value: string, key = networkSignKey) {
        return cryptoUtil.decrypt(value, key);
    }
}
