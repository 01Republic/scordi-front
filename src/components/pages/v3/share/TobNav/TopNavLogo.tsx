import {memo} from 'react';
import {useRouter} from 'next/router';
import {V3OrgHomePageRoute} from '^pages/v3/orgs/[orgId]';
import Image from 'next/image';

export const TopNavLogo = memo(() => {
    const router = useRouter();

    const onClick = () => {
        router.push(V3OrgHomePageRoute.path(24));
    };

    return (
        <a className="px-2 flex items-center cursor-pointer" onClick={onClick}>
            <Image
                src="/logo-transparent.png"
                alt="Scordi logo"
                width={30}
                height={30}
                className="relative top-1 mr-1"
            />
        </a>
    );
});
