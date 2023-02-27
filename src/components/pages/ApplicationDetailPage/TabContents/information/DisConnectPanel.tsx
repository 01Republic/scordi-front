import {memo} from 'react';
import {useRecoilState} from 'recoil';
import Swal from 'sweetalert2';
import {destroyApplication} from '^api/application.api';
import {applicationIdParamState, prototypeIdParamsState} from '^atoms/common';
import {ContentPanel, ContentPanelMiniTitle} from '^layouts/ContentLayout';
import {errorNotify} from '^utils/toast-notify';

const onDisconnect = (id: number) => {
    Swal.fire({
        title: 'Are you sure?',
        text: 'If you disconnect, It will be difficult to manage the app.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0066FF',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Disconnect',
    })
        .then((result) => {
            destroyApplication(id).then((res) => {
                console.log('💖===>', res);
                if (result.isConfirmed) {
                    Swal.fire('Disconnect!', 'Please go to the site and cancel the subscription.', 'success');
                } else if (result.isConfirmed === false) {
                    //TODO : 해지불가할때 알림 설정하기
                    Swal.fire('Disconnect!', 'Please go to the site and cancel the subscription.', 'success');
                }
            });
            // .catch(errorNotify);
        })
        .catch(errorNotify);
};

export const DisConnectPanel = memo(() => {
    const [appId] = useRecoilState(applicationIdParamState);

    const connectionDesc =
        `Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi corrupti exercitationem alias doloribus quam non magni ducimus, nam inventore sunt, officiis commodi, tempora sed voluptatibus consectetur enim fugit? Placeat, dolores.`.trim();

    return (
        <ContentPanel>
            <ContentPanelMiniTitle>Disconnections</ContentPanelMiniTitle>
            <div
                className="text-sm whitespace-pre-line mb-5 text-gray-500"
                dangerouslySetInnerHTML={{__html: connectionDesc}}
            />

            <button className="ContentLayout--ContentButton btn-sm  btn-secondary" onClick={() => onDisconnect(appId)}>
                Disconnect
            </button>
        </ContentPanel>
    );
});
