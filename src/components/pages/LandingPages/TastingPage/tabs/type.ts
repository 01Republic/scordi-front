export class ReportDto {
    organizationId: number;
    workspaceName: string;
    items: {
        email: string;
        apps: {
            appName: string;
            lastAuthorizedTime: string;
        }[];
    }[];
    rawMetadata: {
        total: number;
    };
}
