import {BasicManager} from '^models/BasicManager';
import {UserDto} from '^models/User/types';

export class UserManager extends BasicManager<UserDto> {
    exceptAdmin() {
        return this.filter<UserManager>((user) => !user.isAdmin);
    }
}
