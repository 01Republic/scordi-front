import {memo, useCallback} from 'react';
import {useRouter} from 'next/router';
import {V3OrgHomePageRoute} from '^pages/v3/orgs/[orgId]';
import Image from 'next/image';
import {useRecoilValue} from 'recoil';
import {currentOrgAtom} from '^atoms/organizations.atom';
import {UserLoginPageRoute} from '^pages/users/login';

export const TopNavLogo = memo(() => {
    const currentOrg = useRecoilValue(currentOrgAtom);
    const router = useRouter();

    const onClick = useCallback(() => {
        const path = currentOrg ? V3OrgHomePageRoute.path(currentOrg.id) : UserLoginPageRoute.path();
        router.push(path);
    }, [currentOrg]);

    return (
        <a className="px-2 flex items-center cursor-pointer" onClick={onClick}>
            {/*<Image*/}
            {/*    src="/logo-transparent.png"*/}
            {/*    alt="Scordi logo"*/}
            {/*    width={30}*/}
            {/*    height={30}*/}
            {/*    className="relative top-1 mr-1"*/}
            {/*/>*/}
            <img
                src="/images/logo/scordi/logo-black-transparent-2.png"
                alt="Scordi logo"
                className="relative mr-1 w-[120px]"
            />
        </a>
    );
});
