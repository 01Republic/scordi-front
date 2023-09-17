import {AccountDto} from '^types/account.type';
import {
    WorkspaceProfileDto,
    WorkspaceBillingDto,
    WorkspaceBillingHistoryDto,
    WorkspaceMemberDto,
    WorkspaceItemDto,
} from '^types/crawler';

export type ConnectResultDto = {
    profile: WorkspaceProfileDto;
    billingInfo: WorkspaceBillingDto;
    billingHistories: WorkspaceBillingHistoryDto[];
    members: WorkspaceMemberDto[];
};

export type ConnectResultResponseDto = {
    data: ConnectResultDto;
    isSuccess: boolean;
    failed?: string[];
    account?: AccountDto | null;
};

export type ConnectWorkspaceResponseDto = {
    data: WorkspaceItemDto[];
    isSuccess: boolean;
    account?: AccountDto | null;
};
