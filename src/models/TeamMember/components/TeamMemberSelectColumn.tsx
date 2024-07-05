import React, {memo, useState} from 'react';
import {TeamMemberDto, useTeamMembers} from '^models/TeamMember';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {SelectColumn} from '^v3/share/table/columns/SelectColumn';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {TeamMemberProfileOption} from './TeamMemberProfile';

interface TeamMemberSelectColumnProps {
    defaultValue?: TeamMemberDto;
    onChange: (teamMember?: TeamMemberDto) => PromiseLike<any>;
    optionListBoxTitle?: string;
    detachableOptionBoxTitle?: string;
    clearable?: boolean;
    className?: string;
}

export const TeamMemberSelectColumn = memo((props: TeamMemberSelectColumnProps) => {
    const organizationId = useRecoilValue(orgIdParamState);
    const {search} = useTeamMembers();
    const {className = '', onChange, optionListBoxTitle, detachableOptionBoxTitle, clearable = false} = props;
    const [selectedOption, setSelectedOption] = useState(props.defaultValue);

    const getOptions = async (keyword?: string) => {
        return search(
            {
                keyword,
                where: {organizationId},
                itemsPerPage: 0,
            },
            false,
            true,
        ).then((res) => res?.items || []);
    };

    const onSelect = async (teamMember: TeamMemberDto) => {
        if (onChange) await onChange(teamMember);
        setSelectedOption(teamMember);
    };

    const optionDetach = async () => {
        if (onChange) await onChange();
        setSelectedOption();
        return true;
    };

    return (
        <div className={`min-w-40 overflow-x-hidden ${className}`}>
            <SelectColumn
                value={selectedOption}
                getOptions={getOptions}
                ValueComponent={TeamMemberOption}
                valueOfOption={(member) => member.id}
                textOfOption={(member) => member.name}
                keywordFilter={(member, keyword) => member.name.includes(keyword)}
                onSelect={onSelect}
                inputDisplay
                inputPlainText
                optionWrapperClass="!py-1.5"
                optionListBoxTitle={optionListBoxTitle || `담당자를 변경할까요?`}
                optionDetach={optionDetach}
                detachableOptionBoxTitle={detachableOptionBoxTitle || `연결된 담당자`}
                EmptyComponent={() => <TagUI className="text-gray-300 w-40 !justify-start">비어있음</TagUI>}
            />
        </div>
    );
});
TeamMemberSelectColumn.displayName = 'TeamMemberSelectColumn';

const TeamMemberOption = memo((props: {value: TeamMemberDto | string}) => {
    const {value} = props;

    if (typeof value === 'string') {
        return <p>{value}</p>;
    }

    // return <MasterProfileOption member={value} />;
    return <TeamMemberProfileOption item={value} placeholder="관리자 없음" />;
});
