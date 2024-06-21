// ref: https://www.banksalad.com/chart/cards/cashback/past

import {CodefCardCompanyCode, CodefCustomerType, CodefLoginType} from '^models/CodefAccount/type/enums';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {getColor, palette} from '^components/util/palette';

export class CardAccountsStaticData {
    displayName: string;
    param: CodefCardCompanyCode;
    logo: string;
    themeColor: string;
    clientType: CodefCustomerType; //
    loginType: CodefLoginType; // 공인인증서는 아직 안쓰므로, 일단 id-pw 만 씁니다.
    loginPageUrl: string;

    static findOne(param?: string) {
        return cardAccountsStaticData.find((data) => data.param === param);
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
        displayName: '신한카드',
        param: CodefCardCompanyCode.신한카드,
        logo: '/logo/cards/ShinHan.png',
        themeColor: '#2b64ff',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://www.shinhancard.com/cconts/html/main.html',
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
        displayName: 'KB국민카드',
        param: CodefCardCompanyCode.KB국민카드,
        logo: '/logo/cards/KBCard.png',
        themeColor: '#60584c',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://biz.kbcard.com/CXORMPIC0001.cms',
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
        displayName: '하나카드',
        param: CodefCardCompanyCode.하나카드,
        logo: '/logo/cards/keb.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://www.hanacard.co.kr/OCM05000000C.web?schID=ccd&mID=OCM05000000C',
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
        displayName: '우리카드',
        param: CodefCardCompanyCode.우리카드,
        logo: '/logo/cards/woori.png',
        themeColor: '#a7d8f6',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://pc.wooricard.com/dcpc/yh2/main.do',
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
        displayName: 'NH카드',
        param: CodefCardCompanyCode.NH카드,
        logo: '/logo/cards/nh.png',
        themeColor: '#0da842',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.IdAccount,
        loginPageUrl: 'https://nhbizcard.nonghyup.com/iccn0000i.act',
    },
];
