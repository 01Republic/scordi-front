import React, {useEffect} from 'react';
import {useRouter} from 'next/router';
import {pathRoute, pathReplace} from '^types/pageRoute.type';
import {AdminUsersPageRoute} from '^pages/admin/users';

export const AdminRootPageRoute = pathRoute({
    pathname: '/admin',
    path: () => pathReplace(AdminRootPageRoute.pathname, {}),
});

export default function AdminRootPage() {
    const router = useRouter();
    const redirectPath = AdminUsersPageRoute.path();

    useEffect(() => {
        if (!router.isReady) return;
        router.replace(redirectPath);
    }, [router.isReady]);

    return (
        <div className="h-[100vh] flex items-center justify-center">
            <div className="text-center">
                <p className="text-lg">스코디 어드민에 접속하는 중</p>
                <br />
                <br />
                <p className="text-lg font-semibold">X나 좋은 제품...</p>
                <p className="text-xl font-semibold">X나 좋은 서비스...</p>
                <p className="text-2xl font-semibold">최고의 SaaS 관리 서비스...</p>
                <br />
                <p className="text-lg font-semibold">ㅎ 까짓거 가보자고</p>
            </div>
        </div>
    );
}
