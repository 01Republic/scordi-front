import React, {memo} from 'react';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {useOrgIdParam} from '^atoms/common';
import {CheckboxHandler} from '^hooks/useCheckboxHandler';
import {TeamMembershipDto} from '^models/TeamMembership/type';
import {confirm2, confirmed} from '^components/util/dialog';
import {useDestroyTeamMemberShips} from '^models/TeamMembership/hook/hook';

interface BulkRemoveButtonProps {
    checkboxHandler: CheckboxHandler<TeamMembershipDto>;
    reload?: () => any;
}

export const BulkRemoveButton = memo((props: BulkRemoveButtonProps) => {
    const orgId = useOrgIdParam();
    const {checkboxHandler, reload} = props;
    const {checkedItems} = checkboxHandler;
    const checkedCount = checkedItems.length;
    const countStr = checkedCount.toLocaleString();
    const {mutateAsync} = useDestroyTeamMemberShips(orgId);

    const onClick = () => {
        const deleteConfirm = () => {
            return confirm2(
                `${countStr}명의 구성원 연결을 해제할까요?`,
                <span>
                    이 작업은 취소할 수 없습니다.
                    <br />
                    <b>팀에서 제외</b>됩니다. <br />
                    그래도 연결을 해제 하시겠어요?
                </span>,
                'warning',
            );
        };

        confirmed(deleteConfirm())
            .then(() => {
                return mutateAsync(
                    checkedItems.map((item) => ({
                        teamId: item.teamId,
                        teamMemberId: item.teamMemberId,
                    })),
                );
            })
            .then(() => toast.success(`${countStr}명의 연결을 해제했어요.`))
            .then(() => reload && reload())
            .catch(errorToast);
    };

    return (
        <button
            type="button"
            onClick={onClick}
            className="btn btn-xs btn-gray btn-outline normal-case no-animation btn-animation"
        >
            팀에서 제외하기
        </button>
    );
});
BulkRemoveButton.displayName = 'BulkRemoveButton';
