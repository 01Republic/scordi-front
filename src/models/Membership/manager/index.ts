import {BasicManager} from '^models/BasicManager';
import {MembershipDto} from '^models/Membership/type';

export class MembershipManager extends BasicManager<MembershipDto> {
    organizations() {
        return this.unique('organizationId').map((membership) => membership.organization);
    }
}
