import React, {memo} from 'react';
import {ContentTable} from '^layouts/ContentLayout';
import {ApplicationPrototypeDto} from '^types/applicationPrototype.type';
import {useRecoilValue} from 'recoil';
import {applicationsState} from '^atoms/applications.atom';
import {useApplicationPrototypes} from '^hooks/useApplicationPrototypes';

export const SearchResultTable = memo(() => {
    const {items: prototypes} = useApplicationPrototypes();

    return (
        <ContentTable
            thead={
                <tr>
                    <th>App</th>
                    <th>description</th>
                    <th>status</th>
                    <th></th>
                </tr>
            }
        >
            {(prototypes || []).map((proto, i) => (
                <PrototypeItem proto={proto} key={i} />
            ))}
        </ContentTable>
    );
});

const PrototypeItem = memo((props: {proto: ApplicationPrototypeDto}) => {
    const {proto} = props;
    const apps = useRecoilValue(applicationsState);
    const app = apps.find((app) => app.prototypeId === proto.id);

    return (
        <tr>
            <td>
                <div className="flex items-center">
                    <img src={proto.image} alt="" width={24} className="mr-4" />
                    <span>{proto.name}</span>
                </div>
            </td>
            <td></td>
            <td>
                <span className="badge badge-sm badge-success capitalize">{app?.connectStatus || 'pending'}</span>
            </td>
            <td>-</td>
        </tr>
    );
});
