import {TypeCast} from '^types/utils/class-transformer';
import {TossPaymentsCardDto} from './TossPaymentsCard.dto';
import {CodefCardCompanyCode} from '^models/CodefAccount/type/enums';
import {cardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';

const CardCompanies = cardAccountsStaticData;

/**
 * 빌링키 등록 결과
 */
export class TossPaymentsBillingDto {
    mId: string;
    customerKey: string;
    @TypeCast(() => Date) authenticatedAt: Date;
    method: '카드';
    // private billingKey: string;
    cardCompany: string;
    cardNumber: string;
    @TypeCast(() => TossPaymentsCardDto) card: TossPaymentsCardDto;

    asCardCompany() {
        const dic: Record<string, CodefCardCompanyCode> = {
            신한: CodefCardCompanyCode.신한카드,
            롯데: CodefCardCompanyCode.롯데카드,
            국민: CodefCardCompanyCode.KB국민카드,
            BC: CodefCardCompanyCode.BC카드,
            기업비씨: CodefCardCompanyCode.BC카드,
            하나: CodefCardCompanyCode.하나카드,
            삼성: CodefCardCompanyCode.삼성카드,
            우리: CodefCardCompanyCode.우리카드,
            현대: CodefCardCompanyCode.현대카드,
            농협: CodefCardCompanyCode.NH카드,
        };

        const param = dic[this.cardCompany.toUpperCase()];
        if (param) {
            return CardCompanies.find((c) => c.param === param);
        }
    }
}
