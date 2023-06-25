import {memo} from 'react';
import {hh_mm, yyyy_mm_dd} from '^utils/dateTime';

interface DateTimeColumnProps {
    value: string | null | undefined;
}

export const DateTimeColumn = memo((props: DateTimeColumnProps) => {
    const {value} = props;

    if (!value) return <></>;

    const date = new Date(value);
    return (
        <span className="whitespace-nowrap">
            {yyyy_mm_dd(date)} {hh_mm(date)}
        </span>
    );
});
