import {useRouter} from 'next/router';
import {WithChildren} from '^types/global.type';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {RecoilState, useRecoilState, useSetRecoilState} from 'recoil';
import {useCurrentOrg} from '^models/Organization/hook';
import React, {useEffect} from 'react';
import {AxiosResponse} from 'axios';
import {useUnmount} from '^hooks/useUnmount';

interface ShowRoutingPageProps<T> extends WithChildren {
    subjectIdParamKey: string;
    subjectIdParamAtom: RecoilState<number>;
    subjectAtom: RecoilState<T | null>;

    endpoint: (subjectId: number, orgId: number) => Promise<AxiosResponse<T, any>>;
}

export function ShowRoutingPage<T>(props: ShowRoutingPageProps<T>) {
    const {subjectIdParamKey, subjectIdParamAtom, subjectAtom, endpoint, children} = props;
    const orgId = useRouterIdParamState('id', orgIdParamState);
    const subjectId = useRouterIdParamState(subjectIdParamKey, subjectIdParamAtom);
    const setSubjectId = useSetRecoilState(subjectIdParamAtom);
    const setSubject = useSetRecoilState(subjectAtom);
    useCurrentOrg(orgId);

    useEffect(() => {
        if (!orgId || isNaN(orgId)) return;
        if (!subjectId || isNaN(subjectId)) return;

        endpoint(subjectId, orgId).then((res) => setSubject(res.data));
    }, [orgId, subjectId]);

    useUnmount(() => {
        setSubject(null);
        setSubjectId(NaN);
    });

    if (!orgId || isNaN(orgId)) return <></>;
    if (!subjectId || isNaN(subjectId)) return <></>;

    return <>{children}</>;
}
