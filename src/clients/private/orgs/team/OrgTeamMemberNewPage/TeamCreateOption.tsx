import {memo} from 'react';
import {SelectOptionProps} from '^v3/share/modals/_presenters/SelectInput';
import {CreateTeamDto, TeamDto} from '^models/Team/type';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import Select, {GroupBase, components, StylesConfig} from 'react-select';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {getColor, palette} from '^components/util/palette';
import {teamApi} from '^models/Team/api';
import {toast} from 'react-hot-toast';

interface TeamCreateOptionProps extends SelectOptionProps<{label: string; value: string}> {
    reload?: () => any;
}

export const TeamCreateOption = memo((props: TeamCreateOptionProps) => {
    const orgId = useRecoilValue(orgIdParamState);
    const {reload, data, isFocused, isSelected, setValue} = props;

    const onClick = () => {
        teamApi.create(orgId, {name: data.value}).then((res) => {
            reload && reload();
            // @ts-ignore
            setValue({label: res.data.name, value: res.data}, 'select-option');
            toast.success('새로운 팀을 추가했어요');
        });
    };

    return (
        <components.Option {...props}>
            <div className="px-[8px]">
                <div
                    className={`flex items-center justify-between py-1.5 px-2 rounded-md cursor-pointer transition-all btn-animation ${
                        isFocused ? 'bg-gray-100' : ''
                    } hover:bg-gray-100 active:bg-sky-100 group`}
                    onClick={onClick}
                >
                    <div className="flex items-center gap-2 text-14">
                        <span>생성</span>
                        <TagUI className={getColor(0, palette.notionColors)}>{data.value}</TagUI>
                    </div>
                </div>
            </div>
        </components.Option>
    );
});
TeamCreateOption.displayName = 'TeamCreateOption';
