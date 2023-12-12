import {AccountDto} from '^models/Account/types';
import {TeamMemberDto} from '^models/TeamMember/type';

export enum Permission {
    READ = 'READ',
    WRITE = 'WRITE',
    READ_WRITE = 'READ_WRITE',
}
export enum Role {
    Member = 'MEMBER',
    Creator = 'CREATOR',
    Owner = 'OWNER',
    Admin = 'ADMIN',
}

export type AccountPermissionDto = {
    id: number;
    accountId: number;
    account: AccountDto;
    teamMemberId: number;
    teamMember: TeamMemberDto;
    permission: Permission;
    role: Role;
};

export type CreateAccountPermissionDto = {
    accountId: number;
    teamMemberId: number;
    role?: Role | null;
};

export type UpdateAccountPermissionDto = {
    role?: Role | null;
};
