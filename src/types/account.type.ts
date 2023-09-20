import {OrganizationDto} from '^types/organization.type';
import {ProductDto} from '^types/product.type';
import {WorkspaceDto} from '^types/workspace.type';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {TypeCast} from '^types/utils/class-transformer';

export enum ConnectSession {
    IN_VERIFICATION = 'in_verification',
    SUCCESS = 'success',
    FAILURE = 'failure',
}

export class AccountDto {
    id: number;
    sign: string;
    productId: number;
    organizationId: number;

    @TypeCast(() => ProductDto)
    product: ProductDto;

    @TypeCast(() => WorkspaceDto)
    workspaces: WorkspaceDto[];

    @TypeCast(() => OrganizationDto)
    organization: OrganizationDto;
    connectSession: ConnectSession;
}

export type FindAllAccountsQueryDto = FindAllQueryDto<AccountDto> & {
    subscriptionId?: number;
};

export type CreateAccountDto = {
    sign: string;
    productId: number;
};

export type UpdateAccountDto = {
    sign: string;
    connectSession: ConnectSession;
};
