import { api } from '^api/api';
import { CreateMembershipRequestDto, MembershipDto } from '^types/membershipTypes';

export const createMembership = (data: CreateMembershipRequestDto) => {
  return api.post<MembershipDto>('/memberships', data);
}
