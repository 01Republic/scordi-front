// 에러 코드 정의
export const IMPORT_ERROR_CODE_DEFINE = {
    '-9999': '파라메터 key가 존재하지 않습니다.',
    '-9998': '파라메터 데이터가 존재하지 않습니다.',
    '-9997': '인증서 정보가 잘못되거나 인증서 비밀번호가 일치하지 않습니다.',
    '-9996': '인증서 경로가 존재하지 않거나 권한이 없습니다.',
    '-9995': '경로를 생성할 수 없습니다.',
    '-9994': '데이터 변환중 오류가 발생되었습니다..',
    '-9993': '인증서 경로를 찾을 수 없습니다.',
};

export const PFX_ERROR_CODE_DEFINE = {
    '-9999': '파라메터 key가 존재하지 않습니다.',
    '-9998': '파라메터 데이터가 존재하지 않습니다.',
    '-9997': '인증서 비밀번호가 일치하지 않습니다.',
    '-9996': '데이터 변환중 오류가 발생되었습니다.',
    '-9995': '알 수 없는 오류가 발생되었습니다.',
    '-9994': '알 수 없는 오류가 발생되었습니다.',
    '-9993': '인증서 경로를 찾을 수 없습니다.',
};

export enum InstallCheckErrorCode {
    VersionOver = 'E010001', // CodefCert를 업데이트하시기 바랍니다.
    NotInstalled = 'E010002', // CodefCert를 설치하시기 바랍니다.
    RequestTimeout = 'E010003', // JSONP request timed out
    Unknown = 'E010003', // Port request failed
}

/**
 * 커스텀 에러 클래스
 */
export class CodefInstallInvalidError extends Error {
    errorCode: InstallCheckErrorCode | string;

    constructor(errorCode: InstallCheckErrorCode | string, message: string) {
        super(message);
        this.name = 'CodefInstallInvalidError';
        this.errorCode = errorCode;

        // prototype 체인 유지를 위한 설정 (ES6+에서는 필요 없지만 안전을 위해 추가)
        Object.setPrototypeOf(this, CodefInstallInvalidError.prototype);
    }
}
