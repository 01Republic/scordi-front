import {ReportItemAppDto} from './report-item-app.dto';
import {TypeCast} from '^types/utils/class-transformer';

export class ReportItemDto {
    email: string;

    @TypeCast(() => ReportItemAppDto)
    apps: ReportItemAppDto[];

    isPersisted = true;
    isEdited = false;

    appsInUniq() {
        const container: Record<string, ReportItemAppDto> = {};
        this.apps.forEach((app) => {
            container[app.key] ||= app;
            if (container[app.key].lastAuthorizedTime.getTime() - app.lastAuthorizedTime.getTime() > 0) {
                container[app.key] = app;
            }
        });

        return Object.values(container);
    }
}
