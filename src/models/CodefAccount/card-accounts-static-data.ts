// ref: https://www.banksalad.com/chart/cards/cashback/past

import {CodefCardCompanyCode, CodefCustomerType, CodefLoginType} from '^models/CodefAccount/type/enums';

export class CardAccountsStaticData {
    displayName: string;
    param: CodefCardCompanyCode;
    logo: string;
    themeColor: string;
    clientType: CodefCustomerType; //
    loginType: CodefLoginType; // 공인인증서는 아직 안쓰므로, 일단 id-pw 만 씁니다.

    static findOne(param: string) {
        return cardAccountsStaticData.find((data) => data.param === param);
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
    },
    {
        displayName: '롯데카드',
        param: CodefCardCompanyCode.롯데카드,
        logo: '/logo/cards/lotte.png',
        themeColor: '#e30614',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.IdAccount,
    },
    {
        displayName: 'KB국민카드',
        param: CodefCardCompanyCode.KB국민카드,
        logo: '/logo/cards/KBCard.png',
        themeColor: '#60584c',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.IdAccount,
    },
    {
        displayName: 'BC카드',
        param: CodefCardCompanyCode.BC카드,
        logo: '/logo/cards/BC.png',
        themeColor: '#f14755',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.IdAccount,
    },
    {
        displayName: '하나카드',
        param: CodefCardCompanyCode.하나카드,
        logo: '/logo/cards/keb.png',
        themeColor: '#008485',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.IdAccount,
    },
    {
        displayName: '삼성카드',
        param: CodefCardCompanyCode.삼성카드,
        logo: '/logo/cards/samsungcard.png',
        themeColor: '#034ea2',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.IdAccount,
    },
    {
        displayName: '우리카드',
        param: CodefCardCompanyCode.우리카드,
        logo: '/logo/cards/woori.png',
        themeColor: '#a7d8f6',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.IdAccount,
    },
    {
        displayName: '현대카드',
        param: CodefCardCompanyCode.현대카드,
        logo: '/logo/cards/hyundaicard.png',
        themeColor: '#333c45',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.IdAccount,
    },
    {
        displayName: 'NH농협카드',
        param: CodefCardCompanyCode.NH카드,
        logo: '/logo/cards/nh.png',
        themeColor: '#0da842',
        clientType: CodefCustomerType.Business,
        loginType: CodefLoginType.IdAccount,
    },
];
