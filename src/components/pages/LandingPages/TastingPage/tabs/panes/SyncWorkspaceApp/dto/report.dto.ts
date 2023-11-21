import {TypeCast} from '^types/utils/class-transformer';
import {ReportItemDto} from './report-item.dto';
import {ReportRawMetadataDto} from './report-raw-metadata.dto';

export class ReportDto {
    organizationId: number;
    workspaceName: string;

    @TypeCast(() => ReportItemDto)
    items: ReportItemDto[];

    @TypeCast(() => ReportRawMetadataDto)
    rawMetadata: ReportRawMetadataDto;
}
