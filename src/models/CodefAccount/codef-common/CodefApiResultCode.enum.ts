export enum CodefApiResultCode {
    SUCCESS = 'CF-00000',
    SERVICE_NOT_FOUND = 'CF-00003', // 요청하신 서비스 상품 정보가 존재하지 않습니다.
    ACCOUNT_CREATE_FAILED = 'CF-04000', // 사용자 계정정보 등록에 실패했습니다.
    ALREADY_REGISTERED_COMPANY_IN_CONNECT_ID = 'CF-04004', // 이미 계정이 등록된 기관입니다. 기존 계정 먼저 삭제하세요.
    ORG_NOT_FOUND = 'CF-04033', // 존재하지 않는 기관입니다. 기관(organization) 코드를 확인하세요.
    CERTIFICATION_CREATE_FAILED = 'CF-04025', // pfx인증서로부터 der파일 생성에 실패했습니다. 인증서와 비밀번호 정보가 올바른지 확인하세요.
    CHECK_ORG_AGAIN = 'CF-09002', // organization을 올바르게 입력했는지 확인하세요.
    BAD_REQUEST = 'CF-11021', // 요청 처리에 실패했습니다. 요청 주소와 요청 파라미터가 올바른지 확인하세요.

    ORGANIZATION_OFFICE_NOT_OPENED = 'CF-12041', // 이용 가능 시간이 아닙니다.
    ORGANIZATION_ACTION_UNSUPPORTED = 'CF-12050', // 대상기관에서 제공하지 않는 업무입니다.
    SIGNATURE_DATA_INVALID = 'CF-12304', // 전자서명 데이터 오류입니다.
    WRONG_ID_PASSWORD = 'CF-12803', // 아이디 또는 비밀번호 오류입니다. 확인 후 거래하시기 바랍니다.
    CERTIFICATE_PROCESS_ERROR = 'CF-12809', // 인증서관련 기타 오류입니다. 확인 후 거래하시기 바랍니다.
    LOGIN_PARAMETER_LOST = 'CF-12401', // 로그인 파라미터가 누락되었습니다.
    UNREGISTERED_CERTIFICATE = 'CF-12805', // 미등록 인증서입니다. 확인 후 거래하시기 바랍니다.
    UNREGISTERED_OR_DELETED_CERTIFICATE = 'CF-12813', // 미등록 또는 폐기된 인증서입니다. 확인 후 거래하시기 바랍니다.
}

export function codefErrorCodeToMsg(code: CodefApiResultCode) {
    switch (code) {
        case CodefApiResultCode.WRONG_ID_PASSWORD:
            return '입력하신 아이디 또는 비밀번호 값이 올바르지 않습니다.';
        default:
            return '';
    }
}

/**
 * [
 *     {
 *         "code": "CF-12041",
 *         "message": "이용 가능 시간이 아닙니다.",
 *         "extraMessage": "NOT(04:00~05:00)",
 *         "countryCode": "KR",
 *         "clientType": "B",
 *         "organization": "0071",
 *         "businessType": "BK",
 *         "loginType": "0"
 *     },
 * ]
 */
