import React, {memo} from 'react';
import {MoreDropdown} from '^clients/private/_components/MoreDropdown';
import {IntegrationSlackMemberDto} from '^models/integration/IntegrationSlackMember/type/IntegrationSlackMember.dto';
import {confirm2, confirmed} from '^components/util/dialog';
import {integrationSlackMemberApi} from '^models/integration/IntegrationSlackMember/api';
import {useIdParam} from '^atoms/common';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';

interface MoreDropdownRemoveItemProps {
    item: IntegrationSlackMemberDto;
    reload?: () => any;
}

export const MoreDropdownRemoveItem = memo((props: MoreDropdownRemoveItemProps) => {
    const {item, reload} = props;
    const orgId = useIdParam('id');
    const workspaceId = item.integrationWorkspaceId;

    const onClick = () => {
        const removeConfirm = () => {
            return confirm2(
                '진짜 삭제할까요?',
                <div>
                    <p>
                        동기화를 통해 추후 다시 불러올 수 있습니다. <br />
                    </p>
                    <p>계속 진행할까요?</p>
                </div>,
            );
        };

        return confirmed(removeConfirm())
            .then(() => integrationSlackMemberApi.destroy(orgId, workspaceId, item.id))
            .then(() => toast.success('삭제했어요'))
            .then(() => reload && reload())
            .catch(errorToast);
    };

    return (
        <li>
            <MoreDropdown.ItemButton text="삭제" onClick={onClick} className="text-red-500 hover:bg-red-50" />
        </li>
    );
});
MoreDropdownRemoveItem.displayName = 'MoreDropdownRemoveItem';
