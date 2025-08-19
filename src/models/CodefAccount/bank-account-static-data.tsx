// ref: https://www.banksalad.com/chart/cards/cashback/past

import {plainToInstance} from 'class-transformer';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {getColor, palette} from '^components/util/palette';
import {CodefCompanyCode} from '^models/CodefAccount/type/CodefCompanyStaticData';
import {CodefBankCode, CodefCustomerType, CodefLoginType} from '^models/CodefAccount/type/enums';

export class BankAccountsStaticData {
    displayName: string;
    shortName: string;
    param: CodefBankCode;
    logo: string;
    themeColor: string;
    clientType: CodefCustomerType;
    loginType: CodefLoginType;
    loginPageUrl: string;

    static all(dataset = bankAccountsStaticData) {
        return plainToInstance(BankAccountsStaticData, dataset);
    }

    static bankOnly(dataset: {param: CodefCompanyCode}[]) {
        const items = dataset.filter((data) => {
            const bankCodes = Object.values(CodefBankCode) as string[];
            return bankCodes.includes(data.param);
        });
        return plainToInstance(BankAccountsStaticData, items);
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
        shortName: '농협',
        param: CodefBankCode.농협은행,
        logo: '/logo/banks/NH.png',
        themeColor: '#2b64ff',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.Certificate,
        loginPageUrl: 'https://ibz.nonghyup.com/servlet/ICCNP1000S.view',
    },
    {
        displayName: '농협은행',
        shortName: '농협',
        param: CodefBankCode.농협은행,
        logo: '/logo/banks/NH.png',
        themeColor: '#2b64ff',
        clientType: CodefCustomerType.Personal,
        loginType: CodefLoginType.Certificate,
        loginPageUrl: 'https://banking.nonghyup.com/servlet/IPCNPA000I.view',
    },
    {
        displayName: '기업은행',
        shortName: '기업',
        param: CodefBankCode.기업은행,
        logo: '/logo/banks/IBK.png',
        themeColor: '#2b64ff',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.Certificate,
        loginPageUrl: 'https://kiup.ibk.co.kr/uib/jsp/index.jsp',
    },
    {
        displayName: '기업은행',
        shortName: '기업',
        param: CodefBankCode.기업은행,
        logo: '/logo/banks/IBK.png',
        themeColor: '#2b64ff',
        clientType: CodefCustomerType.Personal,
        loginType: CodefLoginType.Certificate,
        loginPageUrl: 'https://mybank.ibk.co.kr/uib/jsp/index.jsp',
    },
    {
        displayName: 'KDB산업은행',
        shortName: '산업',
        param: CodefBankCode.산업은행,
        logo: '/logo/banks/SU.png',
        themeColor: '#e30614',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.Certificate,
        loginPageUrl: 'https://banking.kdb.co.kr/be/index.jsp',
    },
    {
        displayName: 'KDB산업은행',
        shortName: '산업',
        param: CodefBankCode.산업은행,
        logo: '/logo/banks/SU.png',
        themeColor: '#e30614',
        clientType: CodefCustomerType.Personal,
        loginType: CodefLoginType.Certificate,
        loginPageUrl: 'https://banking.kdb.co.kr/bp/',
    },
    {
        displayName: '국민은행',
        shortName: '국민',
        param: CodefBankCode.국민은행,
        logo: '/logo/banks/KB.png',
        themeColor: '#60584c',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.Certificate,
        loginPageUrl: 'https://biz.kbcard.com/CXERCZZC0001.cms?czone=CXORMPIC0001_TOP_%B1%E2%BE%F7',
    },
    {
        displayName: '국민은행',
        shortName: '국민',
        param: CodefBankCode.국민은행,
        logo: '/logo/banks/KB.png',
        themeColor: '#60584c',
        clientType: CodefCustomerType.Personal,
        loginType: CodefLoginType.Certificate,
        loginPageUrl: 'https://card.kbcard.com/CMN/DVIEW/HOAMCXPRIZZC0002',
    },
    {
        displayName: '수협은행',
        shortName: '수협',
        param: CodefBankCode.수협은행,
        logo: '/logo/banks/SHP.png',
        themeColor: '#f14755',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.Certificate,
        loginPageUrl: 'https://biz.suhyup-bank.com/',
    },
    {
        displayName: '수협은행',
        shortName: '수협',
        param: CodefBankCode.수협은행,
        logo: '/logo/banks/SHP.png',
        themeColor: '#f14755',
        clientType: CodefCustomerType.Personal,
        loginType: CodefLoginType.Certificate,
        loginPageUrl: 'https://www.suhyup-bank.com/',
    },
    {
        displayName: '하나은행',
        shortName: '하나',
        param: CodefBankCode.KEB하나은행,
        logo: '/logo/banks/HN.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.Certificate,
        loginPageUrl: 'https://biz.kebhana.com/index.jsp',
    },
    {
        displayName: '하나은행',
        shortName: '하나',
        param: CodefBankCode.KEB하나은행,
        logo: '/logo/banks/HN.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Personal,
        loginType: CodefLoginType.Certificate,
        loginPageUrl: 'https://www.hanabank.com/common/login.do#//HanaBank',
    },
    {
        displayName: '신한은행',
        shortName: '신한',
        param: CodefBankCode.신한은행,
        logo: '/logo/banks/SHN.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.Certificate,
        loginPageUrl: 'https://bizbank.shinhan.com/main.html',
    },
    {
        displayName: '신한은행',
        shortName: '신한',
        param: CodefBankCode.신한은행,
        logo: '/logo/banks/SHN.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Personal,
        loginType: CodefLoginType.Certificate,
        loginPageUrl: 'https://bank.shinhan.com/index.jsp#011100000000',
    },
    {
        displayName: 'SC제일은행',
        shortName: '제일',
        param: CodefBankCode.SC은행,
        logo: '/logo/banks/SC.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.Certificate,
        loginPageUrl: 'https://bb.standardchartered.co.kr/login/lgn11000mp.mnu',
    },
    {
        displayName: 'SC제일은행',
        shortName: '제일',
        param: CodefBankCode.SC은행,
        logo: '/logo/banks/SC.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Personal,
        loginType: CodefLoginType.Certificate,
        loginPageUrl: 'https://open.standardchartered.co.kr/login/index',
    },
    {
        displayName: '우리은행',
        shortName: '우리',
        param: CodefBankCode.우리은행,
        logo: '/logo/banks/WR.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.Certificate,
        loginPageUrl: 'https://nbi.wooribank.com/nbi/woori?withyou=bi',
    },
    {
        displayName: '우리은행',
        shortName: '우리',
        param: CodefBankCode.우리은행,
        logo: '/logo/banks/WR.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Personal,
        loginType: CodefLoginType.Certificate,
        loginPageUrl:
            'https://spib.wooribank.com/pib/Dream?withyou=CMLGN0001&target=https://spib.wooribank.com/pib/Dream?withyou=ps',
    },
    {
        displayName: '씨티은행',
        shortName: '씨티',
        param: CodefBankCode.씨티은행,
        logo: '/logo/banks/CITI.png',
        themeColor: '#066bae',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.Certificate,
        loginPageUrl: 'https://koreacitidirect.citigroup.com/index.jsp',
    },
    {
        displayName: '씨티은행',
        shortName: '씨티',
        param: CodefBankCode.씨티은행,
        logo: '/logo/banks/CITI.png',
        themeColor: '#066bae',
        clientType: CodefCustomerType.Personal,
        loginType: CodefLoginType.Certificate,
        loginPageUrl: 'https://www.citibank.co.kr/ComLognLogn0100.act',
    },
    {
        displayName: 'IM뱅크(대구은행)',
        shortName: '대구',
        param: CodefBankCode.대구은행,
        logo: '/logo/banks/IM.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.Certificate,
        loginPageUrl: 'https://banking.imbank.co.kr/index.jsp',
    },
    {
        displayName: 'IM뱅크(대구은행)',
        shortName: '대구',
        param: CodefBankCode.대구은행,
        logo: '/logo/banks/IM.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Personal,
        loginType: CodefLoginType.Certificate,
        loginPageUrl: 'https://banking.imbank.co.kr/index.jsp',
    },
    {
        displayName: '케이뱅크',
        shortName: '케이뱅크',
        param: CodefBankCode.K뱅크,
        logo: '/logo/banks/KBANK.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.Certificate,
        loginPageUrl: 'https://biz.kbanknow.com/ib20/mnu/CBKCOM020100',
    },
    // {
    //     displayName: '케이뱅크',
    //     shortName: '케이뱅크',
    //     param: CodefBankCode.K뱅크,
    //     logo: '/logo/banks/KBANK.png',
    //     themeColor: '#008485',
    //     clientType: CodefCustomerType.Personal,
    //     loginType: CodefLoginType.Certificate,
    //     loginPageUrl: 'https://www.hanacard.co.kr/',
    // },
    {
        displayName: '전북은행',
        shortName: '전북',
        param: CodefBankCode.전북은행,
        logo: '/logo/banks/JB.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.Certificate,
        loginPageUrl: 'https://ibs.jbbank.co.kr/',
    },
    {
        displayName: '전북은행',
        shortName: '전북',
        param: CodefBankCode.전북은행,
        logo: '/logo/banks/JB.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Personal,
        loginType: CodefLoginType.Certificate,
        loginPageUrl: 'https://ibs.jbbank.co.kr/',
    },
    {
        displayName: '경남은행',
        shortName: '경남',
        param: CodefBankCode.경남은행,
        logo: '/logo/banks/BNK.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.Certificate,
        loginPageUrl: 'http://mnanum.knbank.co.kr/ib20/mnu/CMMLGI001001001',
    },
    {
        displayName: '경남은행',
        shortName: '경남',
        param: CodefBankCode.경남은행,
        logo: '/logo/banks/BNK.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Personal,
        loginType: CodefLoginType.Certificate,
        loginPageUrl: 'https://www.knbank.co.kr/ib20/mnu/CMMLGI001001001',
    },
    {
        displayName: '새마을금고',
        shortName: '새마을',
        param: CodefBankCode.새마을금고,
        logo: '/logo/banks/SM.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.Certificate,
        loginPageUrl: 'https://biz.kfcc.co.kr/ib20/mnu/CIB000000000110',
    },
    {
        displayName: '새마을금고',
        shortName: '새마을',
        param: CodefBankCode.새마을금고,
        logo: '/logo/banks/SM.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Personal,
        loginType: CodefLoginType.Certificate,
        loginPageUrl: 'https://ibs.kfcc.co.kr/LOGN/02/PIBLOGN020001',
    },
    {
        displayName: '신협은행',
        shortName: '신협',
        param: CodefBankCode.신협은행,
        logo: '/logo/banks/SHB.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.Certificate,
        loginPageUrl: 'https://bizbank.cu.co.kr/lgn/EI_LGN010101_01',
    },
    {
        displayName: '신협은행',
        shortName: '신협',
        param: CodefBankCode.신협은행,
        logo: '/logo/banks/SHB.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Personal,
        loginType: CodefLoginType.Certificate,
        loginPageUrl: 'https://openbank.cu.co.kr/',
    },
    {
        displayName: '우체국',
        shortName: '우체국',
        param: CodefBankCode.우체국,
        logo: '/logo/banks/UC.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.Certificate,
        loginPageUrl: 'https://www.epostbank.go.kr/LNLNDM00DM.do',
    },
    {
        displayName: '우체국',
        shortName: '우체국',
        param: CodefBankCode.우체국,
        logo: '/logo/banks/UC.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Personal,
        loginType: CodefLoginType.Certificate,
        loginPageUrl: 'https://www.epostbank.go.kr/LNLNDM00DM.do',
    },
    {
        displayName: '토스뱅크',
        shortName: '토스',
        param: CodefBankCode.토스뱅크,
        logo: '/logo/banks/TOSS.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.Certificate,
        loginPageUrl: 'https://biz.tossbank.com/login',
    },
    {
        displayName: '토스뱅크',
        shortName: '토스',
        param: CodefBankCode.토스뱅크,
        logo: '/logo/banks/TOSS.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Personal,
        loginType: CodefLoginType.Certificate,
        loginPageUrl: 'https://www.tossbank.com/',
    },
    {
        displayName: '부산은행',
        shortName: '부산',
        param: CodefBankCode.부산은행,
        logo: '/logo/banks/BS.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.Certificate,
        loginPageUrl:
            'https://ebank.busanbank.co.kr/ib20/mnu/PEBLIN0020001?NEXT_PAGE=ECBMPG000000000&NEXT_PARAMETER=b_page_id%3D%26ib20.persistent.lang.code%3D%26selectmenuid%3DECBMPG000000000&ib20_redirect_org_mnu=ECBMPG000000000',
    },
    {
        displayName: '부산은행',
        shortName: '부산',
        param: CodefBankCode.부산은행,
        logo: '/logo/banks/BS.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Personal,
        loginType: CodefLoginType.Certificate,
        loginPageUrl:
            'https://ibank.busanbank.co.kr/ib20/mnu/PEBLIN0010001?NEXT_PAGE=PEBMPG000000000&NEXT_PARAMETER=b_page_id%3D%26ib20.persistent.lang.code%3D%26selectmenuid%3DPEBMPG000000000&ib20_redirect_org_mnu=PEBMPG000000000',
    },
    {
        displayName: '카카오뱅크',
        shortName: '카카오',
        param: CodefBankCode.카카오뱅크,
        logo: '/logo/banks/KKO.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.Certificate,
        loginPageUrl: 'https://www.kakaobank.com/',
    },
    {
        displayName: '카카오뱅크',
        shortName: '카카오',
        param: CodefBankCode.카카오뱅크,
        logo: '/logo/banks/KKO.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Personal,
        loginType: CodefLoginType.Certificate,
        loginPageUrl: 'https://www.kakaobank.com/',
    },
    {
        displayName: 'SBI저축은행',
        shortName: 'SBI저축',
        param: CodefBankCode.SBI저축은행,
        logo: '/logo/banks/SBI.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.Certificate,
        loginPageUrl: 'https://www.sbisb.co.kr/bizlgn0010100.act',
    },
    {
        displayName: 'SBI저축은행',
        shortName: 'SBI저축',
        param: CodefBankCode.SBI저축은행,
        logo: '/logo/banks/SBI.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Personal,
        loginType: CodefLoginType.Certificate,
        loginPageUrl: 'https://www.sbisb.co.kr/lgn0010100.act',
    },
    {
        displayName: '광주은행',
        shortName: '광주',
        param: CodefBankCode.광주은행,
        logo: '/logo/banks/KJ.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.Certificate,
        loginPageUrl: 'https://cib.kjbank.com/ib20/mnu/BCB0000000001',
    },
    {
        displayName: '광주은행',
        shortName: '광주',
        param: CodefBankCode.광주은행,
        logo: '/logo/banks/KJ.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Personal,
        loginType: CodefLoginType.Certificate,
        loginPageUrl: 'https://pib.kjbank.com/ib20/mnu/CMMLGIN010101',
    },
    {
        displayName: '제주은행',
        shortName: '제주',
        param: CodefBankCode.제주은행,
        logo: '/logo/banks/JJ.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.Certificate,
        loginPageUrl: 'https://bank.jejubank.co.kr:6443/inbank/ws/pr/cm/PRCM01401.do',
    },
    {
        displayName: '제주은행',
        shortName: '제주',
        param: CodefBankCode.제주은행,
        logo: '/logo/banks/JJ.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Personal,
        loginType: CodefLoginType.Certificate,
        loginPageUrl: 'https://bank.jejubank.co.kr:6443/inbank/ws/pr/cm/PRCM01401.do',
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
        shortName: '광주',
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
        shortName: 'KDB산업',
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
        shortName: '전북',
        param: '35',
        ko: '전북',
        en: 'JEONBUKBANK',
    },
    {
        displayName: '제주은행',
        shortName: '제주',
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
        shortName: 'Sh수협',
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
