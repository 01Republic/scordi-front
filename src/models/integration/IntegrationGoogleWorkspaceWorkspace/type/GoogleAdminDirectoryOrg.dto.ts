export class GoogleAdminDirectoryOrgDto {
    kind: string;
    name: string;
    description: string;
    etag: string;
    blockInheritance: boolean;
    orgUnitId: string;
    orgUnitPath: string;
    parentOrgUnitId?: string;
    parentOrgUnitPath?: string;
}
