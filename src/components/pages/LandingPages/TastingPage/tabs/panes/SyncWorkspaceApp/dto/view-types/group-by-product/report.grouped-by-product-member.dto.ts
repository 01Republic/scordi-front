import {TypeCast} from '^types/utils/class-transformer';

export class ReportGroupedByProductMemberDto {
    email: string;
    @TypeCast(() => Date)
    lastAuthorizedTime: Date;
}
