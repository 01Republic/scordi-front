import React, {memo, useCallback} from 'react';
import {FormControl} from '^v3/V3OrgSettingsPage/InputText';
import {SelectDropdown, SelectOptionProps} from '^v3/share/Select';
import {DisplayCurrency} from '^types/membership.type';
import {useCurrentUser} from '^hooks/useCurrentUser';
import {patchMemberships} from '^api/membership.api';
import {toast} from 'react-toastify';

export const CurrencyInput = memo(() => {
    const {currentUserMembership} = useCurrentUser(null, {
        orgIdParam: 'orgId',
    });

    const currencyList = [
        {code: DisplayCurrency.KRW, text: `원 (${DisplayCurrency.KRW})`},
        {code: DisplayCurrency.USD, text: `달러 (${DisplayCurrency.USD})`},
    ];

    const onChange = useCallback(
        (opt: SelectOptionProps) => {
            const selectedCurrency = currencyList.find((c) => c.code === opt.value)!;
            console.log(selectedCurrency);
            if (!currentUserMembership) return;

            patchMemberships(currentUserMembership.id, {displayCurrency: selectedCurrency.code}).then(() => {
                // toast('저장되었습니다.');
            });
        },
        [currentUserMembership, currencyList],
    );

    if (!currentUserMembership) return <></>;

    return (
        <FormControl label="통화 설정">
            <SelectDropdown
                placeholder="통화 설정"
                options={currencyList.map((currency) => ({
                    value: currency.code,
                    text: currency.text,
                    selected: false,
                }))}
                onChange={onChange}
            />
        </FormControl>
    );
});