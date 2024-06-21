import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {teamApi} from '^models/Team/api';
import {SelectOptionNotionStyledLayout, SelectOptionProps} from '^v3/share/modals/_presenters/SelectInput';
import {TeamTag} from '^models/Team/components/TeamTag';
import React, {Dispatch, memo, SetStateAction} from 'react';
import {TeamDto} from '^models/Team/type';
import {toast} from 'react-hot-toast';
import {confirm2, prompt2} from '^components/util/dialog';

interface TeamOptionProps extends SelectOptionProps<{label: string; value: TeamDto}> {
    reload?: () => any;
}

export const TeamOption = memo((props: TeamOptionProps) => {
    const orgId = useRecoilValue(orgIdParamState);
    const {reload, data, getValue, setValue, clearValue, isFocused, isSelected} = props;
    const team: TeamDto | undefined = data?.value;

    const updateTeam = async () => {
        if (!team || !orgId || isNaN(orgId)) return;

        const result = await prompt2(`팀 이름을 수정합니다 (${team.name})`);
        if (result.isConfirmed && result.value) {
            const req = teamApi.update(orgId, team.id, {name: result.value});
            req.then((res) => {
                const updatedTeam = res.data;
                reload && reload();
                const currentSelected = getValue().find(({value}) => value.id === team.id);
                if (currentSelected) {
                    // @ts-ignore
                    setValue({label: updatedTeam.name, value: updatedTeam, isUpdated: true}, 'select-option');
                }
                toast.success('변경되었습니다');
            });
            req.catch((err) => toast.error(err.message));
        }
    };

    const deleteTeam = async () => {
        if (!team || !orgId || isNaN(orgId)) return;

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
            const [value] = getValue().filter((option) => option.value.id !== team.id);
            value ? setValue(value, 'select-option') : clearValue();
            toast.success('삭제되었습니다');
        });
        req.catch((err) => toast.error(err.message));
    };

    return (
        <SelectOptionNotionStyledLayout onUpdate={updateTeam} onDelete={deleteTeam} {...props}>
            <TeamTag id={data.value.id} name={data.label} />
        </SelectOptionNotionStyledLayout>
    );
});
