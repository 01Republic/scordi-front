import {useEffect} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {currentOrgAtom, getOrgQuery} from '^models/Organization/atom';
import {organizationApi} from '^models/Organization/api';
import {AxiosError} from 'axios';
import {useAlert} from '^hooks/useAlert';
import {useRouter} from 'next/router';
import {UserLoginPageRoute} from '^pages/users/login';
import {getToken} from '^api/api';

export const useOrganization = () => useRecoilValue(getOrgQuery);

// side effect 발생으로 페이지 컴포넌트에서만 사용하기
export function useCurrentOrg(id: number) {
    const router = useRouter();
    const [currentOrg, setCurrentOrg] = useRecoilState(currentOrgAtom);
    const {alert} = useAlert();

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

        organizationApi
            .show(id, {
                relations: ['lastGoogleSyncHistory', 'lastGoogleSyncHistory.googleTokenData'],
            })
            .then((res) => setCurrentOrg(res.data))
            .catch((e: AxiosError) => {
                console.log(e.response?.status == 401);
                if (e.response?.status == 401) {
                    alert.error('조직을 찾을 수 없습니다', '올바른 접근인지 확인해주세요');
                }
            });
    }, [id, currentOrg]);

    return {currentOrg, setCurrentOrg};
}
