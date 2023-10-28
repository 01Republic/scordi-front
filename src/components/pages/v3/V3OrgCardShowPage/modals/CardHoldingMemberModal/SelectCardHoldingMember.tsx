import {UseFormReturn} from 'react-hook-form';
import {useEffect} from 'react';
import {TeamMemberDto} from '^types/team-member.type';
import {useTeamMembers} from '^hooks/useTeamMembers';
import {cardIdParamState, orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {HoldingMemberIdDto} from '^v3/V3OrgCardShowPage/modals/CardHoldingMemberModal/index';
import {CreatableSelect} from '^components/util/react-select/CreatableSelect';
import {useCreditCardsOfOrganization} from '^hooks/useCreditCards';
import {TeamMemberSelectOption as Option} from '^v3/V3OrgCardShowPage/modals/CardHoldingMemberModal/TeamMemberSelectOption';

interface SelectCardHoldingMemberProps {
    form: UseFormReturn<HoldingMemberIdDto>;
}
export const SelectCardHoldingMember = (props: SelectCardHoldingMemberProps) => {
    const orgId = useRouterIdParamState('orgId', orgIdParamState);
    const cardId = useRouterIdParamState('cardId', cardIdParamState);
    const {CreditCard} = useCreditCardsOfOrganization(true);
    const {search, createByName} = useTeamMembers(orgId);
    const {form} = props;

    useEffect(() => {
        if (!cardId || !CreditCard) return;
        const card = CreditCard.findById(cardId);

        if (card?.holdingMemberId) {
            form.setValue('holdingMemberId', card.holdingMemberId);
        }
    }, [cardId, CreditCard]);

    const toOption = (teamMember: TeamMemberDto): Option => ({
        label: teamMember.name,
        value: teamMember.id,
    });

    const loader = async (inputValue?: string) => {
        const {items: teamMembers} = await search({});

        return teamMembers
            .filter((teamMember) => {
                if (!inputValue || inputValue === '') return true;
                const value = (inputValue || '').toLowerCase();
                if (teamMember.name?.toLowerCase().includes(value)) return true;
                if (teamMember.email?.toLowerCase().includes(value)) return true;

                return false;
            })
            .map(toOption);
    };

    const onSelect = (option: Option) => form.setValue('holdingMemberId', option.value);

    const onCreate = (option: Option) =>
        createByName(option.label).then((teamMember) => form.setValue('holdingMemberId', teamMember.id));

    const onRemove = () => form.setValue('holdingMemberId', null);

    const onClear = () => form.setValue('holdingMemberId', null);

    return (
        <CreatableSelect<Option>
            toOption={toOption}
            loader={loader}
            onChangeCallbacks={{onSelect, onCreate, onRemove, onClear}}
        />
    );
};
