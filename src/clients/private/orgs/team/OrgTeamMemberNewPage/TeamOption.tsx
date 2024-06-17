import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {teamApi} from '^models/Team/api';
import {SelectOptionNotionStyledLayout, SelectOptionProps} from '^v3/share/modals/_presenters/SelectInput';
import {TeamTag} from '^models/Team/components/TeamTag';
import React, {memo} from 'react';
import {TeamDto} from '^models/Team/type';
import {toast} from 'react-hot-toast';
import {confirm2} from '^components/util/dialog';

interface TeamOptionProps extends SelectOptionProps<{label: string; value: TeamDto}> {
    reload?: () => any;
}

export const TeamOption = memo((props: TeamOptionProps) => {
    const orgId = useRecoilValue(orgIdParamState);
    const {reload, data, isFocused, isSelected} = props;
    const team: TeamDto | undefined = data?.value;

    const onDelete = async () => {
        if (!team || !orgId) return;

        const isConfirmed = await confirm2(
            `팀 '${team.name}'를 정말 삭제 할까요?`,
            <div>
                <p>이 작업은 취소 할 수 없습니다.</p>
                <p>확인 버튼을 누르면 삭제됩니다.</p>
            </div>,
        ).then((res) => res.isConfirmed);

        if (!isConfirmed) return;

        const req = teamApi.destroy(orgId, team.id);
        req.then(() => {
            reload && reload();
            toast.success('삭제되었습니다');
        });
        req.catch((err) => toast.error(err.message));
    };

    return (
        <SelectOptionNotionStyledLayout onDelete={onDelete} {...props}>
            <TeamTag id={data.value.id} name={data.label} />
        </SelectOptionNotionStyledLayout>
    );
});
