import {UseFormReturn} from 'react-hook-form';
import {useEffect, useState} from 'react';
import {TeamMemberDto} from '^types/team-member.type';
import {useTeamMembers} from '^hooks/useTeamMembers';
import {orgIdParamState} from '^atoms/common';
import {CreatableSelect} from '^components/util/react-select/CreatableSelect';
import {TeamMemberSelectOption as Option} from '^components/pages/v3/V3OrgCardListPage/modals/CardHoldingMemberModal/TeamMemberSelectOption';
import {useMoveScroll} from '^hooks/useMoveScroll';
import {useRecoilValue} from 'recoil';
import {allTeamMemberSelector} from './atom';
import {UnSignedCreditCardFormData} from '^models/CreditCard/credit-cards.type';
import {cardIdParamState, creditCardListSelector} from '^models/CreditCard/atom';

interface SelectCardHoldingMemberProps {
    form: UseFormReturn<UnSignedCreditCardFormData>;
}
export const SelectCardHoldingMember = (props: SelectCardHoldingMemberProps) => {
    const orgId = useRecoilValue(orgIdParamState);
    const cardId = useRecoilValue(cardIdParamState);
    const cardSelector = useRecoilValue(creditCardListSelector);
    const [isShow, setIsShow] = useState(true);
    const [allTeamMembers, setAllTeamMembers] = useState<TeamMemberDto[]>([]);
    const teamMembers = useRecoilValue(allTeamMemberSelector);
    const {createByName} = useTeamMembers(orgId);
    const {selectRef, onScroll} = useMoveScroll();
    const {form} = props;

    useEffect(() => {
        if (!cardId || !cardSelector) return;
        const card = cardSelector.filter((card) => card.id === cardId)[0];

        if (card?.holdingMemberId) {
            form.setValue('holdingMemberId', card.holdingMemberId);
        }
    }, [cardId, cardSelector]);

    useEffect(() => {
        if (!isShow) return;

        setAllTeamMembers(teamMembers);
        setIsShow(false);
    }, [isShow]);

    const toOption = (teamMember: TeamMemberDto): Option => ({
        label: teamMember.name,
        value: teamMember.id,
    });

    const loader = async (inputValue?: string) => {
        return allTeamMembers
            .filter((teamMember) => {
                if (!inputValue || inputValue === '') return true;
                const value = (inputValue || '').toLowerCase();
                if (teamMember.name?.toLowerCase().includes(value)) return true;
                if (teamMember.email?.toLowerCase().includes(value)) return true;

                return false;
            })
            .map(toOption);
    };

    const defaultOptions = allTeamMembers.map(toOption);

    const onSelect = (option: Option) => form.setValue('holdingMemberId', option.value);

    const onCreate = (option: Option) =>
        createByName(option.label).then((teamMember) => {
            setAllTeamMembers((prev) => [...prev, teamMember]);
            form.setValue('holdingMemberId', teamMember.id);
        });

    const onRemove = () => form.setValue('holdingMemberId', null);

    const onClear = () => form.setValue('holdingMemberId', null);

    return (
        <div ref={selectRef} onClick={onScroll}>
            <CreatableSelect<Option>
                toOption={toOption}
                defaultOptions={defaultOptions}
                loader={loader}
                onChangeCallbacks={{onSelect, onCreate, onRemove, onClear}}
            />
        </div>
    );
};
