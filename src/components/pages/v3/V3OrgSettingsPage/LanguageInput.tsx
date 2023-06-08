import React, {memo, useCallback} from 'react';
import {SelectDropdown, SelectOptionProps} from '^v3/share/Select';
import {FormControl} from '^v3/V3OrgSettingsPage/InputText';
import {useCurrentUser} from '^hooks/useCurrentUser';
import {modifyUser} from '^api/session.api';
import {UserLocale} from '^types/user.type';
import {toast} from 'react-toastify';

export const locales = [
    {code: UserLocale.Ko, text: '한국어'},
    {code: UserLocale.En, text: 'English'},
];

export const LanguageInput = memo(() => {
    const {currentUser} = useCurrentUser(null, {
        orgIdParam: 'orgId',
    });

    const onChange = useCallback(
        (opt: SelectOptionProps) => {
            const selectedLocale = locales.find((loc) => loc.code === opt.value)!;
            console.log(selectedLocale);

            modifyUser({locale: selectedLocale.code}).then(() => {
                // toast('저장되었습니다.');
            });
        },
        [locales],
    );

    if (!currentUser) return <></>;

    return (
        <FormControl label="언어 설정">
            <SelectDropdown
                placeholder="언어를 선택해주세요."
                options={locales.map((locale) => ({
                    value: locale.code,
                    text: locale.text,
                    selected: currentUser.locale === locale.code,
                }))}
                onChange={onChange}
            />
        </FormControl>
    );
});
