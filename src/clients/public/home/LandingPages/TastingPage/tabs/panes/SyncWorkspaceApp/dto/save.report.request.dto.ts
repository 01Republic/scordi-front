import {TypeCast} from '^types/utils/class-transformer';
import {ReportItemDto} from '^tasting/tabs/panes/SyncWorkspaceApp/dto/report-item.dto';

export class SaveTokenReportRequestDto {
    organizationId: number;
    workspaceName: string;
    syncedEmail: string;

    @TypeCast(() => ReportItemDto)
    items: ReportItemDto[];
}
