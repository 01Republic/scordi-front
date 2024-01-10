import {ChangeEvent, memo} from 'react';
import {FormControl} from '^components/util/form-control/FormControl';
import {TextInput} from '^v3/share/modals/NewBillingHistoryModal/share/TextInput';
import {updateCurrentSubscriptionState, useCurrentSubscription} from '^v3/V3OrgAppShowPage/atom';
import {useSetRecoilState} from 'recoil';

export const AliasInput = memo(() => {
    const {currentSubscription} = useCurrentSubscription();
    const setFormData = useSetRecoilState(updateCurrentSubscriptionState);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e) return;

        const alias = e.target.value;
        setFormData((prev) => ({...prev, alias: alias}));
    };

    return (
        <FormControl topLeftLabel="어떤 별칭으로 등록할까요">
            <TextInput onChange={(e) => onChange(e)} defaultValue={currentSubscription?.alias}></TextInput>
        </FormControl>
    );
});
