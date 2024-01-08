import React, {memo} from 'react';
import {useRecoilState} from 'recoil';
import {displayCurrencyAtom} from './pageAtoms';
import {ReactNodeLike} from 'prop-types';
import {CurrencyCode} from '^models/Money';

interface CurrencyToggleProps {
    leftText?: ReactNodeLike;
    rightText?: ReactNodeLike;
    className?: string;
}

export const CurrencyToggle = memo((props: CurrencyToggleProps) => {
    const {leftText, rightText, className = ''} = props;
    const [displayCurrency, setDisplayCurrency] = useRecoilState(displayCurrencyAtom);

    return (
        <div className="flex justify-center">
            <div className="form-control">
                <label className={`cursor-pointer label gap-3 ${className}`}>
                    {leftText ?? <span className="label-text">{CurrencyCode.USD}</span>}

                    <input
                        type="checkbox"
                        className="toggle toggle-primary"
                        checked={displayCurrency === CurrencyCode.KRW}
                        onChange={(e) => {
                            const checked = e.target.checked;
                            setDisplayCurrency(checked ? CurrencyCode.KRW : CurrencyCode.USD);
                        }}
                    />

                    {rightText ?? <span className="label-text">{CurrencyCode.KRW}</span>}
                </label>
            </div>
        </div>
    );
});
