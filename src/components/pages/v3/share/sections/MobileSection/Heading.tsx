import {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {ReactNodeLike} from 'prop-types';

interface Props extends WithChildren {
    title?: ReactNodeLike;
}

export default memo((props: Props) => {
    const {title, children} = props;

    return (
        <div data-component="MobileSection.Heading" className="flex items-center justify-between mb-3 no-selectable">
            <div className="text-sm font-semibold">{title}</div>
            {children}
        </div>
    );
});
