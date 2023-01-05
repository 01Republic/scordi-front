import {useRouter} from 'next/router';
import {useCallback, useEffect, useMemo} from 'react';
import {useRecoilState} from 'recoil';
import {applicationAtom, applicationsAtom} from '^atoms/applications.atom';
import {getApplication, getApplications} from '^api/application.api';
import {errorNotify} from '^utils/toast-notify';
import {makeFindAllResources} from '^hooks/lab/makeFindAllResources';

// 쿼리 파라미터를 자유롭게 조작하고 싶다면 이걸 쓰면 된다.
export const useApplicationsWithParams = makeFindAllResources({
    atom: applicationsAtom,
    fetcher: getApplications,
});

// 조직 앱 내에서 정해진 대로 쓴다면 이걸로도 많은 경우 충분하다.
export const useApplications = () => {
    const {query} = useRouter();
    const organizationId = Number(query.id) || null;
    const params = {where: {organizationId}, order: {id: 'DESC'}};
    const result = useApplicationsWithParams(params, [organizationId]);

    return result;
};

export const useApplication = (id: number | null) => {
    const [application, setApplication] = useRecoilState(applicationAtom);

    const fetchApplication = useCallback((id: number) => {
        getApplication(id)
            .then(({data}) => setApplication(data))
            .catch(errorNotify);
    }, []);

    useEffect(() => {
        if (!id) return;
        fetchApplication(id);
    }, [id]);

    return {application, fetchApplication};
};
