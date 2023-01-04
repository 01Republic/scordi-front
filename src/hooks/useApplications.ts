import {useRouter} from 'next/router';
import {useCallback, useEffect, useMemo} from 'react';
import {useRecoilState} from 'recoil';
import {applicationAtom, applicationsAtom} from '^atoms/applications.atom';
import {getApplication, getApplications} from '^api/application.api';
import {errorNotify} from '^utils/toast-notify';

export const useApplications = () => {
    const {query} = useRouter();
    const organizationId = useMemo(() => Number(query.id), [query.id]);
    const [applications, setApplications] = useRecoilState(applicationsAtom);

    useEffect(() => {
        if (!organizationId) return;

        getApplications({where: {organizationId}, order: {id: 'DESC'}})
            .then(({data}) => setApplications(data.items))
            .catch(errorNotify);
    }, [organizationId]);

    return {applications, setApplications};
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
