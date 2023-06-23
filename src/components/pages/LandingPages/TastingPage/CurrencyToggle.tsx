import React, {memo} from 'react';
import {useRecoilState} from 'recoil';
import {displayCurrencyAtom} from './pageAtoms';
import {Currency} from '^types/crawler';

export const CurrencyToggle = memo(() => {
    const [displayCurrency, setDisplayCurrency] = useRecoilState(displayCurrencyAtom);

    return (
        <div className="flex justify-center">
            <div className="form-control">
                <label className="cursor-pointer label gap-3">
                    <span className="label-text">{Currency.USD}</span>

                    <input
                        type="checkbox"
                        className="toggle toggle-primary"
                        checked={displayCurrency === Currency.KRW}
                        onChange={(e) => {
                            const checked = e.target.checked;
                            setDisplayCurrency(checked ? Currency.KRW : Currency.USD);
                        }}
                    />

                    <span className="label-text">{Currency.KRW}</span>
                </label>
            </div>
        </div>
    );
});
