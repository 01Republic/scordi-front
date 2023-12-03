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

    sortItems() {
        return [...this.items].sort((a, b) => {
            const a1 = a.isNew ? 1 : 0;
            const b1 = b.isNew ? 1 : 0;
            if (b1 - a1 !== 0) return a1 - b1;
            return b.members.length - a.members.length;
        });
    }
}
