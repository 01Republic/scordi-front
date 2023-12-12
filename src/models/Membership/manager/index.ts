import {BasicManager} from '^models/BasicManager';
import {MembershipDto} from 'src/models/Membership/types';

export class MembershipManager extends BasicManager<MembershipDto> {
    organizations() {
        return this.unique('organizationId').map((membership) => membership.organization);
    }
}
