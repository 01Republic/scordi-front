import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {TeamDto} from '^models/Team/type';
import {TypeCast} from '^types/utils/class-transformer';

export class TeamInvoiceAccountDto {
    id: number;
    teamId: number;
    invoiceAccountId: number;
    @TypeCast(() => Date) createdAt: Date;
    @TypeCast(() => Date) updatedAt: Date;

    @TypeCast(() => TeamDto) team?: TeamDto;
    @TypeCast(() => InvoiceAccountDto) invoiceAccount?: InvoiceAccountDto;
}
