import {PagedResourceAtoms, usePagedResource} from '^hooks/usePagedResource';
import {FindAllUserByAdminDto, UserDto} from '^models/User/types';
import {userManageApi} from '^models/User/api';
import {userListResultForAdminAtom} from '^models/User/atom';

export const useOrgUsersInAdmin = () => useUsersForAdmin(userListResultForAdminAtom);

const useUsersForAdmin = (atoms: PagedResourceAtoms<UserDto, FindAllUserByAdminDto>, mergeMode = false) => {
    return usePagedResource(atoms, {
        useOrgId: false,
        endpoint: (params) => userManageApi.index(params),
        getId: 'id',
        mergeMode,
    });
};
