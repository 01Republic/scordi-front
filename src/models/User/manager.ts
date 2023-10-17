import {BasicModel} from '^models/BasicModel';
import {UserDto} from '^types/user.type';

export class UserManager extends BasicModel<UserDto> {
    exceptAdmin() {
        return this.filter<UserManager>((user) => !user.isAdmin);
    }
}
