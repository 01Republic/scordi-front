import {WithChildren} from '^types/global.type';
import {memo} from 'react';
import {CardPanel} from '../CardPanel';

interface CardTableProps extends WithChildren {}

export const CardTable = memo((props: CardTableProps) => {
    const {children} = props;

    return (
        <CardPanel>
            <ul className="overflow-x-auto">{children}</ul>
        </CardPanel>
    );
});
