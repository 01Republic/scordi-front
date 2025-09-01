import {memo} from 'react';
import {lpp} from '^utils/dateTime';

interface DateTimeColumnProps {
    value?: Date | null;
}

export const DateTimeColumn = memo((props: DateTimeColumnProps) => {
    const {value} = props;

    return (
        <div>
            {value ? (
                <div className="whitespace-nowrap">
                    <p className="text-13 leading-none">{lpp(value, 'P')}</p>
                    <p className="text-11 leading-none">{lpp(value, 'p')}</p>
                </div>
            ) : (
                <div className="whitespace-nowrap">
                    <div>-</div>
                </div>
            )}
        </div>
    );
});
