import React, {memo} from 'react';
import {lpp} from '^utils/dateTime';

interface Props {
    date: Date;
}

export const DateColumn = memo((props: Props) => {
    const {date} = props;

    const ymd = lpp(date, 'p');
    const today_ymd = lpp(new Date(), 'p');

    if (ymd === today_ymd) {
        return (
            <div>
                <div className="text-12 font-semibold">오늘 {lpp(date, 'p')}</div>
            </div>
        );
    }

    return (
        <div className="">
            <div className="text-12 font-semibold">{lpp(date, 'P')}</div>
            <div className="text-10">{lpp(date, 'p')}</div>
        </div>
    );
});
