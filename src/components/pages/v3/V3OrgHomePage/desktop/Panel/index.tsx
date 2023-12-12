import {memo} from 'react';
import {WithChildren} from '^types/global.type';

interface PanelProps extends WithChildren {
    padding?: 'compact' | 'no' | 'normal';
}

export const Panel = memo((props: PanelProps) => {
    const {padding = 'normal', children} = props;

    const paddingClass = {
        no: '',
        normal: 'card-body',
        compact: 'p-4',
    }[padding];

    return <div className={`card ${paddingClass} bg-white shadow`}>{children}</div>;
});
Panel.displayName = 'Panel';
