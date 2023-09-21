import {memo} from 'react';
import {TopNavMobileContainer} from './Container';
import {ReactNodeLike} from 'prop-types';

interface TopNavMobileProps {
    title?: ReactNodeLike;
}

export const TopNavMobileDefault = memo((props: TopNavMobileProps) => {
    const {title} = props;

    return (
        <TopNavMobileContainer>
            <h1 className="px-6 m-0 text-xl capitalize">{title}</h1>
        </TopNavMobileContainer>
    );
});
