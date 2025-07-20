import {useOrgIdParam} from '^atoms/common';
import {teamApi} from '^models/Team/api';
import {SelectOptionNotionStyledLayout, SelectOptionProps} from '^v3/share/modals/_presenters/SelectInput';
import {TeamTag} from '^models/Team/components/TeamTag';
import React, {Dispatch, memo, SetStateAction} from 'react';
import {TeamDto} from '^models/Team/type';
import {toast} from 'react-hot-toast';
import {confirm2, prompt2} from '^components/util/dialog';
import {useTranslation} from 'next-i18next';

interface TeamOptionProps extends SelectOptionProps<{label: string; value: TeamDto}> {
    reload?: () => any;
}

export const TeamOption = memo((props: TeamOptionProps) => {
    const {t} = useTranslation('members');
    const orgId = useOrgIdParam();
    const {reload, data, getValue, setValue, clearValue, isFocused, isSelected} = props;
    const team: TeamDto | undefined = data?.value;

    const updateTeam = async () => {
        if (!team || !orgId || isNaN(orgId)) return;

        const result = await prompt2(t('team.editName') as string);
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
                toast.success(t('team.updateSuccess') as string);
            });
            req.catch((err) => toast.error(err.message));
        }
    };

    const deleteTeam = async () => {
        if (!team || !orgId || isNaN(orgId)) return;

        const isConfirmed = await confirm2(
            t('team.deleteConfirm.title', {name: team.name}) as string,
            <div>
                <p>{t('team.deleteConfirm.desc1') as string}</p>
                <p>{t('team.deleteConfirm.desc2') as string}</p>
            </div>,
        ).then((res) => res.isConfirmed);

        if (!isConfirmed) return;

        const req = teamApi.destroy(orgId, team.id);
        req.then(() => {
            reload && reload();
            const [value] = getValue().filter((option) => option.value.id !== team.id);
            value ? setValue(value, 'select-option') : clearValue();
            toast.success(t('team.deleteSuccess') as string);
        });
        req.catch((err) => toast.error(err.message));
    };

    return (
        <SelectOptionNotionStyledLayout onUpdate={updateTeam} onDelete={deleteTeam} {...props}>
            <TeamTag id={data.value.id} name={data.label} />
        </SelectOptionNotionStyledLayout>
    );
});
