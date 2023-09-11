import {AccountDto} from '^types/account.type';
import {SubscriptionDto} from '^types/subscription.type';
import {ProductDto} from '^types/product.type';
import {OrganizationDto} from '^types/organization.type';

export type WorkspaceDto = {
    id: number;
    displayName: string;
    slug: string;
    profileImageUrl: string;
    roles: WorkspaceRole[];
    organizationId: number;
    organization: OrganizationDto;
    syncAccountId: number;
    syncAccount: AccountDto;
    productId: number;
    product: ProductDto;
    subscriptions?: SubscriptionDto[] | null;
};

export enum WorkspaceRoleType {
    OWNER = 'owner',
    ADMIN = 'admin',
    MEMBER = 'member',
    INVITED = 'invited',
}

export type WorkspaceRole = {
    id: number;
    accountId: number;
    account: AccountDto;
    workspaceId: number;
    workspace: WorkspaceDto;
    role: WorkspaceRoleType;
};
