import {TypeCast} from '^types/utils/class-transformer';
import {ReportRawMetadataDto} from '../../report-raw-metadata.dto';
import {ReportGroupedByProductItemDto} from './report.grouped-by-product-item.dto';

export class ReportGroupedByProductDto {
    organizationId?: number;
    workspaceName: string;

    @TypeCast(() => ReportGroupedByProductItemDto)
    items: ReportGroupedByProductItemDto[];

    @TypeCast(() => ReportRawMetadataDto)
    rawMetadata: ReportRawMetadataDto;
}
