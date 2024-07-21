import {TypeCast} from '^types/utils/class-transformer';
import {TeamDto} from '^models/Team/type';
import {CreditCardDto} from '^models/CreditCard/type';

/**
 * "팀과 카드의 연결" 을 의미합니다.
 */
export class TeamCreditCardDto {
    id: number;
    teamId: number;
    creditCardId: number;
    @TypeCast(() => Date) createdAt: Date;
    @TypeCast(() => Date) updatedAt: Date;

    @TypeCast(() => TeamDto) team?: TeamDto;
    @TypeCast(() => CreditCardDto) creditCard?: CreditCardDto;
}
