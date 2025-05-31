export enum CodefApiResultCode {
    SUCCESS = 'CF-00000',
    ACCOUNT_CREATE_FAILED = 'CF-04000', // 사용자 계정정보 등록에 실패했습니다.
    WRONG_ID_PASSWORD = 'CF-12803', // 아이디 또는 비밀번호 오류입니다. 확인 후 거래하시기 바랍니다.
    LOGIN_PARAMETER_LOST = 'CF-12401', // 로그인 파라미터가 누락되었습니다.
    ALREADY_REGISTERED_COMPANY_IN_CONNECT_ID = 'CF-04004', // 이미 계정이 등록된 기관입니다. 기존 계정 먼저 삭제하세요.
}

export function codefErrorCodeToMsg(code: CodefApiResultCode) {
    switch (code) {
        case CodefApiResultCode.WRONG_ID_PASSWORD:
            return '입력하신 아이디 또는 비밀번호 값이 올바르지 않습니다.';
        default:
            return '';
    }
}
