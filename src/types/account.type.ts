import {OrganizationDto} from '^types/organization.type';
import {ProductDto} from '^types/product.type';
import {WorkspaceDto} from '^types/workspace.type';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {TypeCast} from '^types/utils/class-transformer';
import {crawlerSign} from '^config/environments';
import CryptoJS from 'crypto-js';

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

export class UnSignedAccountFormData {
    productId: number;
    email: string;
    password: string;

    get sign(): string {
        const json = JSON.stringify({email: this.email, password: this.password});
        return CryptoJS.AES.encrypt(json, crawlerSign).toString();
    }
}

export type CreateAccountDto = {
    sign: string;
    productId: number;
};

export type UpdateAccountDto = {
    sign: string;
    connectSession: ConnectSession;
};
