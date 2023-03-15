import {useRouter} from 'next/router';
import {memo} from 'react';
import {useRecoilState} from 'recoil';
import Swal from 'sweetalert2';
import {destroyApplication} from '^api/application.api';
import {applicationIdParamState} from '^atoms/common';
import {ContentPanel, ContentPanelMiniTitle} from '^layouts/ContentLayout';
import {OrgAppIndexPageRoute} from '^pages/orgs/[id]/apps';

export const DisConnectPanel = memo(() => {
    const [appId] = useRecoilState(applicationIdParamState);
    const router = useRouter();

    const onDisconnect = (id: number) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'If you disconnect, It will be difficult to manage the app.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#0066FF',
            confirmButtonText: 'Disconnect',
        }).then((result) => {
            console.log(result);
            if (!result.isConfirmed) return;
            destroyApplication(id)
                .then((res) => {
                    Swal.fire('Disconnect!', 'Please go to the site and cancel the subscription.', 'success').then(() =>
                        router.push(OrgAppIndexPageRoute.path(id)),
                    );
                })
                .catch((error) => {
                    if (error.code === 'ERR_BAD_REQUEST') {
                        Swal.fire('Permission Error', 'Please check you permission.', 'error');
                    }
                });
        });
    };
    const connectionDesc =
        `Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi corrupti exercitationem alias doloribus ,  Placeat, dolores.`.trim();

    return (
        <ContentPanel>
            <ContentPanelMiniTitle>Disconnections</ContentPanelMiniTitle>

            <div
                className="text-sm whitespace-pre-line mb-5 text-gray-500"
                dangerouslySetInnerHTML={{__html: connectionDesc}}
            />

            <button className="ContentLayout--ContentButton btn-sm btn-error" onClick={() => onDisconnect(appId)}>
                Disconnect
            </button>
        </ContentPanel>
    );
});