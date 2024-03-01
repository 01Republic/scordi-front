import * as CryptoJS from 'crypto-js';
import {networkSignKey} from '^config/environments';

export const cipherTextOn = (secret: string = networkSignKey) => ({
    encrypt: (value: string) => CryptoJS.AES.encrypt(value, secret).toString(),
    decrypt: (value: string) => CryptoJS.AES.decrypt(value, secret).toString(CryptoJS.enc.Utf8),
});
