import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {TeamDto} from '^models/Team/type';
import {TypeCast} from '^types/utils/class-transformer';

/**
 * "팀과 인보이스계정의 연결" 을 의미합니다.
 */
export class TeamInvoiceAccountDto {
    id: number;
    teamId: number;
    invoiceAccountId: number;
    @TypeCast(() => Date) createdAt: Date;
    @TypeCast(() => Date) updatedAt: Date;

    @TypeCast(() => TeamDto) team?: TeamDto;
    @TypeCast(() => InvoiceAccountDto) invoiceAccount?: InvoiceAccountDto;
}
