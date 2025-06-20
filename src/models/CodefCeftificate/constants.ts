export const CODEF_CERTIFICATE_INITIALIZE_ERROR = {
    E010001: '버전 업데이트를 위해 재설치가 필요합니다.',
    E010002: '보안 프로그램이 설치가 필요합니다.',
    E020001: '보안 프로그램과 연결이 원활하지 않아요. 잠시 후 다시 시도해주세요.',
    E020002: '보안 프로그램과 통신이 차단됐어요. 방화벽이나 네트워크 설정을 확인해주세요.',
    NO_INIT_FUNC: '보안 프로그램이 실행되지 않았어요. 페이지를 새로고침하거나 다시 설치해보세요.',
    DEFAULT: '알 수 없는 문제가 발생했어요. 다시 시도하거나 고객센터에 문의해주세요.',
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

export const getPFXErrorMessage = (code?: string) => {
    return PFX_ERROR_CODE_DEFINE[code as keyof typeof PFX_ERROR_CODE_DEFINE] ?? PFX_ERROR_CODE_DEFINE['-9993'];
};
