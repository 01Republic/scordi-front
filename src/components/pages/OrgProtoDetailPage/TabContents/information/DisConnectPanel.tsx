import {memo} from 'react';
import Swal from 'sweetalert2';
import {ContentPanel, ContentPanelMiniTitle} from '^layouts/ContentLayout';

export const DisConnectPanel = memo(() => {
    const connectionDesc =
        `Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi corrupti exercitationem alias doloribus quam non magni ducimus, nam inventore sunt, officiis commodi, tempora sed voluptatibus consectetur enim fugit? Placeat, dolores.`.trim();

    const onDisconnect = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'If you disconnect, It will be difficult to manage the app.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Disconnect',
        }).then((result) => {
            if (result.isConfirmed) {
                //TODO  : params로 apps의 id 보내서 delete 하기
                Swal.fire('Disconnect!', 'Please go to the site and cancel the subscription.', 'success');
            }
        });
    };

    return (
        <ContentPanel>
            <ContentPanelMiniTitle>Disconnections</ContentPanelMiniTitle>
            <div
                className="text-sm whitespace-pre-line mb-5 text-gray-500"
                dangerouslySetInnerHTML={{__html: connectionDesc}}
            />
            <div className="flex gap-2">
                <button className="ContentLayout--ContentButton btn-sm  btn-secondary" onClick={onDisconnect}>
                    Disconnect
                </button>
            </div>
        </ContentPanel>
    );
});
