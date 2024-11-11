import * as crypto from 'crypto';

class SecureRandom {
    hex(size = 16) {
        return Array(size)
            .fill('')
            .map(() => Math.random().toString(36).charAt(2))
            .join('');
    }

    base64() {
        //
    }

    randomBytes(size: number) {
        return crypto.randomBytes(size);
    }

    alphanumeric(size = 1) {
        return this.hex(size);
    }

    get uuid() {
        return '';
    }
}

export default new SecureRandom();
