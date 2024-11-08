import {useEffect, useState} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {useRouter} from 'next/router';
import {useAlert} from '^hooks/useAlert';
import {getToken} from '^api/api';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {currentOrgAtom, currentOrgIsLoadingAtom, getCurrentOrgQueryAtom, getOrgQuery} from '^models/Organization/atom';
import {organizationApi} from '^models/Organization/api';
import {OrganizationDto} from '^models/Organization/type';
import {UserLoginPageRoute} from '^pages/users/login';
import {myMembershipApi} from '^models/Membership/api';
import {useCurrentUser} from '^models/User/hook';
import {OrgMainPageRoute} from '^pages/orgs/[id]';
import {signSavedMembershipIdAtom} from '^models/Membership/atom';

export const useOrganization = () => useRecoilValue(getOrgQuery);

// side effect 발생으로 페이지 컴포넌트에서만 사용하기
export function useCurrentOrg(id: number) {
    const router = useRouter();
    const [currentOrg, setCurrentOrg] = useRecoilState(currentOrgAtom);
    const [isLoading, setIsLoading] = useRecoilState(currentOrgIsLoadingAtom);
    const [query, setQuery] = useRecoilState(getCurrentOrgQueryAtom);
    const {currentUser} = useCurrentUser();
    const myMembership = currentUser?.findMembershipByOrgId(id);
    const [savedMembershipId, setSavedMembershipId] = useRecoilState(signSavedMembershipIdAtom);
    const {alert} = useAlert();

    const search = (orgId: number, params: FindAllQueryDto<OrganizationDto>, force?: boolean) => {
        new Promise((resolve, reject) => {
            setIsLoading(true);
            setQuery((oldQuery) => {
                const newQuery = {...params, id: orgId};
                if (!force && JSON.stringify(oldQuery) === JSON.stringify(newQuery)) return oldQuery;

                organizationApi
                    .show(orgId, params)
                    .then((res) => {
                        setCurrentOrg(res.data);
                        resolve(res);
                        return res.data;
                    })
                    .catch((e) => {
                        return alert
                            .error('조직을 찾을 수 없습니다', e.response.data.message)
                            .then((res) =>
                                res.isConfirmed && currentUser?.lastSignedOrgId
                                    ? router.replace(OrgMainPageRoute.path(currentUser.lastSignedOrgId))
                                    : router.replace('/'),
                            )
                            .then(() => reject(e));
                    });

                return newQuery;
            });
        }).finally(() => setIsLoading(false));
    };

    const updateLastSign = (membershipId: number) => {
        setSavedMembershipId((oldMembershipId) => {
            if (oldMembershipId === membershipId) return oldMembershipId;
            myMembershipApi.update(membershipId, {lastSignedAt: new Date()});
            return membershipId;
        });
    };

    const reload = () => search(id, query, true);

    const checkLogin = () => {
        const loginToken = getToken();
        if (!loginToken) {
            alert.error('로그인이 필요합니다!', '로그인 페이지로 이동할까요?').then((result) => {
                result.isConfirmed ? router.push(UserLoginPageRoute.path()) : router.back();
            });
            return false;
        }
        return !!loginToken;
    };

    useEffect(() => {
        if (!id || isNaN(id)) return;

        const signedIn = checkLogin();
        if (!signedIn) return;

        search(id, {
            relations: ['lastGoogleSyncHistory', 'lastGoogleSyncHistory.googleTokenData', 'invoiceAccounts'],
        });
    }, [id]);

    useEffect(() => {
        if (!myMembership) return;
        updateLastSign(myMembership.id);
    }, [myMembership]);

    return {currentOrg, setCurrentOrg, search, reload, isLoading};
}

export const useCurrentOrg2 = () => {
    const currentOrg = useRecoilValue(currentOrgAtom);

    return {currentOrg};
};
