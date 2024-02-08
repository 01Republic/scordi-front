import {useEffect} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {useRouter} from 'next/router';
import {useAlert} from '^hooks/useAlert';
import {getToken} from '^api/api';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {currentOrgAtom, getCurrentOrgQueryAtom, getOrgQuery} from '^models/Organization/atom';
import {organizationApi} from '^models/Organization/api';
import {OrganizationDto} from '^models/Organization/type';
import {UserLoginPageRoute} from '^pages/users/login';
import {myMembershipApi} from '^models/Membership/api';
import {useCurrentUser} from '^models/User/hook';
import {V3OrgHomePageRoute} from '^pages/v3/orgs/[orgId]';

export const useOrganization = () => useRecoilValue(getOrgQuery);

// side effect 발생으로 페이지 컴포넌트에서만 사용하기
export function useCurrentOrg(id: number) {
    const router = useRouter();
    const [currentOrg, setCurrentOrg] = useRecoilState(currentOrgAtom);
    const [query, setQuery] = useRecoilState(getCurrentOrgQueryAtom);
    const {currentUser} = useCurrentUser();
    const myMembership = currentUser?.findMemberShipByOrgId(id);
    const {alert} = useAlert();

    const search = (orgId: number, params: FindAllQueryDto<OrganizationDto>, force?: boolean) => {
        setQuery((oldQuery) => {
            if (!force && JSON.stringify(oldQuery) === JSON.stringify(params)) return oldQuery;

            const req = organizationApi.show(orgId, params);
            req.then((res) => setCurrentOrg(res.data));
            req.catch((e) => {
                return alert
                    .error('조직을 찾을 수 없습니다', e.response.data.message)
                    .then((res) =>
                        res.isConfirmed && currentUser?.lastSignedOrgId
                            ? router.replace(V3OrgHomePageRoute.path(currentUser.lastSignedOrgId))
                            : router.replace('/'),
                    );
            });

            return params;
        });
    };

    const reload = () => search(id, query, true);

    useEffect(() => {
        if (!id || isNaN(id)) return;
        if (currentOrg && currentOrg.id === id) return;

        const loginToken = getToken();
        if (!loginToken) {
            alert.error('로그인이 필요합니다!', '로그인 페이지로 이동할까요?').then((result) => {
                if (result.isConfirmed) {
                    router.push(UserLoginPageRoute.path());
                } else {
                    router.back();
                }
            });
            return;
        }

        search(id, {
            relations: ['lastGoogleSyncHistory', 'lastGoogleSyncHistory.googleTokenData', 'invoiceAccounts'],
        });

        if (!myMembership) return;

        // My Membership update
        myMembershipApi.update(myMembership.id, {lastSignedAt: new Date()});
    }, [id, currentOrg, currentUser]);

    return {currentOrg, setCurrentOrg, search, reload};
}
