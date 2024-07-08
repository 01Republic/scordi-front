import {useRouter} from 'next/router';
import {WithChildren} from '^types/global.type';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {RecoilState, useRecoilState} from 'recoil';
import {useCurrentOrg} from '^models/Organization/hook';
import React, {useEffect} from 'react';
import {AxiosResponse} from 'axios';

interface ShowRoutingPageProps<T> extends WithChildren {
    subjectIdParamKey: string;
    subjectIdParamAtom: RecoilState<number>;
    subjectAtom: RecoilState<T | null>;

    endpoint: (subjectId: number, orgId: number) => Promise<AxiosResponse<T, any>>;
}

export function ShowRoutingPage<T>(props: ShowRoutingPageProps<T>) {
    const {subjectIdParamKey, subjectIdParamAtom, subjectAtom, endpoint, children} = props;
    const router = useRouter();
    const orgId = useRouterIdParamState('id', orgIdParamState);
    const subjectId = useRouterIdParamState(subjectIdParamKey, subjectIdParamAtom);
    useCurrentOrg(orgId);
    const [subject, setSubject] = useRecoilState(subjectAtom);

    useEffect(() => {
        if (!router.isReady) return;
        if (!orgId || isNaN(orgId)) return;
        if (!subjectId || isNaN(subjectId)) return;

        endpoint(subjectId, orgId).then((res) => {
            setSubject(res.data);
        });
    }, [router.isReady, orgId, subjectId]);

    if (!orgId || isNaN(orgId)) return <></>;
    if (!subjectId || isNaN(subjectId)) return <></>;
    if (!subject) return <></>;

    return <>{children}</>;
}
