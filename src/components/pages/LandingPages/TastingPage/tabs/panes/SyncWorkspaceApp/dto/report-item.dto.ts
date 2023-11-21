import {ReportItemAppDto} from './report-item-app.dto';
import {TypeCast} from '^types/utils/class-transformer';

export class ReportItemDto {
    email: string;

    @TypeCast(() => ReportItemAppDto)
    apps: ReportItemAppDto[];
}
