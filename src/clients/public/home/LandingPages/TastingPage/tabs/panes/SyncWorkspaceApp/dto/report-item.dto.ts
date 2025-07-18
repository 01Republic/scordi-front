import {ReportItemAppDto} from './report-item-app.dto';
import {TypeCast} from '^types/utils/class-transformer';

export class ReportItemDto {
    email: string;
    name: string;
    picture: string;

    @TypeCast(() => ReportItemAppDto)
    apps: ReportItemAppDto[];

    isPersisted = true;
    isEdited = false;

    appsInUniq() {
        return reportItemAppsInUniq(this.apps);
    }
}

export function reportItemAppsInUniq(apps: ReportItemAppDto[]) {
    const container: Record<string, ReportItemAppDto> = {};
    apps.forEach((app) => {
        container[app.key] ||= app;

        const lastAuthorizedTime = container[app.key].lastAuthorizedTime;

        if (
            app.lastAuthorizedTime &&
            lastAuthorizedTime &&
            lastAuthorizedTime.getTime() - app.lastAuthorizedTime.getTime() > 0
        ) {
            container[app.key] = app;
        }
    });

    return Object.values(container);
}
