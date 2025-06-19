import {useRouter} from 'next/router';
import {WithChildren} from '^types/global.type';
import {orgIdParamState, useIdParam, useOrgIdParam, useRouterIdParamState} from '^atoms/common';
import {RecoilState, useRecoilState, useSetRecoilState} from 'recoil';
import {useCurrentOrg} from '^models/Organization/hook';
import React, {useEffect} from 'react';
import {AxiosResponse} from 'axios';
import {useUnmount} from '^hooks/useUnmount';

interface ShowRoutingPageProps<T> extends WithChildren {
    subjectIdParamKey: string;
    subjectIdParamAtom?: RecoilState<number>;
    subjectAtom: RecoilState<T | null>;

    endpoint: (subjectId: number, orgId: number) => Promise<AxiosResponse<T, any>>;
}

export function ShowRoutingPage<T>(props: ShowRoutingPageProps<T>) {
    const {subjectIdParamKey, subjectIdParamAtom, subjectAtom, endpoint, children} = props;
    useRouterIdParamState('id', orgIdParamState);
    if (subjectIdParamAtom) useRouterIdParamState(subjectIdParamKey, subjectIdParamAtom);
    const setSubjectId = subjectIdParamAtom ? useSetRecoilState(subjectIdParamAtom) : undefined;
    const setSubject = useSetRecoilState(subjectAtom);
    const orgId = useOrgIdParam();
    const subjectId = useIdParam(subjectIdParamKey);
    useCurrentOrg(orgId);

    useEffect(() => {
        if (!orgId || isNaN(orgId)) return;
        if (!subjectId || isNaN(subjectId)) return;

        endpoint(subjectId, orgId).then((res) => setSubject(res.data));
    }, [orgId, subjectId]);

    useUnmount(() => {
        setSubject(null);
        if (setSubjectId) setSubjectId(NaN);
    });

    return <>{children}</>;
}
