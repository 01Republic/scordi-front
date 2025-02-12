// 업무 구분 (parameter: 'businessType')
export enum CodefRequestBusinessType {
    Bank = 'BK', // 은행,저축은행
    Card = 'CD', // 카드
    Stock = 'ST', // 증권
    Insurance = 'IS', // 보험
}

export function t_codefRequestBusinessType(val: CodefRequestBusinessType) {
    return {
        [CodefRequestBusinessType.Bank]: '은행',
        [CodefRequestBusinessType.Card]: '카드',
        [CodefRequestBusinessType.Stock]: '증권',
        [CodefRequestBusinessType.Insurance]: '보험',
    }[val];
}

// 기관코드 (codef 에서 organization 파라미터의 값으로 취급)
export enum CodefCardCompanyCode {
    KB국민카드 = '0301',
    현대카드 = '0302',
    삼성카드 = '0303',
    NH카드 = '0304',
    BC카드 = '0305',
    신한카드 = '0306',
    씨티카드 = '0307',
    우리카드 = '0309',
    롯데카드 = '0311',
    하나카드 = '0313',
    전북카드 = '0315',
    광주카드 = '0316', // cert only
    수협카드 = '0320', // cert only
    제주카드 = '0321', // cert only
    산업은행카드 = '0002', // cert only
}

// 은행코드
export enum CodefBankCode {
    산업은행 = '0002',
    기업은행 = '0003',
    국민은행 = '0004',
    수협은행 = '0007',
    농협은행 = '0011',
    우리은행 = '0020',
    SC은행 = '0023',
    씨티은행 = '0027',
    대구은행 = '0031',
    부산은행 = '0032',
    광주은행 = '0034',
    제주은행 = '0035',
    전북은행 = '0037',
    경남은행 = '0039',
    새마을금고 = '0045',
    신협은행 = '0048',
    우체국 = '0071',
    KEB하나은행 = '0081',
    신한은행 = '0088',
    K뱅크 = '0089',
    카카오뱅크 = '0090',
    토스뱅크 = '0092',
    SBI저축은행 = '0103',
}

// 고객구분 (parameter: 'clientType')
export enum CodefCustomerType {
    Personal = 'P', // 개인
    Business = 'B', // 기업,법인
    All = 'A', // 통합
}

export function t_codefCustomerType(val: CodefCustomerType) {
    return {
        [CodefCustomerType.Personal]: '개인',
        [CodefCustomerType.Business]: '법인',
        [CodefCustomerType.All]: '통합',
    }[val];
}

// 로그인 방식 (parameter: 'loginType')
export enum CodefLoginType {
    Certificate = '0', // 인증서
    IdAccount = '1', // 아이디/패스워드
}

export function t_codefLoginType(val: CodefLoginType) {
    return {
        [CodefLoginType.Certificate]: '인증서',
        [CodefLoginType.IdAccount]: '계정',
    }[val];
}

// 인증서 구분 (parameter: 'certType')
export enum CodefCertificateType {
    Default = '1', // 기본인증서(der/key)타입 (default)
    PFX = 'pfx', // 인증서 pfx 타입
}

// 로그인구분 (parameter: 'loginTypeLevel')
// - *신한/롯데 법인카드의 경우
export enum CodefLoginTypeLevel {
    // case         // 계정 CRUD          | 보유카드조회(신한카드)  | 보유카드조회(롯데카드)
    USER = '0', //     이용자              | 이용자              | 개인명의 법인카드 회원
    BRANCH = '1', //   사업장/부서관리자     | 사업장/부서관리자      | 법인명의 법인카드 회원
    ADMIN = '2', //    총괄관리자 (default) | 총괄관리자 (default) | 법인관리자 (default)
}

export function t_codefLoginTypeLevel(val?: CodefLoginTypeLevel) {
    if (!val) return '-';
    return {
        [CodefLoginTypeLevel.USER]: '이용자',
        [CodefLoginTypeLevel.BRANCH]: '부서관리자',
        [CodefLoginTypeLevel.ADMIN]: '총괄관리자',
    }[val];
}

// 의뢰인구분(회원구분) (parameter: 'clientTypeLevel')
// - *신한 법인카드의 경우
export enum CodefClientTypeLevel {
    CREDIT_CARD = '0', // 신용카드회원
    CHECK_CARD = '1', // 체크카드회원
    RnD_CREDIT_CARD = '2', // 연구비신용카드회원
    PRE_PLUS = '3', // 프리플러스회원
}

export function t_codefClientTypeLevel(val?: CodefClientTypeLevel) {
    if (!val) return '-';
    return {
        [CodefClientTypeLevel.CREDIT_CARD]: '신용카드회원',
        [CodefClientTypeLevel.CHECK_CARD]: '체크카드회원',
        [CodefClientTypeLevel.RnD_CREDIT_CARD]: '연구비카드회원',
        [CodefClientTypeLevel.PRE_PLUS]: '프리플러스회원',
    }[val];
}
