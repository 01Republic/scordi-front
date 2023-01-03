import {useRouter} from 'next/router';
import {useEffect, useMemo} from 'react';
import {useRecoilState} from 'recoil';
import {applicationsAtom} from '^atoms/applications.atom';
import {getApplications} from '^api/application.api';
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
