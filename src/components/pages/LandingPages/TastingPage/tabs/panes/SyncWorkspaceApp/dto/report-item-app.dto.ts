import {TypeCast} from '^types/utils/class-transformer';

export class ReportItemAppDto {
    appName: string;
    @TypeCast(() => Date)
    lastAuthorizedTime: Date;
}
