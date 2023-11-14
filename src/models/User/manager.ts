import {BasicManager} from '^models/BasicManager';
import {UserDto} from '^types/user.type';

export class UserManager extends BasicManager<UserDto> {
    exceptAdmin() {
        return this.filter<UserManager>((user) => !user.isAdmin);
    }
}
