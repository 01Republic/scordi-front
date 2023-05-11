import React, {memo} from 'react';
import {Currency} from '^api/tasting.api/gmail/agent/parse-email-price';
import {useRecoilState} from 'recoil';
import {displayCurrencyAtom} from './pageAtoms';

export const CurrencyToggle = memo(() => {
    const [displayCurrency, setDisplayCurrency] = useRecoilState(displayCurrencyAtom);

    return (
        <div className="flex justify-center">
            <div className="form-control">
                <label className="cursor-pointer label gap-3">
                    <span className="label-text">{Currency.KRW}</span>

                    <input
                        type="checkbox"
                        className="toggle toggle-primary"
                        checked={displayCurrency === Currency.USD}
                        onChange={(e) => {
                            const checked = e.target.checked;
                            setDisplayCurrency(checked ? Currency.USD : Currency.KRW);
                        }}
                    />

                    <span className="label-text">{Currency.USD}</span>
                </label>
            </div>
        </div>
    );
});
