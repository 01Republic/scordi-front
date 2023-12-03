import {TypeCast} from '^types/utils/class-transformer';
import {ReportItemDto} from '^components/pages/LandingPages/TastingPage/tabs/panes/SyncWorkspaceApp/dto/report-item.dto';

export class SaveTokenReportRequestDto {
    organizationId: number;
    workspaceName: string;

    @TypeCast(() => ReportItemDto)
    items: ReportItemDto[];
}
