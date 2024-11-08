export class Invitation {
    email: string;
    teamMemberId?: number;
}

export class CreateMembershipInviteDto {
    organizationId: number;
    invitations: Invitation[];
}
