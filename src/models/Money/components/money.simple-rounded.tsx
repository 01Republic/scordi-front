import {MoneyDto} from '^models/Money';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import React from 'react';

export const MoneySimpleRounded = ({money}: {money?: MoneyDto}) => {
    if (!money) return <></>;

    return (
        <div className="text-14 flex justify-end gap-1">
            <small>{money.symbol}</small>
            {money.roundedAmount.toLocaleString()}
            {/*{money.text}*/}
        </div>
    );
};
