// ref: https://www.banksalad.com/chart/cards/cashback/past

import {CodefBankCode, CodefCustomerType, CodefLoginType} from '^models/CodefAccount/type/enums';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {getColor, palette} from '^components/util/palette';
import {plainToInstance} from 'class-transformer';

export class BankAccountsStaticData {
    displayName: string;
    param: CodefBankCode;
    logo: string;
    themeColor: string;
    clientType: CodefCustomerType; //
    loginType: CodefLoginType; // 공인인증서는 아직 안쓰므로, 일단 id-pw 만 씁니다.
    loginPageUrl: string;

    static all() {
        return plainToInstance(BankAccountsStaticData, bankAccountsStaticData);
    }

    static clientTypeOf(clientType: CodefCustomerType) {
        return this.all().filter((data) => data.clientType === clientType);
    }

    static findByPersonal(isPersonal: boolean) {
        return this.all().filter((data) => {
            return isPersonal
                ? data.clientType === CodefCustomerType.Personal
                : data.clientType != CodefCustomerType.Personal;
        });
    }

    static findByClientType(clientType: CodefCustomerType) {
        return this.all().filter((data) => data.clientType === clientType);
    }

    static findOne(param?: string) {
        return this.all().find((data) => data.param === param);
    }

    static Tag(props: {company: BankAccountsStaticData}) {
        const {company} = props;
        const colorClass = getColor(0, palette.notionColors);
        return <TagUI>{company.displayName}</TagUI>;
    }

    static logo(name: string) {
        const param = CodefBankCode[name as keyof typeof CodefBankCode];
        return this.findOne(param)?.logo;
    }
}

/** 은행사 로그인 계정을 통한 연동시, 은행사별 필요한 정적데이터 */
/* TODO: loginPageUrl 입력 필요 + 백엔드랑 은행이름 맞추기 */
export const bankAccountsStaticData: BankAccountsStaticData[] = [
    {
        displayName: '농협은행',
        param: CodefBankCode.농협은행,
        logo: '/logo/banks/NH.png',
        themeColor: '#2b64ff',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://ibz.nonghyup.com/servlet/ICCNP1000S.view',
    },
    {
        displayName: '농협은행',
        param: CodefBankCode.농협은행,
        logo: '/logo/banks/NH.png',
        themeColor: '#2b64ff',
        clientType: CodefCustomerType.Personal,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://banking.nonghyup.com/servlet/IPCNPA000I.view',
    },
    {
        displayName: '기업은행',
        param: CodefBankCode.기업은행,
        logo: '/logo/banks/IBK.png',
        themeColor: '#2b64ff',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://www.shinhancard.com/cconts/html/main.html',
    },
    {
        displayName: '기업은행',
        param: CodefBankCode.기업은행,
        logo: '/logo/banks/IBK.png',
        themeColor: '#2b64ff',
        clientType: CodefCustomerType.Personal,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://www.shinhancard.com/pconts/html/main.html',
    },
    {
        displayName: 'KDB산업은행',
        param: CodefBankCode.산업은행,
        logo: '/logo/banks/SU.png',
        themeColor: '#e30614',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://corp.lottecard.co.kr/app/LCMBRAA_V100.lc',
    },
    {
        displayName: 'KDB산업은행',
        param: CodefBankCode.산업은행,
        logo: '/logo/banks/SU.png',
        themeColor: '#e30614',
        clientType: CodefCustomerType.Personal,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://www.lottecard.co.kr/app/LPMAIAA_V100.lc?LPTKN=',
    },
    {
        displayName: '국민은행',
        param: CodefBankCode.국민은행,
        logo: '/logo/banks/KB.png',
        themeColor: '#60584c',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://biz.kbcard.com/CXORMPIC0001.cms',
    },
    {
        displayName: '국민은행',
        param: CodefBankCode.국민은행,
        logo: '/logo/banks/KB.png',
        themeColor: '#60584c',
        clientType: CodefCustomerType.Personal,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://card.kbcard.com/CMN/DVIEW/HOAMCXPRIZZC0002',
    },
    {
        displayName: '수협은행',
        param: CodefBankCode.수협은행,
        logo: '/logo/banks/SHP.png',
        themeColor: '#f14755',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://wisebiz.bccard.com/app/corp/ComLoginActn.corp',
    },
    {
        displayName: '수협은행',
        param: CodefBankCode.수협은행,
        logo: '/logo/banks/SHP.png',
        themeColor: '#f14755',
        clientType: CodefCustomerType.Personal,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://www.bccard.com/app/card/MainActn.do',
    },
    {
        displayName: '하나은행',
        param: CodefBankCode.KEB하나은행,
        logo: '/logo/banks/HN.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://www.hanacard.co.kr/OCM05000000C.web?schID=ccd&mID=OCM05000000C',
    },
    {
        displayName: '하나은행',
        param: CodefBankCode.KEB하나은행,
        logo: '/logo/banks/HN.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Personal,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://www.hanacard.co.kr/',
    },
    {
        displayName: '신한은행',
        param: CodefBankCode.신한은행,
        logo: '/logo/banks/SHN.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://www.hanacard.co.kr/OCM05000000C.web?schID=ccd&mID=OCM05000000C',
    },
    {
        displayName: '신한은행',
        param: CodefBankCode.신한은행,
        logo: '/logo/banks/SHN.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Personal,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://www.hanacard.co.kr/',
    },
    {
        displayName: 'SC제일은행',
        param: CodefBankCode.SC은행,
        logo: '/logo/banks/SC.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://www.hanacard.co.kr/OCM05000000C.web?schID=ccd&mID=OCM05000000C',
    },
    {
        displayName: 'SC제일은행',
        param: CodefBankCode.SC은행,
        logo: '/logo/banks/SC.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Personal,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://www.hanacard.co.kr/',
    },
    {
        displayName: '우리은행',
        param: CodefBankCode.우리은행,
        logo: '/logo/banks/WR.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://www.hanacard.co.kr/OCM05000000C.web?schID=ccd&mID=OCM05000000C',
    },
    {
        displayName: '우리은행',
        param: CodefBankCode.우리은행,
        logo: '/logo/banks/WR.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Personal,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://www.hanacard.co.kr/',
    },
    {
        displayName: '씨티은행',
        param: CodefBankCode.씨티은행,
        logo: '/logo/banks/CITI.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://www.hanacard.co.kr/OCM05000000C.web?schID=ccd&mID=OCM05000000C',
    },
    {
        displayName: '씨티은행',
        param: CodefBankCode.씨티은행,
        logo: '/logo/banks/CITI.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Personal,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://www.hanacard.co.kr/',
    },
    {
        displayName: 'IM뱅크(대구은행)',
        param: CodefBankCode.대구은행,
        logo: '/logo/banks/IM.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://www.hanacard.co.kr/OCM05000000C.web?schID=ccd&mID=OCM05000000C',
    },
    {
        displayName: 'IM뱅크(대구은행)',
        param: CodefBankCode.대구은행,
        logo: '/logo/banks/IM.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Personal,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://www.hanacard.co.kr/',
    },
    {
        displayName: '케이뱅크',
        param: CodefBankCode.K뱅크,
        logo: '/logo/banks/KBANK.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://www.hanacard.co.kr/OCM05000000C.web?schID=ccd&mID=OCM05000000C',
    },
    {
        displayName: '케이뱅크',
        param: CodefBankCode.K뱅크,
        logo: '/logo/banks/KBANK.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Personal,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://www.hanacard.co.kr/',
    },
    {
        displayName: '전북은행',
        param: CodefBankCode.전북은행,
        logo: '/logo/banks/JB.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://www.hanacard.co.kr/OCM05000000C.web?schID=ccd&mID=OCM05000000C',
    },
    {
        displayName: '전북은행',
        param: CodefBankCode.전북은행,
        logo: '/logo/banks/JB.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Personal,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://www.hanacard.co.kr/',
    },
    {
        displayName: '경남은행',
        param: CodefBankCode.경남은행,
        logo: '/logo/banks/BNK.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://www.hanacard.co.kr/OCM05000000C.web?schID=ccd&mID=OCM05000000C',
    },
    {
        displayName: '경남은행',
        param: CodefBankCode.경남은행,
        logo: '/logo/banks/BNK.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Personal,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://www.hanacard.co.kr/',
    },
    {
        displayName: '새마을금고',
        param: CodefBankCode.새마을금고,
        logo: '/logo/banks/SM.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://www.hanacard.co.kr/OCM05000000C.web?schID=ccd&mID=OCM05000000C',
    },
    {
        displayName: '새마을금고',
        param: CodefBankCode.새마을금고,
        logo: '/logo/banks/SM.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Personal,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://www.hanacard.co.kr/',
    },
    {
        displayName: '신협은행',
        param: CodefBankCode.신협은행,
        logo: '/logo/banks/SHB.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://www.hanacard.co.kr/OCM05000000C.web?schID=ccd&mID=OCM05000000C',
    },
    {
        displayName: '신협은행',
        param: CodefBankCode.신협은행,
        logo: '/logo/banks/SHB.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Personal,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://www.hanacard.co.kr/',
    },
    {
        displayName: '우체국',
        param: CodefBankCode.우체국,
        logo: '/logo/banks/UC.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://www.hanacard.co.kr/OCM05000000C.web?schID=ccd&mID=OCM05000000C',
    },
    {
        displayName: '우체국',
        param: CodefBankCode.우체국,
        logo: '/logo/banks/UC.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Personal,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://www.hanacard.co.kr/',
    },
    {
        displayName: '토스뱅크',
        param: CodefBankCode.토스뱅크,
        logo: '/logo/banks/TOSS.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://www.hanacard.co.kr/OCM05000000C.web?schID=ccd&mID=OCM05000000C',
    },
    {
        displayName: '토스뱅크',
        param: CodefBankCode.토스뱅크,
        logo: '/logo/banks/TOSS.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Personal,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://www.hanacard.co.kr/',
    },
    {
        displayName: '부산은행',
        param: CodefBankCode.부산은행,
        logo: '/logo/banks/BS.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://www.hanacard.co.kr/OCM05000000C.web?schID=ccd&mID=OCM05000000C',
    },
    {
        displayName: '부산은행',
        param: CodefBankCode.부산은행,
        logo: '/logo/banks/BS.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Personal,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://www.hanacard.co.kr/',
    },
    {
        displayName: '카카오뱅크',
        param: CodefBankCode.카카오뱅크,
        logo: '/logo/banks/KKO.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://www.hanacard.co.kr/OCM05000000C.web?schID=ccd&mID=OCM05000000C',
    },
    {
        displayName: '카카오뱅크',
        param: CodefBankCode.카카오뱅크,
        logo: '/logo/banks/KKO.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Personal,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://www.hanacard.co.kr/',
    },
    {
        displayName: 'SBI저축은행',
        param: CodefBankCode.SBI저축은행,
        logo: '/logo/banks/SBI.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://www.hanacard.co.kr/OCM05000000C.web?schID=ccd&mID=OCM05000000C',
    },
    {
        displayName: 'SBI저축은행',
        param: CodefBankCode.SBI저축은행,
        logo: '/logo/banks/SBI.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Personal,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://www.hanacard.co.kr/',
    },
    {
        displayName: '광주은행',
        param: CodefBankCode.광주은행,
        logo: '/logo/banks/KJ.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://www.hanacard.co.kr/OCM05000000C.web?schID=ccd&mID=OCM05000000C',
    },
    {
        displayName: '광주은행',
        param: CodefBankCode.광주은행,
        logo: '/logo/banks/KJ.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Personal,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://www.hanacard.co.kr/',
    },
    {
        displayName: '제주은행',
        param: CodefBankCode.제주은행,
        logo: '/logo/banks/JJ.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://www.hanacard.co.kr/OCM05000000C.web?schID=ccd&mID=OCM05000000C',
    },
    {
        displayName: '제주은행',
        param: CodefBankCode.제주은행,
        logo: '/logo/banks/JJ.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Personal,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://www.hanacard.co.kr/',
    },
];

/* TODO: bankStaticDataAlt */
export const bankStaticDataAlt = [
    {
        displayName: '기업 BC',
        param: '3K',
        ko: '기업비씨',
        en: 'IBK_BC',
    },
    {
        displayName: '광주은행',
        param: '46',
        ko: '광주',
        en: 'GWANGJUBANK',
    },
    {
        displayName: '롯데카드',
        param: '71',
        ko: '롯데',
        en: 'LOTTE',
    },
    {
        displayName: 'KDB산업은행',
        param: '30',
        ko: '산업',
        en: 'KDBBANK',
    },
    {
        displayName: 'BC카드',
        param: '31',
        ko: 'BC',
        en: 'BC',
    },
    {
        displayName: '삼성카드',
        param: '51',
        ko: '삼성',
        en: 'SAMSUNG',
    },
    {
        displayName: '새마을금고',
        param: '38',
        ko: '새마을',
        en: 'SAEMAUL',
    },
    {
        displayName: '신한카드',
        param: '41',
        ko: '신한',
        en: 'SHINHAN',
    },
    {
        displayName: '신협',
        param: '62',
        ko: '신협',
        en: 'SHINHYEOP',
    },
    {
        displayName: '씨티카드',
        param: '36',
        ko: '씨티',
        en: 'CITI',
    },
    {
        displayName: '우리BC카드(BC 매입)',
        param: '33',
        ko: '우리',
        en: 'WOORI',
    },
    {
        displayName: '우리카드(우리 매입)',
        param: 'W1',
        ko: '우리',
        en: 'WOORI',
    },
    {
        displayName: '우체국예금보험',
        param: '37',
        ko: '우체국',
        en: 'POST',
    },
    {
        displayName: '저축은행중앙회',
        param: '39',
        ko: '저축',
        en: 'SAVINGBANK',
    },
    {
        displayName: '전북은행',
        param: '35',
        ko: '전북',
        en: 'JEONBUKBANK',
    },
    {
        displayName: '제주은행',
        param: '42',
        ko: '제주',
        en: 'JEJUBANK',
    },
    {
        displayName: '카카오뱅크',
        param: '15',
        ko: '카카오뱅크',
        en: 'KAKAOBANK',
        logo: '/logo/cards/samsungcard.png',
        themeColor: '#034ea2',
    },
    {
        displayName: '케이뱅크',
        param: '3A',
        ko: '케이뱅크',
        en: 'KBANK',
    },
    {
        displayName: '토스뱅크',
        param: '24',
        ko: '토스뱅크',
        en: 'TOSSBANK',
    },
    {
        displayName: '하나카드',
        param: '21',
        ko: '하나',
        en: 'HANA',
    },
    {
        displayName: '현대카드',
        param: '61',
        ko: '현대',
        en: 'HYUNDAI',
    },
    {
        displayName: 'KB국민카드',
        param: '11',
        ko: '국민',
        en: 'KOOKMIN',
    },
    {
        displayName: 'NH농협카드',
        param: '91',
        ko: '농협',
        en: 'NONGHYEOP',
    },
    {
        displayName: 'Sh수협은행',
        param: '34',
        ko: '수협',
        en: 'SUHYEOP',
    },
    {
        displayName: '페이코',
        param: 'PCP',
        ko: 'PCP',
        en: 'PCP',
    },
    {
        displayName: 'KB증권',
        param: 'KBS',
        ko: 'KBS',
        en: 'KBS',
    },
];

export function getBankCompanyAlt(param: string) {
    return bankStaticDataAlt.find((d) => d.param === param);
}
