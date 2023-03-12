import {memo} from 'react';
import {WithChildren} from '^types/global.type';

type StatsProps = {
    className?: string;
} & WithChildren;

export const Stats = memo((props: StatsProps) => {
    const {children} = props;

    return <div className="stats shadow">{children}</div>;
});

export const BsStats = memo((props: StatsProps) => {
    const {className = '', children} = props;

    return (
        <div className={`stats ${className}`} style={{display: 'flex'}}>
            {children}
        </div>
    );
});
