// ref: https://www.banksalad.com/chart/cards/cashback/past

import {CodefCardCompanyCode, CodefCustomerType, CodefLoginType} from '^models/CodefAccount/type/enums';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {getColor, palette} from '^components/util/palette';
import {plainToInstance} from 'class-transformer';

export class CardAccountsStaticData {
    displayName: string;
    param: CodefCardCompanyCode;
    logo: string;
    themeColor: string;
    clientType: CodefCustomerType; //
    loginType: CodefLoginType; // 공인인증서는 아직 안쓰므로, 일단 id-pw 만 씁니다.
    loginPageUrl: string;

    static all() {
        return plainToInstance(CardAccountsStaticData, cardAccountsStaticData);
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

    static Tag(props: {company: CardAccountsStaticData}) {
        const {company} = props;
        const colorClass = getColor(0, palette.notionColors);
        return <TagUI>{company.displayName}</TagUI>;
    }
}

/** 카드사 로그인 계정을 통한 연동시, 카드사별 필요한 정적데이터 */
export const cardAccountsStaticData: CardAccountsStaticData[] = [
    {
        displayName: '씨티카드',
        param: CodefCardCompanyCode.씨티카드,
        logo: '/logo/cards/CITI.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://www.shinhancard.com/cconts/html/main.html',
    },
    {
        displayName: '씨티카드',
        param: CodefCardCompanyCode.씨티카드,
        logo: '/logo/cards/CITI.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Personal,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://koreacitidirect.citigroup.com/index.jsp',
    },
    {
        displayName: '신한카드',
        param: CodefCardCompanyCode.신한카드,
        logo: '/logo/cards/ShinHan.png',
        themeColor: '#2b64ff',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://www.shinhancard.com/cconts/html/main.html',
    },
    {
        displayName: '신한카드',
        param: CodefCardCompanyCode.신한카드,
        logo: '/logo/cards/ShinHan.png',
        themeColor: '#2b64ff',
        clientType: CodefCustomerType.Personal,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://www.shinhancard.com/pconts/html/main.html',
    },
    {
        displayName: '롯데카드',
        param: CodefCardCompanyCode.롯데카드,
        logo: '/logo/cards/lotte.png',
        themeColor: '#e30614',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://corp.lottecard.co.kr/app/LCMBRAA_V100.lc',
    },
    {
        displayName: '롯데카드',
        param: CodefCardCompanyCode.롯데카드,
        logo: '/logo/cards/lotte.png',
        themeColor: '#e30614',
        clientType: CodefCustomerType.Personal,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://www.lottecard.co.kr/app/LPMAIAA_V100.lc?LPTKN=',
    },
    {
        displayName: 'KB국민카드',
        param: CodefCardCompanyCode.KB국민카드,
        logo: '/logo/cards/KBCard.png',
        themeColor: '#60584c',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://biz.kbcard.com/CXORMPIC0001.cms',
    },
    {
        displayName: 'KB국민카드',
        param: CodefCardCompanyCode.KB국민카드,
        logo: '/logo/cards/KBCard.png',
        themeColor: '#60584c',
        clientType: CodefCustomerType.Personal,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://card.kbcard.com/CMN/DVIEW/HOAMCXPRIZZC0002',
    },
    {
        displayName: 'BC카드',
        param: CodefCardCompanyCode.BC카드,
        logo: '/logo/cards/BC.png',
        themeColor: '#f14755',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://wisebiz.bccard.com/app/corp/ComLoginActn.corp',
    },
    {
        displayName: 'BC카드',
        param: CodefCardCompanyCode.BC카드,
        logo: '/logo/cards/BC.png',
        themeColor: '#f14755',
        clientType: CodefCustomerType.Personal,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://www.bccard.com/app/card/MainActn.do',
    },
    {
        displayName: '하나카드',
        param: CodefCardCompanyCode.하나카드,
        logo: '/logo/cards/keb.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://www.hanacard.co.kr/OCM05000000C.web?schID=ccd&mID=OCM05000000C',
    },
    {
        displayName: '하나카드',
        param: CodefCardCompanyCode.하나카드,
        logo: '/logo/cards/keb.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Personal,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://www.hanacard.co.kr/',
    },
    {
        displayName: '삼성카드',
        param: CodefCardCompanyCode.삼성카드,
        logo: '/logo/cards/samsungcard.png',
        themeColor: '#034ea2',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://www.samsungcard.com/corporation/find-member/UHPCCO0115M0.jsp',
    },
    {
        displayName: '삼성카드',
        param: CodefCardCompanyCode.삼성카드,
        logo: '/logo/cards/samsungcard.png',
        themeColor: '#034ea2',
        clientType: CodefCustomerType.Personal,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://www.samsungcard.com/sme/main/USMECO0101M0.jsp?click=main_header_sme',
    },
    {
        displayName: '우리카드',
        param: CodefCardCompanyCode.우리카드,
        logo: '/logo/cards/woori.png',
        themeColor: '#a7d8f6',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://pc.wooricard.com/dcpc/yh2/main.do',
    },
    {
        displayName: '우리카드',
        param: CodefCardCompanyCode.우리카드,
        logo: '/logo/cards/woori.png',
        themeColor: '#a7d8f6',
        clientType: CodefCustomerType.Personal,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://pc.wooricard.com/dcpc/main.do',
    },
    {
        displayName: '현대카드',
        param: CodefCardCompanyCode.현대카드,
        logo: '/logo/cards/hyundaicard.png',
        themeColor: '#333c45',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://mycompany.hyundaicard.com/cm/mn/CMMN1001.do?_method=m',
    },
    {
        displayName: '현대카드',
        param: CodefCardCompanyCode.현대카드,
        logo: '/logo/cards/hyundaicard.png',
        themeColor: '#333c45',
        clientType: CodefCustomerType.Personal,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://img.hyundaicard.com/cpa/ma/CPAMA0101_01.hc',
    },
    {
        displayName: 'NH카드',
        param: CodefCardCompanyCode.NH카드,
        logo: '/logo/cards/nh.png',
        themeColor: '#0da842',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://nhbizcard.nonghyup.com/iccn0000i.act',
    },
    {
        displayName: 'NH카드',
        param: CodefCardCompanyCode.NH카드,
        logo: '/logo/cards/nh.png',
        themeColor: '#0da842',
        clientType: CodefCustomerType.Personal,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://card.nonghyup.com/IpCc0001M.act',
    },
];

export const cardsStaticDataAlt = [
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

export function getCardCompanyAlt(param: string) {
    return cardsStaticDataAlt.find((d) => d.param === param);
}
