import React, {memo, useCallback, useEffect, useState} from 'react';
import {ContentTable} from '^layouts/ContentLayout';
import {ApplicationPrototypeDto, PrototypeConnectMethod} from '^types/applicationPrototype.type';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {applicationsState} from '^atoms/applications.atom';
import {usePrototypeSearch} from '^hooks/useApplicationPrototypes';
import {OrgProtoDetailPageRoute} from '^pages/orgs/[id]/prototypes/[protoId]';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {useRouter} from 'next/router';
import {currentUserAtom} from '^atoms/currentUser.atom';
import {GoPlug, GoPrimitiveDot} from 'react-icons/go';
import {BiLinkExternal} from 'react-icons/bi';
import {editingProtoTargetState} from '^components/pages/OrgAppIndexPage/modals/PrototypeEditModal';
import {ConnectMethod} from '^components/pages/OrgAddAppInfoPage/ConnectPanelV2/SelectConnectMethod';
import {deleteApplicationPrototype} from '^api/applicationPrototype.api';
import {errorNotify} from '^utils/toast-notify';
import {toast} from 'react-toastify';
import {connectPrototypeModalState, currentPrototypeState} from '^atoms/connectPrototypes.atom';

export const SearchResultTable = memo(() => {
    const {results: prototypes, mutation} = usePrototypeSearch();
    const {isAdmin} = useRecoilValue(currentUserAtom) || {};

    useEffect(() => {
        mutation();
    }, []);

    const thStyle = {width: '10%', minWidth: '100px'};

    return (
        <ContentTable
            thead={
                <tr>
                    <th className="w-[20%]">App</th>
                    <th>summary</th>
                    <th>home page url</th>
                    <th style={thStyle}>status</th>
                    <th style={thStyle}>
                        {isAdmin && (
                            <a href="#proto-create-modal" className="btn btn-xs capitalize btn-active btn-secondary">
                                new
                            </a>
                        )}
                    </th>
                </tr>
            }
        >
            {(prototypes || []).map((proto, i) => (
                <PrototypeItem
                    key={i}
                    proto={proto}
                    isAdmin={!!isAdmin}
                    onRemove={(proto) => {
                        if (!confirm('Are you sure?')) return;

                        deleteApplicationPrototype(proto.id)
                            .then(() => toast(`[${proto.name}] Successfully removed`))
                            .then(() => mutation())
                            .catch(errorNotify);
                    }}
                />
            ))}
        </ContentTable>
    );
});

interface PrototypeItemProps {
    proto: ApplicationPrototypeDto;
    isAdmin: boolean;
    onRemove: (proto: ApplicationPrototypeDto) => void;
}

const PrototypeItem = memo((props: PrototypeItemProps) => {
    const {proto, isAdmin, onRemove} = props;
    const isConnectModalOpen = useSetRecoilState(connectPrototypeModalState);
    const currentPrototype = useSetRecoilState(currentPrototypeState);
    const router = useRouter();
    const orgId = useRouterIdParamState('id', orgIdParamState);
    const apps = useRecoilValue(applicationsState);
    const setEditingProtoTarget = useSetRecoilState(editingProtoTargetState);
    const [isLive, setIsLive] = useState(false);
    const app = apps.find((app) => app.prototypeId === proto.id);

    useEffect(() => {
        setIsLive(proto.connectMethod !== PrototypeConnectMethod.PREPARE);
    }, [proto]);

    const clickConnectBtn = (proto: ApplicationPrototypeDto) => {
        if (app) return;
        isConnectModalOpen(true);
        currentPrototype(proto);
    };
    return (
        <tr>
            {/* App */}
            <td className="cursor-pointer" onClick={() => router.push(OrgProtoDetailPageRoute.path(orgId, proto.id))}>
                <div className="flex items-center">
                    <img src={proto.image} alt="" width={24} className="mr-4" />
                    <span>{proto.name}</span>
                </div>
            </td>
            {/* tagline */}
            <td>{proto.tagline}</td>
            {/* home page url */}
            <td>
                <a
                    href={proto.homepageUrl}
                    target="_blank"
                    className="link text-gray-400 inline-flex items-center gap-1"
                >
                    {proto.homepageUrl && (
                        <>
                            {proto.homepageUrl}
                            <BiLinkExternal size={11} />
                        </>
                    )}
                </a>
            </td>
            {/* status */}
            <td>
                {app ? (
                    <button
                        className="btn2 btn-sm gap-1 btn-green"
                        style={{flexWrap: 'nowrap'}}
                        onClick={() => clickConnectBtn(proto)}
                    >
                        <GoPrimitiveDot size={16} />
                        <span>{app.connectStatus}</span>
                    </button>
                ) : (
                    <button
                        className="btn2 btn-sm flex-nowrap gap-1 btn-primary"
                        onClick={() => clickConnectBtn(proto)}
                    >
                        <GoPlug size={16} />
                        <span>connect</span>
                    </button>
                )}
            </td>
            <td>
                {isAdmin && (
                    <div className="flex space-x-2">
                        <a
                            className="btn2 btn-sm"
                            href="#proto-edit-modal"
                            onClick={() => setEditingProtoTarget(proto)}
                        >
                            edit
                        </a>
                        {!isLive && (
                            <a
                                className="btn2 btn-sm"
                                // href="#proto-edit-modal"
                                onClick={() => onRemove(proto)}
                            >
                                remove
                            </a>
                        )}
                    </div>
                )}
            </td>
        </tr>
    );
});
